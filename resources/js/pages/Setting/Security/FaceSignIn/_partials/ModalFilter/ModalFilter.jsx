import "./style.css";
import {
    Button,
    DateRangePicker,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { FeatherIcon } from "@/components/Icon";
import React from "react";

const ModalFilter = (props) => {
    const { content, fields, form, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-center">
                            <h3 className="text-center text-xl font-semibold text-primary-500">
                                Filter
                            </h3>
                        </ModalHeader>
                        <ModalBody
                            as="form"
                            className="grid grid-cols-12 gap-4 w-full pt-2 px-6 pb-6"
                            {...form}
                        >
                            <Controller
                                name="dateRange"
                                control={fields?.dateRange?.control}
                                render={({ field }) => (
                                    <DateRangePicker
                                        {...field}
                                        {...fields?.dateRange}
                                        className="col-span-12"
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                onPress={onClose}
                                className="col-span-12 bg-primary-600 text-white"
                            >
                                Apply
                            </Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalFilter;
