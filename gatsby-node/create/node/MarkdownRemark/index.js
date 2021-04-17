/* eslint-disable no-undef */
const { createFilePath } = require("gatsby-source-filesystem");
const _ = require("lodash");

module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    createNodeField({
        node,
        name: "slug",
        value: createFilePath({ node, getNode, basePath: "pages/post" }),
    });

    //这个没什么用，我也不知道为什么示例要写
    if (node.frontmatter.tags) {
        const tagSlugs = node.frontmatter.tags.map((tag) => `/tags/${_.kebabCase(tag)}/`);

        createNodeField({ node, name: "tagSlugs", value: tagSlugs });
    }
};