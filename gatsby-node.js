/* eslint-disable no-undef */
const onCreateNode = require(require.resolve("./gatsby-node/create/node/index"));
const onCreatePage = require(require.resolve("./gatsby-node/create/pages/index"));
const onResolversPage = require(require.resolve("./gatsby-node/create/resolvers/index"));

exports.onCreateWebpackConfig = ({ actions }) => {

    actions.setWebpackConfig({
        resolve: {
            modules: [__dirname + "/src", "node_modules"],
        },
    });
};

exports.onCreateNode = onCreateNode;
exports.createPages = onCreatePage;
exports.createResolvers = onResolversPage;


/*
async function getHTML(markdownNode) {

    const cachedHTML = await cache.get(htmlCacheKey(markdownNode));

    if (cachedHTML) {
        return cachedHTML;
    } else {
        const ast = await getHTMLAst(markdownNode); // Save new HTML to cache and return

        const html = hastToHTML(ast, {
            allowDangerousHTML: true
        }); // Save new HTML to cache

        await cache.set(htmlCacheKey(markdownNode), html);
        return html;
    }
}
*/



