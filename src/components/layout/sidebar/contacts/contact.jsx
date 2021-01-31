import React from "react";
import PropTypes from "prop-types";
import Tooltip from "yoshino/lib/Tooltip/index";

export default function contact(props) {
    const { title, url } = props;

    return (
        <Tooltip title={title} placement='top'>
            <a href={url} target='_blank' rel="noreferrer">{ props.children }</a>
        </Tooltip>
    );
}

contact.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};