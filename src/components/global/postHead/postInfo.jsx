import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Time from "./postInfo/time";
import * as PostInfoStyle from "./style/postInfo.module.css";

export default function PostInfo(props) {

    const { date, update, timeToRead, tags } = props.info;

    function renderTagLinks() {
        if (tags == null) { return "null"; }
        return tags.map(
            (tag, index) => (
                <React.Fragment key={ tag }>
                    <Link to={`/tag/${ tag }`}>{ tag }</Link> 
                    { tags[index + 1] === undefined ? "" : ", " }
                </React.Fragment>
            )
        );
    }

    return (
        <div className={ PostInfoStyle.postInfo }>
            <Time time={ { date, update } } />
            <span>{ `预计阅读时长: ${timeToRead} 分钟` }</span>
            |<span>{ "标签: " } { renderTagLinks() }</span>

        </div>
    );
}

PostInfo.propTypes = {
    info: PropTypes.shape({
        date: PropTypes.string.isRequired,
        update: PropTypes.string,
        timeToRead: PropTypes.number.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    })
};