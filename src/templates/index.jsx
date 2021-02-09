import React from "react";
import PropTypes from "prop-types";
import { graphql, navigate } from "gatsby";
import Pagination from "yoshino/lib/Pagination/index";
import IndexStyle from "./style/index.module.css";
import PostItem from "components/index/postItem";
import Seo from "components/global/seo";

export default class Home extends React.Component {

    renderPostItem(data) {
        const { id, ...other } = data;

        return <PostItem key={ id } data={other} />;
    }

    render() {
        const { 
            data: { 
                allMarkdownRemark: {  
                    edges
                },
                site: {
                    siteMetadata: {
                        description
                    }
                }
            },
            pageContext
        } = this.props;

        return (
            <div>
                <Seo 
                    title={ 
                        pageContext.humanPageNumber === 1 
                            ? undefined 
                            : `第${pageContext.humanPageNumber}页`
                    }
                >
                    <meta name="description" content={description} />
                </Seo>

                <div className={ IndexStyle.index }>
                    { edges.map((postData) => this.renderPostItem(postData.node)) }
                </div>
                <Pagination
                    total={ pageContext.numberOfPages * pageContext.limit } 
                    current={ pageContext.humanPageNumber }
                    pageSize={ pageContext.limit }
                    className={ IndexStyle.pagination }
                    onChange={(current) => {
                        if ( current === 1) { 
                            navigate("/"); 
                            return ;
                        }

                        navigate(`/page/${current}`);
                    }}
                />
            </div>
        );
    }
}

Home.propTypes = {
    data: PropTypes.object,
    pageContext: PropTypes.object
};

export const query = graphql`
    query indexQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/(?<!about)\\.md$/"}}, skip: $skip, limit: $limit) {
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
        site {
            siteMetadata {
                description
            }
        }
    }
`;