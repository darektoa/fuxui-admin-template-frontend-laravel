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
    const { content, onSubmit, action, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-center">
                            <h3 className="text-center text-xl font-semibold text-base-content">
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
                                label="Start Date, End Date"
                                className="col-span-12"
                                // value={value}
                                // onChange={dateRangeHandle}
                            />
                            <Button
                                type="submit"
                                onPress={onClose}
                                className="col-span-12 bg-base-content text-base-100"
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
