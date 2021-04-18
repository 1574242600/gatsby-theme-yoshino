/* eslint-disable no-undef */
const marked = require("marked");
const { formatId } = require(require.resolve("../../../utils/index"));

const renderer = {
    heading(text, level) {
        return `
              <h${level} id="${formatId(text)}">
                ${text}
              </h${level}>`;
    }
};


module.exports = async function getHTML(markdownBody) {
    marked.use({ renderer });

    return marked(markdownBody);
};
