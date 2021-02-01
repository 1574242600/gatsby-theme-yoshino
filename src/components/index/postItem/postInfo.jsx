import React from "react";
import PropTypes from "prop-types";
import Time from "./postInfo/time";
import PostInfoStyle from "./style/postInfo.module.css";

export default function PostInfo(props) {
    const { date, update, timeToRead, tags } = props.info;
    return (
        <div className={ PostInfoStyle.postInfo }>
            <Time time={{date, update}}/>
            <span>{`预计阅读时长: ${timeToRead} 分钟`}</span>
            |<span>{`标签: ${tags}`}</span>

        </div>
    );
}

PostInfo.propTypes = {
    info: PropTypes.shape({
        date: PropTypes.string.isRequired,
        update: PropTypes.string,
        timeToRead: PropTypes.number.isRequired,
        tags: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ])
    })
};