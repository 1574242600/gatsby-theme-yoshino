import React from "react";
import PropTypes from "prop-types";
import YMenu from "yoshino/lib/Menu/index";
import { navigate } from "gatsby";
import { isLg } from "../../../global";

export default class Menu extends React.Component {
    //todo 其他菜单  i18n
    constructor (props) {
        super(props);

        this.state = {
            activeKey: "0"
        };

        this.updateActiveKey = this.updateActiveKey.bind(this);
    }

    updateActiveKey(id) {
        this.setState({
            activeKey: id
        });
    }

    renderMainItems() {
        const { activeKey } = this.state;
        const updateActiveKey = this.updateActiveKey;

        const itemStyle = { overflow: "visible" };
        return ["主页", "归档", "关于", "朋友"].map((title, index) => {
            return <YMenu.Item 
                onClick={() => { 
                    if (activeKey == index) {
                        updateActiveKey(index + "" );
                        navigate(Menu.paths[index]);
                    }
                }} 
                key={ index } 
                style={ itemStyle }
            >{ title }</YMenu.Item>;
        });
    }

    componentDidMount() {
        const activeKey = window.location.pathname.slice(0, 6) === "/post/"
            ? undefined
            : window.location.pathname.slice(0, 6) === "/page/"
                ? "0"
                : Menu.paths.indexOf(window.location.pathname) + "";

        this.setState({
            activeKey: activeKey
        });
    }

    render() {
        const { onRouteChange: handleSelected } = this.props;
        const { activeKey } = this.state;

        return (
            <YMenu
                activeKey={ activeKey }
                onSelect={ (key) => {
                    this.updateActiveKey(key);
                    navigate(Menu.paths[key]);
                    //移动端： 延迟关闭侧边栏
                    if (!isLg) { setTimeout(() => handleSelected(), 320); }
                } }
            >
                { this.renderMainItems() }
            </YMenu>
        );
    }
}

Menu.paths = [
    "/",
    "/archives",
    "/about",
    "/link"
];

Menu.propTypes = {
    onRouteChange: PropTypes.func.isRequired
};