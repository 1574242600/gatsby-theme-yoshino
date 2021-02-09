import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import LinkStyle from "./style/link.module.css";

export default class Link extends React.Component {
    constructor (props) {
        super(props);
    }

    renderFriends(links) {
        return links.map((friend, index) => {
            const { avatar, description, name, url, inaccessible } = friend;
            return (
                <li className={ LinkStyle.linkItem } key={ index }>
                    <a href={url} target={"_blank"} rel="noreferrer">
                        <img className={ "lazyload" } data-src={ avatar } />
                        <h4>{ name }</h4>
                        <p>{ description }</p>
                        { inaccessible === true && 
                            <p style={{ color: "red"}}> 链接已失效 </p>
                        }
                    </a>
                </li>
            );
        });
    }

    render() {
        const { dataJson: { links } } = this.props.data;

        return (
            <div className={ LinkStyle.linkCard }>
                <h1>朋友们</h1>
                <ul className={ LinkStyle.linkList }>
                    { this.renderFriends(links) }
                </ul>
            </div>
        );
    }
}

Link.propTypes = {
    data: PropTypes.object
};

export const query = graphql`
    query linkQuery {
        dataJson {
            links {
                avatar
                description
                name
                url
                inaccessible
            }
        }
    }
`;