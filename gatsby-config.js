/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
/* eslint-disable no-undef */

module.exports = {
    siteMetadata: {
        author: "nworm",
        description: "一条咸鱼",
        avatar: "//q1.qlogo.cn/g?b=qq&nk=1574242600&s=640", //todo: to img.nowrm.icu
        url: "",
        title: "Nworm",
        contacts: [
            { name: "github", id: "1574242600" },
            { name: "telegram", id: "nworm1574" },
            { name: "qq", id: "1574242600" },
            //twitter: { name: 'twitter', id: null},

            /* 
         请将logo矢量图放在/static/icon/logo 与 {name} 同名
      */
            { url: "null" }
            //{ name: 'discord', url: '' },
            //{ name: 'fackbook', url: '' },
            //{ name: 'line', url: '' },
        ]
    },
    plugins: [
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
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                "excerpt_separator": "<!--more-->"
            }
        }
    ]
};
