import React from "react";
import PropTypes from "prop-types";
import { graphql, navigate } from "gatsby";
import Pagination from "yoshino/lib/Pagination/index";
import * as IndexStyle from "./style/index.module.css";
import PostItem from "components/index/postItem";
import Seo from "components/global/seo";

export default class TagIndex extends React.Component {

    renderPostItem(data) {
        const { id, ...other } = data;

        return <li key={ id }><PostItem data={ other }/></li>;
    }

    render() {
        const {
            data: {
                allMarkdownRemark: {
                    edges
                }
            },
            pageContext,
        } = this.props;

        return (
            <div className={ IndexStyle.index }>
                <Seo
                    title={`标签: ${ pageContext.tag } 第${pageContext.humanPageNumber}页`}
                >
                </Seo>

                <div className={ IndexStyle.tagName }>标签： { pageContext.tag }</div>

                <ol > 
                    { edges.map((postData) => this.renderPostItem(postData.node)) }
                </ol>

                <Pagination
                    total={ pageContext.numberOfPages * pageContext.limit }
                    current={ pageContext.humanPageNumber }
                    pageSize={ pageContext.limit }
                    className={ IndexStyle.pagination }
                    onChange={ (current) => {
                        if (current === 1) {
                            navigate("/");
                            return;
                        }

                        navigate(`/${ pageContext.tag }/${ current }`);
                    } }
                />
            </div>
        );
    }
}

TagIndex.propTypes = {
    tag: PropTypes.string,
    data: PropTypes.object,
    pageContext: PropTypes.object
};

export const query = graphql`
    query tagIndexQuery($skip: Int!, $limit: Int!, $tag: String!) {
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, skip: $skip, limit: $limit, filter: {frontmatter: {tags: {eq: $tag}}}) {
            edges {
                node {
                    id
                    timeToRead
                    excerpt(format: HTML)
                    frontmatter {
                        date
                        tags
                        title
                        update
                    }
                    fields {
                        slug
                    }
                }
            }
        } 
    }
`;