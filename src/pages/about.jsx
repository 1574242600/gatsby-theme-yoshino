import React from "react";
import PropTypes from "prop-types";
import PostStyle from "../templates/style/post.module.css";
import PostHead from "components/global/postHead";
import Comment from "components/post/comment";
import Seo from "components/global/seo";
import { graphql } from "gatsby";

export default function About(props) {
    if (props.data.markdownRemark === null) { return "error: no found about.md"; }

    const {
        markdownRemark: {
            frontmatter,
            excerpt,
            html
        }
    } = props.data;

    return (
        <div className={ PostStyle.postCard }>
            <Seo title={ frontmatter.title } >
                <meta name="description" content={ excerpt } />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={ excerpt } />
            </Seo>

            <div className={ PostStyle.post }>
                <PostHead info={ frontmatter } />
                <div className={ "post-body" } dangerouslySetInnerHTML={ { __html: html } }></div>
            </div>

            <div className={ PostStyle.comment }>
                <Comment postTitle={ frontmatter.title } />
            </div>
        </div>
    );
}

About.propTypes = {
    data: PropTypes.object
};

export const query = graphql`
    query aboutQuery {
        markdownRemark(fileAbsolutePath: {regex: "/(?<=about)\\\\.md$/"}) {
            frontmatter { 
                title
            }
            excerpt
            html
        }
    }
`;
