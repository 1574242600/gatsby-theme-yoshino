/* eslint-disable no-undef */
const marked = require("marked");
const { cleanUrl } = require("marked/src/helpers");
const { formatId } = require(require.resolve("../../../utils/index"));

const renderer = {
    heading(text, level) {
        return `
              <h${level} id="${formatId(text)}">
                ${text}
              </h${level}>`;
    },

    image(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }

        let out = "<img class=\"lazyload\" data-src=\"" + href + "\" alt=\"" + text + "\"";
        if (title) {
            out += " title=\"" + title + "\"";
        }
        out += this.options.xhtml ? "/>" : ">";
        return out;
    }
};


module.exports = async function getHTML(markdownBody) {
    marked.use({ renderer });

    return marked(markdownBody);
};


