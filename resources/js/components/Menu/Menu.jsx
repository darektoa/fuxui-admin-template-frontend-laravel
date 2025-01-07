import "./style.css";
import React from "react";
import Str from "@/utilities/Str";
import Visibility from "../Visibility";

const Menu = React.forwardRef((props, ref) => {
    const { children, className, hidden, path, ...attrs } = props;

    return (
        <Visibility hidden={hidden}>
            <ul
                {...attrs}
                ref={ref}
                className={Str.joinClassName("menu menu-component", className)}
            >
                {children}
            </ul>
        </Visibility>
    );
});

export default Menu;
