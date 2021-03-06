import React from "react";
import PropTypes from "prop-types";
import * as PostHeadStyle from "./style/postHead.module.css";
import PostInfo from "./postHead/postInfo";

export default function PostHead(props) {
    const { title, ...info } = props.info;

    return (
        <div>
            <h2 className={ PostHeadStyle.title } >{ title }</h2>
            { JSON.stringify(info) !== "{}"  && <PostInfo info={ info } />}
        </div>
    );
}

PostHead.propTypes = {
    info: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string,
        update: PropTypes.string,
        timeToRead: PropTypes.number,
        tags: PropTypes.arrayOf(PropTypes.string),
    })
};