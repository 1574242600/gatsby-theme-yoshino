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
                        since
                        title
                        author
                    }
                }
            }`
    );

    return (
        <footer className={ FooterStyle.footer } >
            <Since since={ siteMetadata.since } />
            <div>© { (new Date).getFullYear() } { siteMetadata.title }. 由 <a href={"//www.gatsbyjs.com/"} target={"_blank"} rel="noreferrer">gatsby</a> 强力驱动.</div>
            <div>Theme By <a href={"//github.com/1574242600/gatsby-theme-yoshino"} target={"_blank"} rel="noreferrer">yoshino</a> v0.0.1</div>
            <div>Made with by { siteMetadata.author }.</div>
        </footer>
    );
}