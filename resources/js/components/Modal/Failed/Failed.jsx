import "./style.css";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";

const Failed = (props) => {
    const { content, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody className="flex flex-col items-center overflow-hidden md:flex-row">
                        <lottie-player
                            src="https://lottie.host/f49526d3-ac72-459c-b178-571d48ab912d/ofyPJjQSIK.json"
                            background=""
                            speed="1"
                            autoplay
                            loop
                            direction="1"
                            mode="normal"
                            class="flex h-full max-w-40 grow basis-0 scale-125 items-center md:grow-[4]"
                        ></lottie-player>
                        <div className="flex h-full grow basis-0 flex-col justify-center md:grow-[8]">
                            <h3 className="my-2 break-words text-center text-lg font-bold uppercase text-error md:text-left">
                                Failed
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

export default Failed;
