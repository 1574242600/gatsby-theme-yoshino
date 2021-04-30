import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import * as IconStyle from "./style/icon.module.css";

function filterSvgHtml(source, path) {
    for (const { node: svgFile } of source) {
        if (svgFile.relativePath === `icon${path}.svg`) {
            return svgFile.childrenInlineSvg[0].content;
        }
    }

    return "icon error";
}

export default function Icon(props) {
    const { allFile: { edges: allSvg  } } = useStaticQuery(
        graphql`
                query {
                    allFile(filter: { relativePath: {regex: "/^icon/"}}) {
                        edges {
                            node {
                                relativePath
                                childrenInlineSvg {
                                    content
                                }
                            }
                        }
                    }
                }`
    );

    const { path, className, ...other } = props;
    const svgHtml = filterSvgHtml(allSvg, path);

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
};