import React from "react";
import PropTypes from "prop-types";
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions";
import LayoutStyle from "./layout/style/layout.module.css";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import { isLg } from "../global";

function modifyBodyClass(className, mode) {
    const _document = typeof document !== "undefined" && document.body;
    if (mode === "add") {
        _document.classList.add(className);
    }

    if (mode === "remove") {
        _document.classList.remove(className);
    }
}

function modifyDarkMode(darkMode) {
    modifyBodyClass("dark", darkMode ? "add" : "remove");
}

function modifyBodyLocked(locked) {
    modifyBodyClass("body-locked", locked ? "add" : "remove");
}

export default class Layout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            sidebarOpen: isLg ? true : false,
            darkMode: false,
        };

        this.handleMenuIconClick = this.handleMenuIconClick.bind(this);
        this.handleDarkIconClick = this.handleDarkIconClick.bind(this);
    }

    // eslint-disable-next-line no-unused-vars
    shouldComponentUpdate(_, nextState) {
        if (this.state.darkMode !== nextState.darkMode) {
            modifyDarkMode(nextState.darkMode);
            return false;
        }

        return true;
    }

    getDarkModeStatus() {
        const _window = typeof window !== "undefined" && window;
        const OSDarkStatus = _window.matchMedia("(prefers-color-scheme: dark)").matches;
        const userDarkStatus = _window.localStorage.getItem("darkMode");

        if (userDarkStatus === null && OSDarkStatus) {
            return true;
        }

        if (userDarkStatus !== null) {
            return userDarkStatus === "true";
        }

        return false;
    }

    handleMenuIconClick() {
        const sidebarOpen = !this.state.sidebarOpen;

        if (!isLg) { modifyBodyLocked(sidebarOpen); }
        this.setState({
            sidebarOpen: sidebarOpen,
        });
    }

    handleDarkIconClick() {
        const darkMode = !this.state.darkMode;
        typeof window !== "undefined" &&
            window.localStorage.setItem("darkMode", darkMode);

        this.setState({
            darkMode: darkMode,
        });
    }

    componentDidMount() {
        const darkMode = this.getDarkModeStatus();

        this.setState({
            darkMode: darkMode
        });
    }

    render() {
        const { children, location } = this.props;
        const { sidebarOpen } = this.state;

        return (
            <TransitionProvider
                location={ location }
                enter={ {
                    opacity: 0,
                    transform: "transition: opacity 0.3s",
                    config: {
                        duration: 300
                    }
                } }

                usual={ {
                    opacity: 1,
                    transform: "transition: opacity 0.3s",
                } }

                leave={ {
                    opacity: 1,
                    transform: "transition: opacity 0.3s",
                    config: {
                        duration: 0
                    }
                } }
            >
                <div className={ "global-transition" }>
                    <Header
                        onMenuIconClick={ this.handleMenuIconClick }
                        onDarkIconClick={ this.handleDarkIconClick }
                    />
                    <Sidebar open={ sidebarOpen } onOverlayClick={ this.handleMenuIconClick } />

                    <div className={ sidebarOpen ? LayoutStyle.sidebarOpenOffset : undefined }>
                        <TransitionViews >
                            <div
                                className={ LayoutStyle.pages }
                                location={ location }
                            >
                                { children }
                            </div>
                        </TransitionViews>
                    </div>

                </div>

            </TransitionProvider >
        );
    }
}

Layout.propTypes = {
    location: PropTypes.object,
    children: PropTypes.element
};