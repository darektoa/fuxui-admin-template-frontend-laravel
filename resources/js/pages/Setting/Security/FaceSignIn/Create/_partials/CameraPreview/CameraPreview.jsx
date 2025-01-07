import "./style.css";
import React, { forwardRef } from "react";
import Str from "@/utilities/Str";
import Visibility from "@/components/Visibility";

const CameraPreview = forwardRef((props, ref) => {
    const { children, className, hidden, value, ...attrs } = props;

    return (
        <Visibility hidden={hidden}>
            <div
                {...attrs}
                className={Str.joinClassName(
                    "camera-preview-component",
                    className
                )}
            >
                <video ref={ref} autoPlay muted className="w-full h-full" />
            </div>
        </Visibility>
    );
});

export default CameraPreview;
