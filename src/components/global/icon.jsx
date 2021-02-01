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

    fetchSvg(src) {
        const _window = typeof window !== "undefined" && window;
        if (_window.svgCaches === undefined) { _window.svgCaches = new Map(); }

        const blobUrl = _window.svgCaches.get(src);

        if (blobUrl === undefined) {

            const asyncFunc =  window.fetch(src)
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

        if (typeof blobUrl === "string" ) {
            return window.fetch(blobUrl);
        }

        return blobUrl;
    }

    componentDidMount() {
        const { src } = this.props;

        this.fetchSvg(`/icon${src}.svg`)
            .then((data) => (typeof data === "string") ? data : data.text())
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