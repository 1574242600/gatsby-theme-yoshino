import React from "react";
import Since from "./footer/since";
import FooterStyle from "./style/footer.module.css";
import { useStaticQuery, graphql } from "gatsby";

export default function AuthorCard() {
    const { site: { siteMetadata } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        url
                        since
                        title
                        author
                    }
                }
            }`
    );
        
    const { since, title, author, url } = siteMetadata;

    return (
        <footer className={ FooterStyle.footer } >
            <Since since={ since } />
            <div>© { (new Date).getFullYear() } { title }. {"Powered by"} <a href={"//www.gatsbyjs.com/"} target={"_blank"} rel="noreferrer">gatsby</a></div>
            <div>
                {"Theme by  "} 
                <a href={"//github.com/1574242600/gatsby-theme-yoshino"} target={"_blank"} rel="noreferrer">
                    yoshino v0.1.1
                </a> 
            </div>
            <div>
                <span>Made with by { author }.</span> 
                {" "}
                <span><a href={`${url }/sitemap.xml`}>sitemap</a></span>
                {" "}
                <span><a href={`${url }/rss.xml`}>rss</a></span>
            </div>
        </footer>
    );
}