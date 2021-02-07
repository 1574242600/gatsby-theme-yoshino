import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import * as commentIndex from "./comment/index";

export default function Comment(props) {
    const { site: { siteMetadata: { comment: commentConfig } } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        comment {
                            type
                            id
                        }
                    }
                }
            }`
    );

    const { postTitle } = props;
    const { type, id: siteId } = commentConfig;
    const comment = commentIndex[type];
    if ( comment === undefined ) { return `error: no found ${type}`;}
    
    useEffect(() => {
        comment.load(siteId, postTitle);
        return comment.destroy;
    });

    return (
        <div id={comment.elementId}>
            <div> loading...</div>
        </div>
    ); 
}

Comment.propTypes = { 
    postTitle: PropTypes.string
};
