import React from 'react';
import PropTypes from 'prop-types';
import LayoutStyle from './layout/style/layout.module.css';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import { isLg } from '../global';

function setDarkMode(darkMode) {
    const _document = typeof document !== 'undefined' && document.body;
    if ( darkMode ) {
        _document.classList.add('dark');
    } else {
        _document.classList.remove('dark');
    }
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
            setDarkMode(nextState.darkMode);
            return false;
        }

        return true;
    }

    getDarkModeStatus() {
        const _window = typeof window !== 'undefined' && window;
        const OSDarkStatus = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const userDarkStatus = _window.localStorage.getItem('darkMode');

        if (userDarkStatus === null && OSDarkStatus) {
            setDarkMode(true);
            return true;
        }

        if ( userDarkStatus !== null) { 
            setDarkMode(userDarkStatus == 'true');
            return userDarkStatus; 
        }

        return false;
    }

    handleMenuIconClick() {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
        });
    }

    handleDarkIconClick() {
        const darkMode = !this.state.darkMode;
        typeof window !== 'undefined' && 
            window.localStorage.setItem('darkMode', darkMode);
        
        this.setState({
            darkMode: darkMode,
        });
    }

    render() {
        const { children } = this.props;
        const { sidebarOpen } = this.state;

        //todo: 路由过渡 https://www.ruoduan.cn/Gatsby-layout/
        return (
            <div className={'width-transition'}>
                <Header 
                    onMenuIconClick={ this.handleMenuIconClick } 
                    onDarkIconClick={ this.handleDarkIconClick }
                />
                <Sidebar open={ sidebarOpen } onOverlayClick={ this.handleMenuIconClick } />

                <div className={ sidebarOpen ? LayoutStyle.sidebarOpenOffset : undefined}> 
                    { children }
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.element,
};