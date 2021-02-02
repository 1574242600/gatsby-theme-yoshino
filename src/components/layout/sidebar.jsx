import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AuthorCard from "./sidebar/authorCard";
import SidebarStyle from "./style/sidebar.module.css";
import Overlay from "./sidebar/overlay";
import Menu from "./sidebar/menu";
import Contacts from "./sidebar/contacts";
import Footer from "./sidebar/footer";
import { isLg } from "../../global";

export default class Sidebar extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            activeKey: "0"
        };
        
        this.startXYT = {};
        this.hanleTouchStart = this.hanleTouchStart.bind(this);
        this.hanleTouchEnd = this.hanleTouchEnd.bind(this);
    }

    hanleTouchStart(event) {
        this.startXYT.y = event.touches[0].pageY;
        this.startXYT.x = event.touches[0].pageX;
        this.startXYT.time = new Date().getTime();
    }

    hanleTouchEnd(event) {
        const { open, onOverlayClick: onSwipeLeftRight } = this.props;
        const startXYT = this.startXYT;
        const timeDiff = new Date().getTime() - startXYT.time;
        const xDiff = startXYT.x - event.changedTouches[0].pageX;
        const yDiff = startXYT.y - event.changedTouches[0].pageY;
        //console.log(timeDiff);
        //console.log(yDiff); console.log(xDiff);
        // abs(xDiff) timeDiff 判断是否为单击， abs(yDiff) 判断是否为上下滑动
        if ( timeDiff > 100 && Math.abs(xDiff) > 20 && Math.abs(yDiff) < 50) { 
            // xDiff 判断是否为左右滑动  < 0 向右， > 0 向左  
            if ( (xDiff < 0 && !open) ||  (xDiff > 0 && open) ) {
                onSwipeLeftRight();
            }
        } 
    }

    componentDidMount() {
        window.addEventListener("touchstart", this.hanleTouchStart);
        window.addEventListener("touchend", this.hanleTouchEnd);
    }

    componentWillUnmount() {
        window.removeEventListener("touchstart", this.hanleTouchStart);
        window.removeEventListener("touchend", this.hanleTouchEnd);
    }

    render() {
        const { open, onOverlayClick } = this.props;
        const classNames = [SidebarStyle.sidebar, SidebarStyle.sidebarShadow];
        classNames.push( open ? SidebarStyle.open : SidebarStyle.close);

        const OverlayPortal = (isLg === false && open) ?
            ReactDOM.createPortal(<Overlay handleOverlayClick={ onOverlayClick } />, document.body)
            : undefined;

        return (
            <div className={ classNames.join(" ") } 
                style={{
                    /* 解决手机浏览器底部地址栏导致的侧边栏上移问题  */
                    maxHeight: typeof window !== undefined && window.innerHeight
                }}
            >
                {/*  移动端 侧边栏打开时的的遮盖层*/}
                <div onClick={onOverlayClick}>
                    { OverlayPortal }
                </div>

                <div style={{ minHeight: "calc(100% - 125px)" }}>
                    <AuthorCard />
                    <div className={ SidebarStyle.divider } ></div>
                    <Menu onRouteChange={ onOverlayClick } />
                </div> 

                <Contacts />
                <div className={ SidebarStyle.divider } ></div>
                <Footer />
            </div>
        );
    }

}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired
};


