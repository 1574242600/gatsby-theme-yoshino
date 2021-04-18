/* eslint-disable no-undef */
const getNavHtml = require(require.resolve("./getNavHtml"));
const getHtml = require(require.resolve("./getHtml"));

module.exports = () => {
    const resolvers = {
        MarkdownRemark: {
            navHtml: {
                type: "String",
                resolve: (source) => {
                    return getNavHtml(source.rawMarkdownBody);
                }
            },
            html: {
                type: "String",
                resolve: (source) => {
                    return getHtml(source.rawMarkdownBody);
                }
            },
         
        }
    };

    return resolvers;
};