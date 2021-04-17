/* eslint-disable no-undef */
module.exports = function getAllTag(postItems) {
    const tagsCount = {};
    postItems.forEach(({ node }) => {
        const tags = node.frontmatter.tags;
        if (tags == null) { return; }

        tags.forEach((tag) => {
            if (tagsCount[tag] === undefined) {
                tagsCount[tag] = 1;
            } else {
                tagsCount[tag]++;
            }
        });
    });

    return Object.keys(tagsCount).map((tag) => ({ tag: tag, count: tagsCount[tag] }));
};