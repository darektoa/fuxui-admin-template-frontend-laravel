import { useCallback, useEffect, useRef, useState } from "react";
import dataURLtoFile from "@/utilities/dataURLtoFile";

function useCamera() {
    const videoRef = useRef(null);
    const [state, setState] = useState({
        stream: null,
        image: null,
        imageFile: null,
    });

    useEffect(() => {
        if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia)
            return;

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            if (videoRef.current) videoRef.current.srcObject = stream;
            setState((state) => ({ ...state, stream }));
        });
    }, []);

    const takeSnapshot = useCallback(async () => {
        if (!videoRef.current) return;

        const videoElmnt = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = videoElmnt.videoWidth;
        canvas.height = videoElmnt.videoHeight;
        canvas
            .getContext("2d")
            .drawImage(videoElmnt, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL();
        const imageFile = await dataURLtoFile(imageDataURL, "capture.jpg");
        const result = {
            image: imageDataURL,
            imageFile: imageFile,
        }

        setState((state) => ({
            ...state,
            ...result,
        }));

        return result;
    }, [videoRef.current]);

    return {
        videoRef,
        stream: state.stream,
        image: state.image,
        imageFile: state.imageFile,
        takeSnapshot,
    };
}

export default useCamera;
