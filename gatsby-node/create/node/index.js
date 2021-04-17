/* eslint-disable no-undef */
const createNodeFieldMR = require(require.resolve("./MarkdownRemark/index"));

module.exports = (object) => {
    if (object.node.internal.type === "MarkdownRemark") {
        createNodeFieldMR(object);
    }
};