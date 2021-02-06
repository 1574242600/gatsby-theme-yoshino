import React from "react";
import PropTypes from "prop-types";
import PostHead from "../global/postHead";
import Button from "yoshino/lib/Button/index";
import { Link } from "gatsby";
import { addLazyLoadImg } from "../../global";
import PostItemStyle from "./style/postItem.module.css";

export default function PostItem(props) {
    const { frontmatter , timeToRead, excerpt, fields: { slug } } = props.data;
    frontmatter.timeToRead = timeToRead;
    
    return (
        <div className={ PostItemStyle.postItem }> 
            <PostHead info={ frontmatter } />

            <div className={"post-body"} dangerouslySetInnerHTML={{ __html: addLazyLoadImg(excerpt) }}></div>
            <div className={ PostItemStyle.moreButton }>
                <Button type='primary'>
                    <Link to={slug}>阅读更多</Link>
                </Button>
            </div>
        </div>
    );
}

PostItem.propTypes = {
    data: PropTypes.object,
};
