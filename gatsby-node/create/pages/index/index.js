/* eslint-disable no-undef */
const { paginate } = require("gatsby-awesome-pagination");

module.exports = ({ createPage, postItems }) => {
    // 创建文章索引页面
    paginate({
        createPage,
        items: postItems,
        component: require.resolve("../../../../src/templates/index.jsx"),
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) => pageNumber === 0 ? "/" : "/page"
    });
};