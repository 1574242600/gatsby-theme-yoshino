/* eslint-disable no-undef */
const { createFilePath } = require("gatsby-source-filesystem");
const { paginate } = require("gatsby-awesome-pagination");

exports.onCreateWebpackConfig = ({ actions }) => {

    actions.setWebpackConfig({
        resolve: {
            modules: [__dirname + "/src", "node_modules"],
        },
    });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    //console.log(node.internal.type);
    if (node.internal.type === "MarkdownRemark") {
        createNodeField({
            node,
            name: "slug",
            value: "/post" + createFilePath({ node, getNode, basePath: "pages/post" }),
        });
    }
};


exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    getPostItems(graphql).then((postItems) => {
        //console.log(postItems);
        paginate({
            createPage,
            items: postItems,
            component: require.resolve("./src/templates/index.jsx"),
            itemsPerPage: 10,
            pathPrefix: ({ pageNumber }) => pageNumber === 0 ? "/" : "/page"
        });

        postItems.forEach(({ node }) => {
            //console.log(node)
            createPage({
                path: node.fields.slug,
                component: require.resolve("./src/templates/post.jsx"),
                context: {},
            });
        });
        
    });
};



function getPostItems(graphql) {
    return graphql(`
        {
            allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }      
    `).then(({ data }) => {
        return data.allMarkdownRemark.edges;
    });
}