/* eslint-disable no-undef */
module.exports = ({ createPage, postItems }) => {
    // 创建文章页面
    postItems.forEach(({ node }) => {
        //console.log(node)
        createPage({
            path: node.fields.slug,
            component: require.resolve("../../../../src/templates/post.jsx"),
            context: { id: node.id },
        });
    });
};