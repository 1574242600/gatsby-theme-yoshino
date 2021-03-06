/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
/* eslint-disable no-undef */

module.exports = {
    siteMetadata: {
        url: "http://127.0.0.1:8000",   //todo 相对路径改为绝对
        title: "Nworm",               //todo cc许可证
        author: "nworm",
        description: "一条咸鱼",
        since: "2019-06-21T11:30:00.000Z",
        avatar: "//q1.qlogo.cn/g?b=qq&nk=1574242600&s=640", //todo: to img.nowrm.icu
        contacts: [
            { name: "github", id: "1574242600" },
            { name: "telegram", id: "nworm1574" },
            { name: "qq", id: "1574242600" },
            //twitter: { name: 'twitter', id: null},

            /* 
                请将logo矢量图放在/static/icon/logo/ 与 {name} 同名
                请确保contacts数组中 至少一条对象有id属性 至少一条对象有url属性 
            */

            { url: "null" }
            //{ name: 'discord', url: '' },
            //{ name: 'fackbook', url: '' },
            //{ name: 'line', url: '' },
        ],
        comment: { type: "disqus", id: "nworm" }
    },
    plugins: [
        "gatsby-transformer-json",
        "gatsby-plugin-offline",
        "gatsby-plugin-react-helmet",
        "@z1574242600/gatsby-transformer-inline-svg-v2",
        {
            resolve: "gatsby-plugin-layout",
            options: {
                component: require.resolve("./src/components/layout.jsx"),
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "src",
                path: "src/pages",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "static",
                path: "static",
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                excerpt_separator: "<!--more-->",
            }
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                output: "/sitemap.xml",
                query: `
                    {
                        site {
                            siteMetadata {
                                url
                            }
                        }

                        allSitePage {
                            nodes {
                              path
                            }
                        }
                    }
                `,
                resolveSiteUrl: ({ site }) => {
                    return site.siteMetadata.url;
                }
            }
        }
    ],
};
