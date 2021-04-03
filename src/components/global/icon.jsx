import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import IconStyle from "./style/icon.module.css";

function fetchSvg(src) {
    const _window = typeof window !== "undefined" && window;
    if (_window.svgCaches === undefined) { _window.svgCaches = new Map(); }

    const blobUrl = _window.svgCaches.get(src);

    if (blobUrl === undefined) {

        const asyncFunc = window.fetch(src)
            .then((data) => {
                const clone = data.clone();

                clone.blob().then(svgBlob => {
                    _window.svgCaches.set(src, URL.createObjectURL(svgBlob));
                });

                return data.text();
            });

        _window.svgCaches.set(src, asyncFunc);
        return asyncFunc;
    }

    if (typeof blobUrl === "string") {
        return window.fetch(blobUrl);
    }

    return blobUrl;
}

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