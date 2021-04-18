import React from "react";
import PropTypes from "prop-types";
import PostHead from "../global/postHead";
import Button from "yoshino/lib/Button/index";
import { Link, useStaticQuery, graphql } from "gatsby";
import PostItemStyle from "./style/postItem.module.css";

export default function PostItem(props) {
    const { site: { siteMetadata: { url } } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        url
                    }
                }
            }`
    );

    const { frontmatter , timeToRead, excerpt, fields: { slug } } = props.data;
    frontmatter.timeToRead = timeToRead;
    
    return (
        <div className={ PostItemStyle.postItem }> 
            <PostHead info={ frontmatter } />

            <div className={"post-body"} dangerouslySetInnerHTML={{ __html: excerpt }}></div>
            <div className={ PostItemStyle.moreButton }>
                <Button type='primary'>
                    <Link to={ url + slug }>阅读更多</Link>
                </Button>
            </div>
        </div>
    );
}

PostItem.propTypes = {
    data: PropTypes.object,
};
