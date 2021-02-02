import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function Seo(props) {
    const { site: { siteMetadata } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }`
    );

    return (
        <Helmet defer={false}>
            <title>
                { props.title 
                    ? props.title + " | " + siteMetadata.title 
                    : siteMetadata.title 
                }
            </title>

            { props.children }
        </Helmet>
    );
}

Seo.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};
