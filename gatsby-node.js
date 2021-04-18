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