import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import LinkStyle from "./style/link.module.css";

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    renderFriend() {

    }

    render() {
        const { dataJson: { links } } = this.props.data;

        return (
            <div className={ LinkStyle.center }>
                
                { JSON.stringify(links)}
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