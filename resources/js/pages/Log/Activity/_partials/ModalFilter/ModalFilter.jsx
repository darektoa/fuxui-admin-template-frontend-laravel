import "./style.css";
import {
    Button,
    DateRangePicker,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import React from "react";

const ModalFilter = (props) => {
    const {
        action,
        content,
        onChange,
        onSubmit,
        setValues,
        values,
        ...attrs
    } = props;

    const dateRangeHandle = ({start, end}) => {
        setValues(states => ({
            ...states,
            startDate: start,
            endDate: end,
        }))
    };

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
                            action={action}
                            onSubmit={onSubmit}
                            className="grid grid-cols-12 gap-4 w-full pt-2 px-6 pb-6"
                        >
                            <DateRangePicker
                                name="dateRange"
                                label="Start Date, End Date"
                                className="col-span-12"
                                onChange={dateRangeHandle}
                                defaultValue={{
                                    start: values?.startDate,
                                    end: values?.endDate
                                }}
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
