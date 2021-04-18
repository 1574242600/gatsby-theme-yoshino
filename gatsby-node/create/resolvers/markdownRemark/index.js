/* eslint-disable no-undef */
const getNavHtml = require(require.resolve("./getNavHtml"));


module.exports = () => {
    const resolvers = {
        MarkdownRemark: {
            navHtml: {
                type: "String",
                resolve: (source) => {
                    return getNavHtml(source.rawMarkdownBody);
                }
            },
         
        }
    };

    return resolvers;
};