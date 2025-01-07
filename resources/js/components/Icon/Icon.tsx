import "./style.css";
import { IconProps, IconComponent } from "./types";
import Str from "@/utilities/Str";

function Icon({ className, path, ...attrs }: IconProps): JSX.Element {
    return (
        <div
            {...attrs}
            className={Str.joinClassName("icon-component", className)}
            style={{ backgroundImage: `url('/icons/${path}')` }}
        />
    );
}

export default Icon as IconComponent;
