import {
    Button,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { useEventHandler } from "../../../_hooks";
import React, { useMemo } from "react";

function MorePopoverButton() {
    const { btnExportExcelOnClick, btnExportPDFOnClick } = useEventHandler();

    return useMemo(
        () => (
            <Popover
                placement="left-start"
                classNames={{
                    content: "p-0 backdrop-blur-sm bg-base-100/80",
                }}
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        className="p-1"
                    >
                        <FeatherIcon.MoreVertical className="size-5" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                        <Listbox
                            variant="flat"
                            aria-label="Listbox menu with descriptions"
                        >
                            <ListboxItem
                                // isDisabled={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP68S")}
                                description="File format .xlsx"
                                onClick={btnExportExcelOnClick}
                                startContent={
                                    <FeatherIcon.FileText className="size-5 text-green-500" />
                                }
                            >
                                Download Excel File
                            </ListboxItem>
                            <ListboxItem
                                // isDisabled={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP68S")}
                                description="File format .pdf"
                                onClick={btnExportPDFOnClick}
                                startContent={
                                    <FeatherIcon.FileText className="size-5 text-red-500" />
                                }
                            >
                                Download PDF File
                            </ListboxItem>
                        </Listbox>
                    </div>
                </PopoverContent>
            </Popover>
        ),
        [btnExportExcelOnClick, btnExportPDFOnClick]
    );
}

export default MorePopoverButton;
