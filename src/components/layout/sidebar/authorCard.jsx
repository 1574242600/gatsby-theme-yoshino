import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Avatar from "./authorCard/avatar";
import Name from "./authorCard/name";
import Description from "./authorCard/description";

export default function AuthorCard() {
    const { site: { siteMetadata } } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        avatar,
                        author,
                        description
                    }
                }
            }`
    );

    return (
        <div>
            <div style={ { margin: "16px" } }>
                <Avatar
                    src={ siteMetadata.avatar }
                    width={ 100 }
                    height={ 100 }
                />

                <Name name={ siteMetadata.author }>
                    <Description> { siteMetadata.description } </Description>
                </Name>
            </div>
        </div>
    );
}