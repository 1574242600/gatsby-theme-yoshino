import React from "react";
import PropTypes from "prop-types";
import * as AauthorCardStyle from "../style/authorCard.module.css";

export default function Description(props) {
    const { style } = props;

    return (
        <span className={ AauthorCardStyle.description } style={style}> 
            { props.children } 
        </span>
    )
    ;
}

Description.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object
};