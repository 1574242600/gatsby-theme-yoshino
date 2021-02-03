import "lazysizes";
import "./src/styles/var.css";
import "./src/styles/global.css";

import "./src/styles/lazyload.css";
import "./src/styles/typography.css";
import "./src/styles/typography-dark.css";

import "yoshino/lib/Menu/style/index";
import "yoshino/lib/Button/style/index";
import "yoshino/lib/Tooltip/style/index";
import "yoshino/lib/Pagination/style/index";
import "yoshino/lib/common/reset.css";
import "./src/styles/yoshino-dark.css";


const onRouteUpdate = async ({ location, prevLocation }) => {
    if (!prevLocation || location.pathname !== prevLocation.pathname) {
        setTimeout(() => {
            //todo: 图片缩放 https://www.cnblogs.com/liangfengning/p/14319692.html
            //const elements = document.querySelectorAll('img');  
            
        }, 300);
    }

};

export { onRouteUpdate };