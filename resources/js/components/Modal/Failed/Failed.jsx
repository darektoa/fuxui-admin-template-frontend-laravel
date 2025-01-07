import "./style.css";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import failedAnimationData from "@/assets/lotties/failed.json";
import Lottie from "lottie-react";
import React from "react";

const Failed = (props) => {
    const { content, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody className="flex flex-col items-center overflow-hidden md:flex-row">
                        <Lottie
                            animationData={failedAnimationData}
                            background=""
                            speed="1"
                            autoplay
                            loop={true}
                            direction="1"
                            mode="normal"
                            className="flex h-full max-w-40 grow basis-0 scale-125 items-center md:grow-[4]"
                        ></Lottie>
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
