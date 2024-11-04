import "./style.css";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";

const DeleteConfirm = (props) => {
    const { content, onSubmit, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody
                        as="form"
                        onSubmit={onSubmit}
                        className="flex h-full w-full flex-col p-6"
                    >
                        <h3 className="text-center text-xl font-semibold text-red-500">
                            WARNING!
                        </h3>
                        <p className="mb-6 text-center text-base">{content}</p>
                        <Button
                            type="submit"
                            onPress={onClose}
                            className="bg-red-600 text-white"
                        >
                            Delete
                        </Button>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteConfirm;
