/* eslint-disable no-undef */
const createIndexPage = require(require.resolve("./index/index"));
const createPostPage = require(require.resolve("./post/index"));
const createTagPage = require(require.resolve("./tag/index"));
const getPostItems = require(require.resolve("./getPostItems"));

module.exports = async ({ actions, graphql }) => {
    const { createPage } = actions;
    return getPostItems(graphql).then((postItems) => {
        createIndexPage({ createPage, postItems });
        createPostPage({ createPage, postItems });
        createTagPage({ createPage, postItems });
    });
};