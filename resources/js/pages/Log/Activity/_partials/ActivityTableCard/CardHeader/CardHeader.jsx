import { Button, CardHeader as NextCardHeader, Input } from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { useEventHandler } from "../../../_hooks";
import { useForm } from "react-hook-form";
import isAuthorized from "@/utilities/isAuthorized";
import React, { useMemo } from "react";
import MorePopoverButton from "./MorePopoverButton";

function CardHeader() {
    const { btnFilterOnClick, searchOnChange } = useEventHandler();
    const { register } = useForm();

    console.log("Activity Table Card - Card Header");

    return useMemo(() => (
        <NextCardHeader className="w-full pt-6 px-6 pb-3 grid grid-cols-12 gap-3">
            <div className="flex items-center col-span-4">
                <FeatherIcon.Activity className="size-10 mr-3 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg uppercase">
                        Activity Log
                    </h3>
                    <p className="text-small text-default-500">
                        List of all activity log
                    </p>
                </div>
            </div>

            <Input
                isClearable
                className="w-full col-span-4 mx-auto sm:max-w-xs"
                placeholder="Search here . . ."
                startContent={
                    <FeatherIcon.Search className="size-5 shrink-0" />
                }
                {...register("search", {
                    onChange: searchOnChange,
                })}
            />

            <div className="w-full col-span-4 flex justify-end gap-2">
                <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    className="p-1"
                    onClick={btnFilterOnClick}
                >
                    <FeatherIcon.Filter className="size-5" />
                </Button>

                <MorePopoverButton />
            </div>
        </NextCardHeader>
    ), []);
}

export default CardHeader;
