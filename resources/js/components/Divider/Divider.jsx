import "./style.css";
import React from "react";
import Str from "@/utilities/Str";

function Divider(props) {
    const { className, ...attrs } = props;

    return (
        <hr
            {...attrs}
            className={Str.joinClassName("divider-component", className)}
        />
    );
}

export default Divider;
