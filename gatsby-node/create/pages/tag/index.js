/* eslint-disable no-undef */
const { paginate } = require("gatsby-awesome-pagination");
const getAllTag = require(require.resolve("./getAllTag"));

module.exports = ({ createPage, postItems }) => {
    getAllTag(postItems).forEach(({ tag, count }) => {
        paginate({
            createPage,
            items: Array(count - 1).map(() => ({})),
            component: require.resolve("../../../../src/templates/tag.jsx"),
            itemsPerPage: 10,
            pathPrefix: `/tag/${tag}`,
            context: {
                tag: tag
            }
        });
    });
};