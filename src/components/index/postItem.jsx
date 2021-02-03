import React from "react";
import PropTypes from "prop-types";
import PostInfo from "./postItem/postInfo";
import Button from "yoshino/lib/Button/index";
import { Link } from "gatsby";
import { toLazyLoadImg } from "../../global";
import PostItemStyle from "./style/postItem.module.css";

export default function PostItem(props) {
    const { frontmatter : { title, ...info }, timeToRead, excerpt, fields: { slug } } = props.data;
    info.timeToRead = timeToRead;
    //todo 懒加载
    return (
        <div className={ PostItemStyle.postItem }> 
            <h2>{ title }</h2>
            <PostInfo info={ info } />
            <div className={"post-body"} dangerouslySetInnerHTML={{ __html: toLazyLoadImg(excerpt) }}></div>
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
