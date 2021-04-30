import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import * as IconStyle from "./style/icon.module.css";

export default function Icon(props) {
    const { site: { siteMetadata: { url } } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        url
                    }
                }
            }`
    );

    const { path, html, className, ...other } = props;

    const [ svgHtml, setSvgHtml ] = useState(html);

    useEffect(() => {
        if (path !== undefined) {
            fetchSvg(`${url}/icon${path}.svg`)
                .then((data) => (typeof data === "string") ? data : data.text())
                .then((svgHtml) => {
                    setSvgHtml(svgHtml);
                }).catch((e) => {
                    if (e) { console.error(e); }
                    setSvgHtml("load icon error");
                });
        }
    }, []);

    return (
        <i
            className={ className
                ? IconStyle.icon + " " + className
                : IconStyle.icon
            }
            dangerouslySetInnerHTML={ { __html: svgHtml } }
            { ...other }
        >
        </i>
    );
}

Icon.propTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    html: PropTypes.string
};

Icon.defaultProps = {
    html: ""
};