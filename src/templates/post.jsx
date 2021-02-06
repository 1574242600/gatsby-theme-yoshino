import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PostStyle from "./style/post.module.css";
import PostHead from "components/global/postHead";
import PostNav from "components/post/postNav";
import Drag from "components/global/drag";
import Seo from "components/global/seo";
import { addLazyLoadImg, addTitleId } from "../global";
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
        <div className={ PostStyle.center + " global-transition" }>
            <Seo title={ frontmatter.title } >
                <meta name="description" content={ excerpt } />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={ excerpt } />
            </Seo>

            <div className={ PostStyle.post }>
                <PostHead info={ frontmatter } />
                { navHtml != null &&
                    <Drag style={{ right: 400 }} title={"文章目录"}>
                        <PostNav navHtml={ navHtml } />
                    </Drag>
                }
                <div className={ "post-body" } dangerouslySetInnerHTML={ { __html: addTitleId(addLazyLoadImg(html)) } }></div>
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
