import React from 'react';
import PropTypes from 'prop-types';
import AauthorCardStyle from '../style/authorCard.module.css';

export default function Avatar(props) {
    const { 
        src: avatarSrc,
        width,
        height,
    } = props;

    return (
        <div 
            className={ AauthorCardStyle.avatar + ' ' + AauthorCardStyle.textCenter  }
        >
            <img 
                className={ AauthorCardStyle.avatarCircle + ' lazyloading' } 
                src={ avatarSrc } 
                width={ width }
                height={ height }
            />
        </div>
    );
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};