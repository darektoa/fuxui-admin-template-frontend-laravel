import "./style.css";
import Partial from "./_partials";
import React from "react";

function Input(props) {
    const { type, ...attrs } = props;

    if (type === "image") return <Partial.InputImage {...attrs} />;
}

export default Input;
