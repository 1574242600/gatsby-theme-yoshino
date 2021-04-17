/* eslint-disable no-undef */
module.exports = function getPostItems(graphql) {
    return graphql(`
        {
            allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC} filter: {fileAbsolutePath: {regex: "/(?<!about)\\\\.md$/"}}) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                        }
                    }
                }
            }
        }      
    `).then(({ data }) => {
        return data.allMarkdownRemark.edges;
    });
};