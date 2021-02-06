export const isLg = typeof window !== "undefined" && window.innerWidth >= 992;

export function isMobile() {
    const info = navigator.userAgent;
    const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
    for (let i = 0; i < agents.length; i++) {
        if (info.indexOf( agents[i] ) >= 0) { return true;}
    }
    return false;
}

export function addLazyLoadImg(htmlStr) {
    return htmlStr.replace(/<img src=/, "<img class=\"lazyload\" data-src=");
}

export function addTitleId(htmlStr) {
    return htmlStr.replace(/<h([1-6]{1})>([\s\S]+?)<\/h[1-6]{1}>/g, (_, p1, p2) => {
        return `<h${p1} id="${ formatId(p2) }">${p2}</h${p1}>`;
    });
}

function formatId(text) {
    text = text.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9])$/g, "");
    text = text.trim(); 
    text = text.replace(/\s+/g, "-");
    text = text.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9-])/g, "");
    return text.toLowerCase();
}