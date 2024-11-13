import './style.css';
import { FeatherIcon } from '@/components/Icon';
import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import Str from '@/utilities/StringHelper';
import Visibility from '@/components/Visibility';

const ContentInput = (props) => {
    const {
        hidden,
        type,
        imagePreviewSrc,
        ...attrs
    } = props;

    return (
        <>
            <Visibility hidden={hidden || type != 'text'}>
                <Input
                    {...attrs}
                    type="text"
                    labelPlacement="outside"
                    startContent={
                        <>
                            <FeatherIcon.Type className="size-4 mr-2" />
                            <div className="h-4/5 border-r border-slate-400"></div>
                        </>
                    }
                />
            </Visibility>

            <Visibility hidden={hidden || type != 'URL'}>
                <Input
                    {...attrs}
                    type="text"
                    labelPlacement="outside"
                    startContent={
                        <>
                            <FeatherIcon.Link className="size-4 mr-2" />
                            <div className="h-4/5 border-r border-slate-400"></div>
                        </>
                    }
                />
            </Visibility>

            <Visibility hidden={hidden || type != 'color'}>
                <Input
                    {...attrs}
                    type="color"
                    labelPlacement="outside"
                    startContent={
                        <>
                            <FeatherIcon.Droplet className="size-4 mr-2" />
                            <div className="h-4/5 border-r border-whiprimary-border-slate-400"></div>
                        </>
                    }
                />
            </Visibility>

            <Visibility hidden={hidden || type != 'number'}>
                <Input
                    {...attrs}
                    type="number"
                    labelPlacement="outside"
                    startContent={
                        <>
                            <FeatherIcon.Hash className="size-4 mr-2" />
                            <div className="h-4/5 border-r border-slate-400"></div>
                        </>
                    }
                />
            </Visibility>

            <Visibility hidden={hidden || type != 'image'}>
                <label className={Str.joinClassName("form-control col-span-12", props?.className)}>
                    <div className="flex flex-col px-1 py-2">
                        <h5 className="label-text text-base font-semibold">
                            {props?.label}
                        </h5>
                    </div>
                    <div className="group/contentEditorImageInputCard relative w-full overflow-hidden rounded-lg">
                        <figure className="relative w-full overflow-hidden bg-base-300">
                            <div
                                className="absolute -z-0 aspect-video w-full scale-125 rounded-t-2xl bg-cover bg-center blur-3xl"
                                style={{ backgroundImage: "url('/images/illustrations/snap_the_moment_bg.svg')" }}></div>
                            <img
                                src={props?.imagePreviewSrc ?? ''}
                                className="relative z-10 aspect-video w-full object-contain"
                                alt="" />
                        </figure>
                        <div
                            className="group/contentEditorImageInputCardForeground absolute left-0 top-0 z-20 flex h-full w-full bg-base-300/60 opacity-0 transition-all group-hover/contentEditorImageInputCard:opacity-100">
                            <div
                                className="absolute z-20 flex h-full w-full scale-[0.1] p-4 transition-all duration-300 group-hover/contentEditorImageInputCardForeground:scale-100">
                                <input
                                    required
                                    onChange={props?.onChange}
                                    type="file"
                                    name={props?.name}
                                    className="file-input-default file-input file-input-bordered file-input-sm mt-auto w-full" />
                            </div>
                        </div>
                    </div>
                </label>
            </Visibility>
        </>
    )
}

export default ContentInput;
