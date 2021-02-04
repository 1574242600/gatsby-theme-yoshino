/* eslint-disable no-undef */
const _ = require("lodash");
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

        //这个没什么用，我也不知道为什么示例要写
        if (node.frontmatter.tags) {
            const tagSlugs = node.frontmatter.tags.map((tag) => `/tags/${_.kebabCase(tag)}/`);

            createNodeField({ node, name: "tagSlugs", value: tagSlugs });
        }
    }
};


exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return getPostItems(graphql).then((postItems) => {
        // 创建文章索引页面
        paginate({
            createPage,
            items: postItems,
            component: require.resolve("./src/templates/index.jsx"),
            itemsPerPage: 10,
            pathPrefix: ({ pageNumber }) => pageNumber === 0 ? "/" : "/page"
        });

        // 创建文章页面
        postItems.forEach(({ node }) => {
            //console.log(node)
            createPage({
                path: node.fields.slug,
                component: require.resolve("./src/templates/post.jsx"),
                context: {},
            });
        });

        // 创建tag索引页面
        getAllTag(postItems).forEach(({ tag, count }) => {
            paginate({
                createPage,
                items: Array(count - 1).map( () => ({}) ),
                component: require.resolve("./src/templates/tag.jsx"),
                itemsPerPage: 10,
                pathPrefix: `/tag/${tag}`,
                context: {
                    tag: tag
                }
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
}

function getAllTag(postItems) {
    const tagsCount = {};
    postItems.forEach(({ node }) => {
        const tags = node.frontmatter.tags;
        if (tags == null) { return; }

        tags.forEach((tag) => {
            if (tagsCount[tag] === undefined) {
                tagsCount[tag] = 1;
            } else {
                tagsCount[tag]++;
            }
        });
    });

    return Object.keys(tagsCount).map((tag) => ({ tag: tag, count: tagsCount[tag]}) );
}