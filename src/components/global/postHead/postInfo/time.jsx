import React from "react";
import PropTypes from "prop-types";
import Icon from "../../icon";

function dateToString(date) {
    const time = new Date( date );
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    return `${y}-${m}-${d}`;
}

export default function Time(props) {
    const { date, update } = props.time;
    return (
        <React.Fragment>
            <span>
                <Icon src='/md/today' />{" 发表于 "}
                <time dateTime={ date } itemProp="dateCreated datePublished">{ dateToString(date) }</time>
            </span>|

            {update && 
                <span>
                    <Icon src='/md/update' />{" 更新于 "}
                    <time dateTime={ update } itemProp="dateModified">{ dateToString(update) }</time>
                </span>
            }

            {update && "|"}
        </React.Fragment>
    );
}

Time.propTypes = {
    time: PropTypes.shape({
        date: PropTypes.string,
        update: PropTypes.string
    }) 
};