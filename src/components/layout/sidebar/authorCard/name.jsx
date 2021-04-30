import React from "react";
import PropTypes from "prop-types";
import * as AauthorCardStyle from "../style/authorCard.module.css";


export default function Name(props) {
    const { name, style } = props;

    return (
        <div className={ AauthorCardStyle.textCenter + " " +  AauthorCardStyle.name } style={ style }> 
            { name } 
            <br />
            { props.children }
        </div>
    )
    ;
}

Name.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.element,
    style: PropTypes.object
};