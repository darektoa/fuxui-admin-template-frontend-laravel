import "./style.css";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";

const Success = (props) => {
    const { content, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody className="flex flex-col items-center overflow-hidden md:flex-row">
                        <lottie-player
                            src="https://lottie.host/04e99f11-26d7-46fb-9081-2c8663f6b31f/ZFQQ1onOOC.json"
                            background=""
                            speed="1"
                            autoplay
                            loop
                            direction="1"
                            mode="normal"
                            class="flex h-full max-w-40 grow basis-0 scale-150 items-center md:grow-[4]"
                        ></lottie-player>
                        <div className="flex h-full grow basis-0 flex-col justify-center md:grow-[8]">
                            <h3 className="my-2 text-center text-lg font-bold uppercase text-success md:text-left">
                                Successfull
                            </h3>
                            <p className="mb-4 max-h-32 overflow-auto break-all">
                                {content}
                            </p>
                            <small className="text-gray-400">
                                Press ESC key or click on X button to close
                            </small>
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};

export default Success;
