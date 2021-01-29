import React from 'react';
import PropTypes from 'prop-types';
import AauthorCardStyle from '../style/authorCard.module.css';

export default function Description(props) {
    const { description, style } = props;

    return (
        <span className={ AauthorCardStyle.description } style={style}> 
            { description } 
        </span>
    )
    ;
}

Description.propTypes = {
    description: PropTypes.string.isRequired,
    style: PropTypes.object
};