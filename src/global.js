export const isLg = typeof window !== "undefined" && window.innerWidth >= 992;

export function isMobile() {
    const info = navigator.userAgent;
    const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
    for (let i = 0; i < agents.length; i++) {
        if (info.indexOf( agents[i] ) >= 0) { return true;}
    }
    return false;
}

export function toLazyLoadImg(htmlStr) {
    return htmlStr.replace(/<img src=/, "<img class=\"lazyload\" data-src=");
}