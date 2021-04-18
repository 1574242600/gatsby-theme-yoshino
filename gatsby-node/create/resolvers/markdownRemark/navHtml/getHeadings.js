/* eslint-disable no-undef */
module.exports = function getHeadings(src) {
    const count = {};  //处理相同标题
    const results = src.match(/(#+)\s+([\s\S]*?)[\r|\r\n]/g);

    if (results === null) { return null; }

    return results.map(result => {
        let match = result.match(/(#+)\s+([\s\S]*?)[\r|\r\n]/);
        match[2] = match[2].trim();
        if (count[match[2]] === undefined) {
            count[match[2]] = 1;
        } else {
            count[match[2]]++;
        }

        return [match[1].length, count[match[2]] > 1 ? `${match[2]}-${count[match[2]] - 1}` : match[2]];
    });
};
