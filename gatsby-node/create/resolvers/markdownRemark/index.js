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
            excerptHtml: {
                type: "String",
                resolve: (source) => {
                    return getHtml(source.rawMarkdownBody.split("<!--more-->")[0]);
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