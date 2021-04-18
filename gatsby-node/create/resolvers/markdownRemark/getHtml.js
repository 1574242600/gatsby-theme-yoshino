/* eslint-disable no-undef */
const marked = require("marked");
const prism = require("prismjs");
const loadLanguages = require("prismjs/components/");
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


loadLanguages();


module.exports = async function getHTML(markdownBody) {
    marked.setOptions({
        highlight: function (code, lang) {
            if (prism.languages[lang]) {
                return prism.highlight(code, prism.languages[lang], lang);
            } else {
                return code;
            }
        }
    });

    marked.use({ renderer });

    return marked(markdownBody);
};


