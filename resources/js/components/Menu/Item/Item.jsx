import "./style.css";
import { Link } from "react-router";
import React, {useMemo} from "react";
import Str from "@/utilities/Str";
import Visibility from "../../Visibility";
import Ripple from "../../Ripple";

const Item = React.forwardRef((props, ref) => {
    const {
        children,
        className,
        classNames,
        hidden,
        href,
        target,
        isActive,
        itemObject,
        onClick,
        reload,
        render = (item, child) => child,
        ...attrs
    } = props;

    const getAttr = (attrName) => {
        const attr = props?.[attrName];

        if(attrName === "render") return attr ?? ((item, child) => child);
        else if (typeof attr === "function") return attr({...props, data: itemObject});
        else return attr;
    };

    return useMemo(() => (
        <Visibility hidden={getAttr("hidden")}>
            <Ripple>
                <li
                    ref={ref}
                    onClick={(event) => onClick?.(event, {...props, data: itemObject})}
                    className={Str.joinClassName(
                        "menu-item-component",
                        getAttr("className"),
                        getAttr("classNames")?.base
                    )}
                >
                    <Link
                        reloadDocument={getAttr("reload")}
                        to={getAttr("href")}
                        target={getAttr("target")}
                        className={Str.joinClassName(
                            getAttr("classNames")?.link,
                            getAttr("isActive") && "active"
                        )}
                    >
                        {getAttr("render")(
                            {...props, data: itemObject},
                            getAttr("children")
                        )}
                    </Link>
                </li>
            </Ripple>
        </Visibility>
    ), [props]);
});

export default Item;
