import "./style.css";
import Item from "../Item";
import React from "react";
import Str from "@/utilities/Str";

const Items = (props) => {
    const { data, attributeMaps: AM, ...attrs } = props;

    const attrMaps = {
        children: AM?.children ?? "children",
        className: AM?.className ?? "className",
        classNames: AM?.classNames ?? "classNames",
        hidden: AM?.hidden ?? "hidden",
        href: AM?.href ?? "href",
        isActive: AM?.isActive ?? "isActive",
        reload: AM?.reload ?? "reload",
        render: AM?.render ?? "render",
    };

    const getAttr = (attrName, item) => {
        const propsAttr = props?.[attrName];
        return item?.[attrMaps[attrName]] ?? propsAttr;
    };

    return (
        <>
            {data?.map((item, index) => (
                <Item
                    {...attrs}
                    itemObject={item}
                    key={`menu-item-${index}`}
                    className={getAttr("className", item)}
                    classNames={getAttr("classNames", item)}
                    hidden={getAttr("hidden", item)}
                    href={getAttr("href", item)}
                    isActive={getAttr("isActive", item)}
                    reload={getAttr("reload", item)}
                >
                    {getAttr("children", item)}
                </Item>
            ))}
        </>
    );
};

export default Items;
