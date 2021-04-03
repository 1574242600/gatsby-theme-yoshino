import anime from "animejs/lib/anime.es";

const postNav = {
    registerSidebarTOC: function () {
        const navItems = document.querySelectorAll(".toc-wrap li");
        const sections = [
            ...navItems
        ].map(element => {
            let link = element.querySelector("a.nav-link");
            link.addEventListener("click", event => {
                event.preventDefault();
                let target = document.getElementById(event.currentTarget.getAttribute("href").replace("#", ""));
                let offset = target.getBoundingClientRect().top + window.scrollY;
                anime({
                    targets: document.scrollingElement,
                    duration: 500,
                    easing: "linear",
                    scrollTop: offset + 10
                });
            });
            return document.getElementById(link.getAttribute("href").replace("#", ""));
        });
        const tocElement = document.querySelector(".toc-wrap");

        function activateNavByIndex(target) {
            if (target.classList.contains("active-current")) {return;}
            document.querySelectorAll(".toc-wrap .active").forEach(element => {
                element.classList.remove("active", "active-current");
            });
            target.classList.add("active", "active-current");
            let parent = target.parentNode;
            while (!parent.matches(".toc-wrap")) {
                if (parent.matches("li")) {parent.classList.add("active");}
                parent = parent.parentNode;
            }
            anime({
                targets: tocElement,
                duration: 200,
                easing: "linear",
                scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
            });
        }

        function findIndex(entries) {
            let index = 0;
            let entry = entries[index];
            if (entry.boundingClientRect.top > 0) {
                index = sections.indexOf(entry.target);
                return index === 0 ? 0 : index - 1;
            }
            for (; index < entries.length; index++) {
                if (entries[index].boundingClientRect.top <= 0) {
                    entry = entries[index];
                } else {
                    return sections.indexOf(entry.target);
                }
            }
            return sections.indexOf(entry.target);
        }

        function createIntersectionObserver(marginTop) {
            marginTop = Math.floor(marginTop + 10000);
            window.intersectionObservers = new IntersectionObserver((entries, observe) => {
                let scrollHeight = document.documentElement.scrollHeight + 100;
                if (scrollHeight > marginTop) {
                    observe.disconnect();
                    createIntersectionObserver(scrollHeight);
                    return;
                }
                let index = findIndex(entries);
                activateNavByIndex(navItems[index]);
            }, {
                rootMargin: marginTop + "px 0px -100% 0px",
                threshold: 0
            });
            sections.forEach(element => {
                element && window.intersectionObservers.observe(element);
            });
        }

        createIntersectionObserver(document.documentElement.scrollHeight);
    }
};

window.initPostNav = () => {
    postNav.registerSidebarTOC();
};


window.destroyPostNav = () => {
    try {
        window.intersectionObservers.disconnect();
    } catch(e) {
        console.warn(e);
    }
};


