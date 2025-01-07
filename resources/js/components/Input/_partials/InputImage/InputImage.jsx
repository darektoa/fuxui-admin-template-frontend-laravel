import "./style.css";
import React from "react";
import Str from "@/utilities/Str";
import Visibility from "@/components/Visibility";

function InputImage(props) {
    const {
        className,
        hidden,
        imagePreviewSrc,
        label,
        name,
        onChange,
        required,
        ...attrs
    } = props;

    return (
        <Visibility hidden={hidden}>
            <label
                {...attrs}
                className={Str.joinClassName(
                    "form-control col-span-12",
                    className
                )}
            >
                <div className="flex flex-col px-1 py-2">
                    <h5 className="label-text text-base font-semibold">
                        {label}
                    </h5>
                </div>
                <div className="group/contentEditorImageInputCard relative w-full overflow-hidden rounded-lg">
                    <figure className="relative w-full overflow-hidden bg-base-300">
                        <div
                            className="absolute -z-0 aspect-video w-full scale-125 rounded-t-2xl bg-cover bg-center blur-3xl"
                            style={{
                                backgroundImage:
                                    "url('/images/illustrations/snap_the_moment_bg.svg')",
                            }}
                        ></div>

                        <img
                            src={imagePreviewSrc ?? ""}
                            className="relative z-10 aspect-video w-full object-contain"
                            alt=""
                        />
                        <Visibility hidden={!imagePreviewSrc}></Visibility>
                    </figure>
                    <div className="group/contentEditorImageInputCardForeground absolute left-0 top-0 z-20 flex h-full w-full bg-base-300/60 opacity-0 transition-all group-hover/contentEditorImageInputCard:opacity-100">
                        <div className="absolute z-20 flex h-full w-full scale-[0.1] p-4 transition-all duration-300 group-hover/contentEditorImageInputCardForeground:scale-100">
                            <input
                                required={required}
                                onChange={onChange}
                                type="file"
                                name={name}
                                className="file-input-default file-input file-input-bordered file-input-sm mt-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </label>
        </Visibility>
    );
}

export default InputImage;
