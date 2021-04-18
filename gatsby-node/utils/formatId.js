/* eslint-disable no-undef */
module.exports =  function formatId(text) {
    text = text.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9])$/g, "");
    text = text.trim(); 
    text = text.replace(/\s+/g, "-");
    text = text.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9-])/g, "");
    return text.toLowerCase();
};