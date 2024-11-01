import React, { useEffect, useRef } from "react";
import { cameraComponentInterface } from "../constants/interfaces";

const Camera: React.FC<cameraComponentInterface> = ({
  height = "100%",
  width = "100%",
  classString = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Store the stream reference

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          // video: true,
          video: {facingMode: { exact: "environment" }},
        });
        streamRef.current = stream; // Store the stream in a ref
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    getCameraStream();
    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video
      autoPlay
      ref={videoRef}
      style={{ width, height }}
      className={`${classString} `}
    />
  );
};

export default Camera;
