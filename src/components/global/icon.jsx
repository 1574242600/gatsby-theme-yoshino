import React from "react";
import PropTypes from "prop-types";
import IconStyle from "./style/icon.module.css";

export default class Icon extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            svgHtml: ""
        };
    }

    componentDidMount() {
        const { src } = this.props;

        fetch(`/icon${src}.svg`)
            .then((data) => data.text())
            .then((svgHtml) => {
                this.setState({
                    svgHtml: svgHtml
                });
            }).catch((e) => {
                if (e) { console.error(e); }
                this.setState({
                    svgHtml: "load icon error"
                });
            });
    }

    render() {
        const { className, ...other } = this.props;
        const { svgHtml } = this.state;

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
}

Icon.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
};