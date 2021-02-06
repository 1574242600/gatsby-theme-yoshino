import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DragStyle from "./style/drag.module.css";

function handleMouseDown(e, ref, setDragging, setRefXY) {
    const moveElem = ref.current;

    if (e.target == moveElem) {
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
        moveXY.x = e.clientX - refXY.x - 10;
        moveXY.y = e.clientY - refXY.y - 10;
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
    const ref = useRef(null);

    const [dragging, setDragging] = useState(false);
    const [refXY, setRefXY] = useState({ x: 0, y: 0 });
    const [moveXY, setMoveXY] = useState({ x: undefined, y: undefined });

    useEffect(() => {
        const onMouseDown = (e) => handleMouseDown(e, ref, setDragging, setRefXY);
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

    return (
        <div className={ DragStyle.dragWrap } style={ style }>
            <div className={ DragStyle.drag }  style={{ left: moveXY.x, top: moveXY.y, padding: "8px" }} >
                <div ref={ ref } className={ DragStyle.title } >{title}</div>
                <div className={"divider"}></div>
                { children }
            </div>
        </div>
    );
}

drag.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};