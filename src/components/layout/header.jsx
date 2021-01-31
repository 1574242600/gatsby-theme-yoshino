import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import ToolbarStyle from "./style/toolbar.module.css";
import Icon from "../global/icon";

export default function Header(props) {
    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
          }
        `
    );

    return (
        <header className={ ToolbarStyle.toolbar + " " + ToolbarStyle.toolbarShadow } >
            <Icon
                src='/md/menu'
                style={{ float: "left" }}
                className={ ToolbarStyle.icon }
                onClick={ props.onMenuIconClick }
            />
            <span className={ ToolbarStyle.title }>{ data.site.siteMetadata.title }</span>
            <Icon
                src='/md/brightness_6'
                style={{ float: "right" }}
                className={ ToolbarStyle.icon }
                onClick={ props.onDarkIconClick }
            />
        </header>
    );

}

Header.propTypes = {
    onMenuIconClick: PropTypes.func.isRequired,
    onDarkIconClick: PropTypes.func.isRequired
};