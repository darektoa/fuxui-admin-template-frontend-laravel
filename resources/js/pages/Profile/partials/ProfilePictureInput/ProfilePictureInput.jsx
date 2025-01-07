import "./style.css";
import React from "react";
import Str from "@/utilities/Str";
import Visibility from "@/components/Visibility";

function ProfilePictureInput(props) {
    const {
        className,
        hidden,
        imagePreviewSrc,
        label,
        multiple,
        name,
        onChange,
        required,
        ...attrs
    } = props;

    return (
        <Visibility hidden={hidden}>
            <label
                {...attrs}
                className={Str.joinClassName("form-control", className)}
            >
                <div className="flex flex-col px-1 py-2">
                    <h5 className="label-text text-base font-semibold">
                        {label}
                    </h5>
                </div>
                <div className="group/contentEditorImageInputCard relative w-full overflow-hidden mask mask-squircle">
                    <figure className="relative w-full overflow-hidden bg-base-300">
                        <div
                            className="absolute -z-0 aspect-square w-full scale-125 rounded-t-2xl bg-cover bg-center blur-3xl"
                            style={{
                                backgroundImage:
                                    "url('/images/illustrations/snap_the_moment_bg.svg')",
                            }}
                        ></div>

                        <Visibility hidden={!imagePreviewSrc}>
                            <img
                                src={imagePreviewSrc ?? ""}
                                className="relative z-10 aspect-square w-full object-cover"
                                alt=""
                            />
                        </Visibility>
                    </figure>
                    <div className="group/contentEditorImageInputCardForeground absolute left-0 top-0 z-20 flex h-full w-full bg-base-300/60 opacity-0 transition-all group-hover/contentEditorImageInputCard:opacity-100">
                        <div className="absolute z-20 flex items-center h-full w-full scale-[0.1] p-4 transition-all duration-300 group-hover/contentEditorImageInputCardForeground:scale-100">
                            <input
                                required={required}
                                onChange={onChange}
                                multiple={multiple}
                                type="file"
                                name={name}
                                className="file-input-default file-input file-input-bordered file-input-sm w-full"
                            />
                        </div>
                    </div>
                </div>
            </label>
        </Visibility>
    );
}

export default ProfilePictureInput;
