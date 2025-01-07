import "./style.css";
import Folders from "../Folders";
import Items from "../Items";
import React, {useMemo} from "react";
import Ripple from "@/components/Ripple";
import Str from "@/utilities/Str";
import Visibility from "../../Visibility";

const Folder = React.forwardRef((props, ref) => {
    const {
        attributeMaps: AM,
        children,
        className,
        classNames,
        data,
        filter,
        folderObject,
        itemFilter,
        hidden,
        href,
        target,
        isActive,
        items,
        itemAttributeMaps,
        onClick,
        reload,
        render,
        ...attrs
    } = props;

    const getAttr = (attrName) => {
        const attr = props?.[attrName];

        if(attrName === "render") return attr ?? ((item, child) => child);
        else if (typeof attr === "function") return attr({...props, data: folderObject});
        else return attr;
    };

    const isChildActive = items?.some((item) =>
        typeof isActive == "function" ? isActive?.({...props, data: item}) : Boolean(isActive)
    );

    return useMemo(() => (
        <Visibility hidden={getAttr("hidden")}>
            <li
                {...attrs}
                ref={ref}
                className={Str.joinClassName(
                    "menu-folder-component",
                    getAttr("className"),
                    getAttr("classNames")?.base
                )}
            >
                <details
                    open={isChildActive}
                    className={Str.joinClassName(
                        getAttr("classNames")?.details,
                        (getAttr("isActive") || isChildActive) && "active"
                    )}
                >
                    <Ripple>
                        <summary
                            className={getAttr("classNames")?.summary}
                            onClick={(event) => {
                                onClick?.(event, {...props, data: folderObject});
                            }}
                        >
                            {getAttr("render")(
                                {...props, data: folderObject},
                                getAttr("children")
                            )}
                        </summary>
                    </Ripple>

                    <ul className={getAttr("classNames")?.list}>
                        <Folders
                            {...props}
                            data={filter ? data?.filter(filter) : data}
                            attributeMaps={AM}
                            itemAttributeMaps={itemAttributeMaps}
                        />

                        <Items
                            {...props}
                            data={
                                itemFilter ? items?.filter(itemFilter) : items
                            }
                            attributeMaps={itemAttributeMaps}
                        />
                    </ul>
                </details>
            </li>
        </Visibility>
    ), [props]);
});

export default Folder;
