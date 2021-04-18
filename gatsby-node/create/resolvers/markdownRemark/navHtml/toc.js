/* eslint-disable no-undef */
const { formatId } = require(require.resolve("../../../../utils/index"));

module.exports = function toc(data, options = {}) {

    if (data === null || (data instanceof Array && data.length < 1)) { return null; }

    options = Object.assign({
        min_depth: 1,
        max_depth: 6,
        class: "toc",
        list_number: true
    }, options);

    const listNumber = options.list_number;
    const className = "nav";
    let result = `<ol class="${className}">`;

    const lastNumber = [0, 0, 0, 0, 0, 0];
    let firstLevel = 0;
    let lastLevel = 0;

    for (let i = 0, len = data.length; i < len; i++) {
        const el = data[i];
        const level = el[0];
        const text = el[1];
        const href = text ? `#${formatId(text)}` : null;

        lastNumber[level - 1]++;

        for (let i = level; i <= 5; i++) {
            lastNumber[i] = 0;
        }

        if (firstLevel) {
            for (let i = level; i < lastLevel; i++) {
                result += "</li></ol>";
            }

            if (level > lastLevel) {
                result += `<ol class="${className}-child">`;
            } else {
                result += "</li>";
            }
        } else {
            firstLevel = level;
        }

        result += `<li class="${className}-item ${className}-level-${level}">`;
        if (href) {
            result += `<a class="${className}-link" href="${href}">`;
        } else {
            result += `<a class="${className}-link">`;
        }


        if (listNumber) {
            result += `<span class="${className}-number">`;

            for (let i = firstLevel - 1; i < level; i++) {
                result += `${lastNumber[i]}.`;
            }

            result += "</span> ";
        }

        result += `<span class="${className}-text">${text}</span></a>`;

        lastLevel = level;
    }

    for (let i = firstLevel - 1; i < lastLevel; i++) {
        result += "</li></ol>";
    }

    return result;
};