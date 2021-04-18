/* eslint-disable no-undef */
const getHeadings = require(require.resolve("./navHtml/getHeadings"));
const toc = require(require.resolve("./navHtml/toc"));

module.exports = (markdownBody) => {
    return toc(getHeadings(markdownBody));
};