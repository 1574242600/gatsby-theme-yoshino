/* eslint-disable no-undef */
const _ = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");
const { paginate } = require("gatsby-awesome-pagination");

exports.onCreateWebpackConfig = ({ actions }) => {

    actions.setWebpackConfig({
        resolve: {
            modules: [__dirname + "/src", "node_modules"],
        },
    });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    //console.log(node.internal.type);
    if (node.internal.type === "MarkdownRemark") {
        createNodeField({
            node,
            name: "slug",
            value: "/post" + createFilePath({ node, getNode, basePath: "pages/post" }),
        });

        //这个没什么用，我也不知道为什么示例要写
        if (node.frontmatter.tags) {
            const tagSlugs = node.frontmatter.tags.map((tag) => `/tags/${_.kebabCase(tag)}/`);

            createNodeField({ node, name: "tagSlugs", value: tagSlugs });
        }
    }
};


exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return getPostItems(graphql).then((postItems) => {
        // 创建文章索引页面
        paginate({
            createPage,
            items: postItems,
            component: require.resolve("./src/templates/index.jsx"),
            itemsPerPage: 10,
            pathPrefix: ({ pageNumber }) => pageNumber === 0 ? "/" : "/page"
        });

        // 创建文章页面
        postItems.forEach(({ node }) => {
            //console.log(node)
            createPage({
                path: node.fields.slug,
                component: require.resolve("./src/templates/post.jsx"),
                context: { id: node.id },
            });
        });

        // 创建tag索引页面
        getAllTag(postItems).forEach(({ tag, count }) => {
            paginate({
                createPage,
                items: Array(count - 1).map(() => ({})),
                component: require.resolve("./src/templates/tag.jsx"),
                itemsPerPage: 10,
                pathPrefix: `/tag/${tag}`,
                context: {
                    tag: tag
                }
            });
        });
    });
};

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        MarkdownRemark: {
            navHtml: {
                type: "String",
                resolve: (source) => {
                    return toc(getHeadings(source.rawMarkdownBody));
                }
            }
        }
    };

    createResolvers(resolvers);
};

function getPostItems(graphql) {
    return graphql(`
        {
            allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                        }
                    }
                }
            }
        }      
    `).then(({ data }) => {
        return data.allMarkdownRemark.edges;
    });
}

function getAllTag(postItems) {
    const tagsCount = {};
    postItems.forEach(({ node }) => {
        const tags = node.frontmatter.tags;
        if (tags == null) { return; }

        tags.forEach((tag) => {
            if (tagsCount[tag] === undefined) {
                tagsCount[tag] = 1;
            } else {
                tagsCount[tag]++;
            }
        });
    });

    return Object.keys(tagsCount).map((tag) => ({ tag: tag, count: tagsCount[tag] }));
}

function getHeadings(src) {
    const count = {};  //处理相同标题
    const results = src.match(/(#+)\s+([\s\S]*?)[\r|\r\n]/g);
    
    if (results === null) { return null;}

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
}

function toc(data, options = {}) {

    function formatId(text) {
        text = text.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9])$/g, "");
        text = text.trim(); 
        text = text.replace(/\s+/g, "-");
        text = text.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9-])/g, "");
        return text.toLowerCase();
    }

    if ( data === null || (data instanceof Array && data.length < 1) ) { return null; }

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
        const text  = el[1];
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
}