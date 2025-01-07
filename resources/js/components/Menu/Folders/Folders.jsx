import "./style.css";
import Folder from "../Folder";
import Item from "../Item";
import React, {memo, useMemo} from "react";
import Str from "@/utilities/Str";

const Folders = memo((props) => {
    const {
        attributeMaps: AM,
        data,
        filter,
        isActive,
        itemAttributeMaps: IAM,
        itemFilter,
        itemRender,
        render,
        ...attrs
    } = props;

    const attrMaps = (maps) => ({
        children: maps?.children ?? "children",
        className: maps?.className ?? "className",
        classNames: maps?.classNames ?? "classNames",
        data: maps?.data ?? "data",
        filter: maps?.filter ?? "filter",
        hidden: maps?.hidden ?? "hidden",
        href: maps?.href ?? "href",
        target: maps?.target ?? "target",
        isActive: maps?.isActive ?? "isActive",
        items: maps?.items ?? "items",
        itemRender: maps?.itemRender ?? "itemRender",
        reload: maps?.reload ?? "reload",
        render: maps?.render ?? "render",
    });

    const getAttr = (attrName, item, maps = AM) => {
        const propsAttr = props?.[attrName];

        if (typeof propsAttr === "function") return propsAttr;
        else return item?.[attrMaps(maps)[attrName]] ?? propsAttr;
    };

    return useMemo(() => (
        <>
            {data?.map((item, index) => {
                if (typeof itemFilter === "function" && itemFilter(item))
                    return (
                        <Item
                            {...attrs}
                            key={`menu-folder-${index}`}
                            itemObject={item}
                            className={getAttr("className", item, IAM)}
                            classNames={getAttr("classNames", item, IAM)}
                            hidden={getAttr("hidden", item, IAM)}
                            href={getAttr("href", item, IAM)}
                            target={getAttr("target", item, IAM)}
                            isActive={getAttr("isActive", item, IAM)}
                            reload={getAttr("reload", item, IAM)}
                            render={getAttr("itemRender", item, IAM) ?? getAttr("render", item, IAM)}
                        >
                            {getAttr("children", item, IAM)}
                        </Item>
                    );

                return (
                    <Folder
                        {...attrs}
                        key={`menu-folder-${index}`}
                        folderObject={item}
                        attributeMaps={AM}
                        className={getAttr("className", item)}
                        classNames={getAttr("classNames", item)}
                        data={getAttr("data", item)}
                        filter={filter}
                        hidden={getAttr("hidden", item)}
                        href={getAttr("href", item)}
                        target={getAttr("target", item)}
                        isActive={getAttr("isActive", item)}
                        itemAttributeMaps={IAM}
                        itemFilter={itemFilter}
                        items={getAttr("items", item)}
                        reload={getAttr("reload", item)}
                        render={getAttr("render", item)}
                    >
                        {getAttr("children", item)}
                    </Folder>
                );
            })}
        </>
    ), [props]);
});

export default Folders;
