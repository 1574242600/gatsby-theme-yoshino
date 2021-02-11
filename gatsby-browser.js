import mediumZoom from "medium-zoom";
import "lazysizes";

import "./src/utils/postNav";
import "./src/styles/var.css";
import "./src/styles/global.css";

import "./src/styles/lazyload.css";
import "./src/styles/medium-zoom.css";
import "./src/styles/typography.css";
import "./src/styles/typography-dark.css";

import "yoshino/lib/Menu/style/index";
import "yoshino/lib/Button/style/index";
import "yoshino/lib/Tooltip/style/index";
import "yoshino/lib/Pagination/style/index";
import "yoshino/lib/common/reset.css";
import "./src/styles/yoshino-dark.css";

const shouldUpdateScroll = () => {
    return false;
};

const onRouteUpdate = async ({ location, prevLocation }) => {
    if (!prevLocation || location.pathname !== prevLocation.pathname) {
        if (location.pathname.startsWith("/post/")) {
            setTimeout(() => {
                mediumZoom(document.querySelectorAll("img"), {
                    background: "rgba(0, 0, 0, .8)",
                });
            }, 300);
        }
    }
};

export { onRouteUpdate, shouldUpdateScroll };