import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as DragStyle from "./style/drag.module.css";

function handleMouseDown(e, clickRef, moveRef, setDragging, setRefXY) {
    const clickElem = clickRef.current;
    const moveElem = moveRef.current;

    if (e.target == clickElem) {
        const refXY = {};
        const moveElemRect = moveElem.getBoundingClientRect();
        refXY.x = e.clientX - moveElemRect.left;
        refXY.y = e.clientY - moveElemRect.top;
        //console.log(`${moveElemRect.left}  ${ moveElemRect.top }`);
        //console.log(refXY);
        //console.log(refXY);
        setRefXY(refXY);
        setDragging(true);
    }

}

function handleMouseMove(e, dragging, refXY, setMoveXY) {
    if (dragging) {
        const moveXY = {};
        moveXY.x = e.clientX - refXY.x;
        moveXY.y = e.clientY - refXY.y;
        //console.log("move  client");
        //console.log(moveXY);
        //console.log({x:e.clientX, y: e.clientY});
        setMoveXY(moveXY);
    }
}

function handleMouseUp(setDragging) {
    setDragging(false);
}

export default function drag(props) {
    const { children, style, title } = props;
    const clickRef = useRef(null);
    const moveRef = useRef(null);

    const [dragging, setDragging] = useState(false);
    const [refXY, setRefXY] = useState({ x: 0, y: 0 });
    const [moveXY, setMoveXY] = useState({ x: undefined, y: undefined });

    useEffect(() => {
        const onMouseDown = (e) => handleMouseDown(e, clickRef, moveRef, setDragging, setRefXY);
        document.addEventListener("mousedown", onMouseDown);

        return () => document.removeEventListener("mousedown", onMouseDown);
    }, []);

    useEffect(() => {
        const onMouseMove = (e) => handleMouseMove(e, dragging, refXY, setMoveXY);
        document.addEventListener("mousemove", onMouseMove);

        return () => document.removeEventListener("mousemove", onMouseMove);
    }, [dragging]);

    useEffect(() => {
        const onMouseUp = () => handleMouseUp(setDragging);
        document.addEventListener("mouseup", onMouseUp);

        return () => document.removeEventListener("mouseup", onMouseUp);
    }, []);

    const portal = typeof window !== "undefined"
        ? ReactDOM.createPortal((
            <div
                ref={ moveRef }
                className={ DragStyle.drag }
                style={ Object.assign({}, { left: moveXY.x, top: moveXY.y, padding: "8px" }, style) }
            >
                <div ref={ clickRef } className={ DragStyle.title } >{ title }</div>
                <div className={ "divider" }></div>
                { children }
            </div>), document.body)
        : "";

    return portal;
}

drag.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};