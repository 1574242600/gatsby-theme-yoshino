import React from "react";
import PropTypes from "prop-types";
import "./style/postNav.module.css";

export default function PostNav(props) {
    const { navHtml } = props;

    return (
        <div className={ "toc-wrap" }>
            <ol
                className={"nav"}
                dangerouslySetInnerHTML={ { __html: navHtml } }
            ></ol>
        </div>);
}

PostNav.propTypes = {
    navHtml: PropTypes.string
};