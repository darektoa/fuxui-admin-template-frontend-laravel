import "./style.css";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import Lottie from "lottie-react";
import React from "react";
import succesAnimationData from "@/assets/lotties/success.json";

const Success = (props) => {
    const { content, ...attrs } = props;

    return (
        <Modal {...attrs}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody className="flex flex-col items-center overflow-hidden md:flex-row">
                        <Lottie
                            animationData={succesAnimationData}
                            background=""
                            speed="1"
                            autoplay
                            loop={true}
                            direction="1"
                            mode="normal"
                            class="flex h-full max-w-40 grow basis-0 scale-150 items-center md:grow-[4]"
                        ></Lottie>
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
