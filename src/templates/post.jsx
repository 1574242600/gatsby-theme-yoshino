import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as PostStyle from "./style/post.module.css";
import PostHead from "components/global/postHead";
import PostNav from "components/post/postNav";
import Comment from "components/post/comment";
import Drag from "components/global/drag";
import Seo from "components/global/seo";
import { graphql } from "gatsby";

export default function Post(props) {
    const {
        markdownRemark: {
            frontmatter,
            timeToRead,
            excerpt,
            navHtml,
            html
        }
    } = props.data;

    frontmatter.timeToRead = timeToRead;

    useEffect(() => {
        window.initPostNav();
        return () => window.destroyPostNav();
    });

    return (
        <div className={ PostStyle.postCard }>
            <Seo title={ frontmatter.title } >
                <meta name="description" content={ excerpt } />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={ excerpt } />
            </Seo>


            <div className={ PostStyle.post }>
                <PostHead info={ frontmatter } />
                { navHtml != null &&
                        <Drag title={ "文章目录" }>
                            <PostNav navHtml={ navHtml } />
                        </Drag>
                }
                <div className={ "post-body" } dangerouslySetInnerHTML={ { __html: html } }></div>
            </div>


            <div className={ PostStyle.comment }>
                <Comment postTitle={ frontmatter.title } />
            </div>
        </div>
    );
}

Post.propTypes = {
    data: PropTypes.object
};

export const query = graphql`
    query postQuery($id: String!) {
        markdownRemark(id: {eq: $id}) {
            frontmatter {
                date
                tags
                title
                update
            }
            timeToRead
            navHtml
            excerpt
            html
        }
    }
`;
