/* eslint-disable no-undef */
const getMRResolvers = require(require.resolve("./markdownRemark/index"));

module.exports = ({ createResolvers }) => {
    const MRResolvers = getMRResolvers();
    const resolvers = Object.assign({}, MRResolvers);

    createResolvers(resolvers);
};