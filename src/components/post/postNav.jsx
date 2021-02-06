import React from "react";
import PropTypes from "prop-types";
import PostNavStyle from "./style/postNav.module.css";

export default function PostNav(props) {
    const { navHtml } = props;

    return <div 
        className={ PostNavStyle.navWrap }
        dangerouslySetInnerHTML={{ __html: navHtml }}
    ></div>;
}

PostNav.propTypes = {
    navHtml: PropTypes.string
};