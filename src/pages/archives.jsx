import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import * as ArchivesStyle from "./style/archives.module.css";
import Seo from "components/global/seo";

export default class Archives extends React.Component {
    constructor (props) {
        super(props);
    }

    dateToString(date) {
        return `${date.getMonth() + 1}-${date.getDate()}`;
    }

    toYearKey(edges) {
        const result = {};

        edges.forEach(({ node }) => {
            const date = new Date(node.frontmatter.date);
            const year = date.getFullYear();
            if (result[year] === undefined) { result[year] = []; }
            result[year].push(node);
        });

        return result;
    }

    renderTimeLine(data) {
        const yearIndex = Object.keys(data).reverse();

        return (
            <ul>
                { yearIndex.map((year) => {
                    return (
                        <li key={ year }>
                            <h3>{ year }</h3>
                            <ul>
                                { data[year].map((node) => {
                                    const { id, frontmatter: { title, date }, fields: { slug } } = node;
                                    return (
                                        <li key={ id }>
                                            <time dateTime={ date }>{ this.dateToString(new Date(date)) }</time>
                                            <Link to={ slug }>{ title }</Link>
                                        </li>
                                    );
                                }) }
                            </ul>
                        </li>
                    );
                }) }
            </ul>
        );
    }

    render() {
        const edges = this.props.data.allMarkdownRemark.edges;

        return (
            <div className={ ArchivesStyle.archivesCard }>
                <Seo title={ "归档" } >
                </Seo>
                <h1>归档</h1>
                <div className={ ArchivesStyle.archivesList }>
                    { this.renderTimeLine(this.toYearKey(edges)) }
                </div>
            </div>
        );
    }
}

Archives.propTypes = {
    data: PropTypes.object
};

export const query = graphql`
    query archivesQuery{
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC} filter: {fileAbsolutePath: {regex: "/(?<!about)\\.md$/"}}) {
            edges {
                node {
                    id
                    frontmatter { 
                        title
                        date
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;