/* eslint-disable no-undef */
const toc = require(require.resolve("./toc"));
const getHeadings = require(require.resolve("./getHeadings"));

module.exports = () => {
    const resolvers = {
        MarkdownRemark: {
            navHtml: {
                type: "String",
                resolve: (source) => {
                    return toc(getHeadings(source.rawMarkdownBody));
                }
            }
        }
    };

    return resolvers;
};