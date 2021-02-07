export const elementId = "disqus_thread";

async function loadDisqusJs(siteId, errorCallback) {
    const d = document, s = d.createElement("script");
    s.src = `//${siteId}.disqus.com/embed.js`;
    s.async = true;
    s.onerror = errorCallback;
    s.setAttribute("data-timestamp", + new Date());
    (d.head || d.body).appendChild(s);
}

async function showError() {
    try {
        const disqusDom = document.getElementById(elementId);
        disqusDom.innerHTML = "Disqus加载失败, 请检查您的地区是否支持Disqus";
    } catch (e) {
        console.warn(e);
    }
}

function reset(title) {
    document.getElementById(elementId).innerHTML = "";

    window.DISQUS.reset({
        reload: true,
        config: () => {
            this.page.url = window.location.href;
            this.page.identifier = window.location.pathname;
            this.page.title = title;
        }
    });
}

export async function load(siteId, title) {

    window.disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = window.location.pathname;
        this.page.title = title;
    };

    if (window.DISQUS === undefined) {
        window.accessDisqus = true;
        loadDisqusJs(siteId, (e) => {
            showError();
            window.DISQUS = false;
            window.accessDisqus = false;
            console.warn(e);
        });
    } else {

        if (!window.accessDisqus) {
            showError();
            return false;
        }

        reset(title);

    }
}

export function destroy() { }

