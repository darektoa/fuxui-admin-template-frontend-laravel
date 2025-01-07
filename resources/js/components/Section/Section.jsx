import "./style.css";
import React from "react";
import Str from "@/utilities/Str";
import Permission from "../Permission";
import Visibility from "../Visibility";

function Section(props) {
    const { children, className, hidden, permissions, ...attrs } = props;

    return (
        <Visibility hidden={hidden}>
            <Permission ignore={!permissions} permissions={permissions}>
                <section
                    {...attrs}
                    className={Str.joinClassName(
                        "section-component",
                        className
                    )}
                >
                    {children}
                </section>
            </Permission>
        </Visibility>
    );
}

export default Section;
