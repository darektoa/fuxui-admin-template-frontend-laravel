import "./style.css";
import * as faceApi from "face-api.js";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import debounce from "@/utilities/debounce";
import React from "react";
import usePageStore from "./_stores";
import useFetchFaces from "./_hooks/useFetchFaces";

function Face() {
    useFetchFaces();
    const navigate = useNavigate();
    const videoRef = useRef();
    const canvasRef = useRef();
    const requestFrameRef = useRef();
    const videoWidth = 480;
    const videoHeight = 360;

    const { appContents } = usePage().props;

    const { faces, filter, setFilter } = usePageStore(
        useShallow((state) => ({
            faces: state.data.faces,
            filter: state.filter,
            setFilter: state.setFilter,
        }))
    );

    const { register } = useForm({
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        console.log(faces);
        (async () => {
            const faceDescriptors = await loadFaceDescriptors();

            const detections = await faceApi
                .detectAllFaces(
                    videoRef.current,
                    new faceApi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptors();

            const faceDistance = checkDistance(faceDescriptors, detections);

            if (faceDistance < 0.4) {
                router.post(
                    "/sign-in/face",
                    { email: filter.email },
                    { replace: true }
                );
                navigate("/home");
                setTimeout(() => location.reload(), 500);
            }
        })();
    }, [faces]);

    function delayedAnimationFrame(callback, delay) {
        setTimeout(() => {
            requestAnimationFrame(callback);
        }, delay);
    }

    const loadModels = async () => {
        const MODEL_URL = `http://localhost:8001/models`;
        Promise.all([
            faceApi.nets.tinyFaceDetector.loadFromUri(
                `${MODEL_URL}/tiny_face_detector`
            ),
            faceApi.nets.faceLandmark68Net.loadFromUri(
                `${MODEL_URL}/face_landmark_68`
            ),
            faceApi.nets.faceRecognitionNet.loadFromUri(
                `${MODEL_URL}/face_recognition`
            ),
            faceApi.nets.faceExpressionNet.loadFromUri(
                `${MODEL_URL}/face_expression`
            ),
            faceApi.nets.ageGenderNet.loadFromUri(
                `${MODEL_URL}/age_gender_model`
            ),
            faceApi.nets.ssdMobilenetv1.loadFromUri(
                `${MODEL_URL}/ssd_mobilenetv1`
            ),
        ])
            .then(async () => {
                try {
                    videoRef.current.srcObject =
                        await navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                width: videoWidth,
                                height: videoHeight,
                            },
                        });
                } catch (err) {
                    console.error(err);
                }
            })
            .catch((err) => console.log(err));
    };

    const loadFaceDescriptors = async () => {
        const descriptors = await Promise.all(
            faces.map(async (face) => {
                console.log(face.imageUri)
                const img = await faceApi.fetchImage(face.imageUri);
                const detections = await faceApi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                if (!detections) {
                    throw new Error(`No faces detected for ${face}`);
                }
                return detections.descriptor;
            })
        );
        return descriptors;
    };

    const checkDistance = (faceDescriptors, detections) => {
        let bestDistance = Number.MAX_SAFE_INTEGER;

        detections.forEach((detection) => {
            faceDescriptors.forEach((descriptor, index) => {
                const distance = faceApi.euclideanDistance(
                    detection.descriptor,
                    descriptor
                );

                if (distance < bestDistance) {
                    bestDistance = distance;
                }
            });
        });

        return bestDistance;
    };

    const matchFaces = (faceDescriptors, detections) => {
        return detections.map((detection) => {
            let bestDistance = Number.MAX_SAFE_INTEGER;
            let label = "Unknown";

            faceDescriptors.forEach((descriptor, index) => {
                const distance = faceApi.euclideanDistance(
                    detection.descriptor,
                    descriptor
                );
                console.log(distance, faces);

                if (distance < 0.4 && distance < bestDistance) {
                    bestDistance = distance;
                    label = `Face ${index + 1}`;
                }
            });

            return { box: detection.detection.box, label, bestDistance };
        });
    };

    const handleVideoOnPlay = useCallback(async () => {
        const faceDescriptors = await loadFaceDescriptors();

        if (canvasRef.current) {
            canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(
                videoRef.current
            );
            faceApi.matchDimensions(canvasRef.current, {
                width: videoWidth,
                height: videoHeight,
            });

            const detections = await faceApi
                .detectAllFaces(
                    videoRef.current,
                    new faceApi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptors();

            const resizedDetections = faceApi.resizeResults(detections, {
                width: videoWidth,
                height: videoHeight,
            });

            const matchedFaces = matchFaces(faceDescriptors, resizedDetections);

            canvasRef.current
                .getContext("2d")
                .clearRect(0, 0, videoWidth, videoHeight);

            matchedFaces.forEach(({ box, label }) => {
                const drawBox = new faceApi.draw.DrawBox(box, { label });
                drawBox.draw(canvasRef.current);
            });

            faceApi.draw.drawDetections(canvasRef.current, resizedDetections);
            faceApi.draw.drawFaceLandmarks(
                canvasRef.current,
                resizedDetections
            );
        }

        requestFrameRef.current = delayedAnimationFrame(handleVideoOnPlay, 600);
    }, [faces]);

    useEffect(() => {
        loadModels();

        return () => {
            cancelAnimationFrame(requestFrameRef.current);
        };
    }, []);

    return (
        <main className="w-full h-dvh flex flex-col items-center justify-center overflow-y-auto md:flex-row">
            <Card className="flex">
                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <div className="col-span-12 w-full flex justify-center items-center text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        <figure className="mr-2 bg-inherit p-2 size-20">
                            <img
                                src={appContents["appLogo"]?.value}
                                alt="Brand Logo"
                                className="w-full h-full mx-auto object-contain mb-1"
                            />
                        </figure>
                        <h1 className="">
                            {appContents["authSignInHeading1"]?.value}
                            <span className="block text-sm font-normal opacity-80">
                                <span>{appContents["appTagline"]?.value}</span>
                            </span>
                        </h1>
                    </div>

                    <div className="col-span-12 flex rounded-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            width="480"
                            height="360"
                            playsInline
                            autoPlay
                            onPlay={handleVideoOnPlay}
                        />
                        <canvas
                            style={{ position: "absolute" }}
                            ref={canvasRef}
                        />
                    </div>

                    <Input
                        {...register("email", {
                            onChange: debounce(
                                (e) =>
                                    setFilter({
                                        email: e.target.value,
                                    }),
                                1500
                            ),
                        })}
                        isClearable
                        isRequired
                        required
                        type="email"
                        name="email"
                        variant="flat"
                        placeholder="Enter email . . ."
                        className="col-span-12 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Mail className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                </CardBody>
            </Card>
        </main>
    );
}

export default Face;
