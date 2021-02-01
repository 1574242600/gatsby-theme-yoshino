import React from "react";
import PropTypes from "prop-types";
import LayoutStyle from "./layout/style/layout.module.css";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import { isLg } from "../global";

function modifyBodyClass (className, mode) {
    const _document = typeof document !== "undefined" && document.body;
    if ( mode === "add" ) {
        _document.classList.add(className);
    }

    if (mode === "remove") {
        _document.classList.remove(className);
    }
}

function modifyDarkMode(darkMode) {
    modifyBodyClass("dark", darkMode ? "add": "remove");
}

function modifyBodyLocked(locked) {
    modifyBodyClass("body-locked", locked ? "add": "remove");
}

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: isLg ? true : false,
            darkMode: this.getDarkModeStatus(),
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
        const OSDarkStatus = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const userDarkStatus = _window.localStorage.getItem("darkMode");

        if (userDarkStatus === null && OSDarkStatus) {
            modifyDarkMode(true);
            return true;
        }

        if ( userDarkStatus !== null) { 
            modifyDarkMode(userDarkStatus == "true");
            return userDarkStatus; 
        }

        return false;
    }

    handleMenuIconClick() {
        const sidebarOpen = !this.state.sidebarOpen;

        if ( !isLg ) { modifyBodyLocked(sidebarOpen); }
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

    render() {
        const { children } = this.props;
        const { sidebarOpen } = this.state;

        //todo: 路由过渡 https://www.ruoduan.cn/Gatsby-layout/
        return (
            <div className={"global-transition"}>
                <Header 
                    onMenuIconClick={ this.handleMenuIconClick } 
                    onDarkIconClick={ this.handleDarkIconClick }
                />
                <Sidebar open={ sidebarOpen } onOverlayClick={ this.handleMenuIconClick } />

                <div className={ LayoutStyle.pages + " " 
                        + (sidebarOpen ? LayoutStyle.sidebarOpenOffset : "") }
                > 
                    { children }
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.element,
};