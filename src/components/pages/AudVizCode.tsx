import React from "react";
import { CopyBlock, monokai } from "react-code-blocks";

function AudVizCode() {
  const handleCopyClick = () => {
    const codeElement = document.getElementById("code");
    if (codeElement) {
      const range = document.createRange();
      range.selectNode(codeElement);
      window.getSelection()?.removeAllRanges(); // Clear previous selections
      window.getSelection()?.addRange(range); // Select the code
      document.execCommand("copy"); // Copy to clipboard
      window.getSelection()?.removeAllRanges(); // Clear the selection
      alert("Code copied to clipboard!");
    }
  };
  return (
    <>
      <div className="w-full h-full overflow-x-scroll">
        <CopyBlock
          text={`"use client";
import { useEffect, useRef, useState } from "react";

const AudViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const initializeAudioContext = () => {
      if (!canvasRef.current || !audioRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      }

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!analyser) return;
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barCount = 20;
        const gap = 12;
        const barWidth = (canvas.width - (barCount - 1) * gap) / barCount;
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          // Scale bar height based on the data
          const barHeight = (dataArray[i] / 255) * (canvas.height - 10) + 10;
          ctx.fillStyle = "rgb(0, 0, 255)"; // Blue color
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + gap;
        }
      };

      draw();
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePlay = () => {
        if (!audioContextRef.current) {
          initializeAudioContext();
        }
      };
      audioElement.addEventListener("play", handlePlay);
      return () => {
        audioElement.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-start p-10 gap-5">
      <button
        className="p-2 rounded-sm bg-blue-600 text-white"
        onClick={handlePlay}
      >
        Play Audio
      </button>
      <audio ref={audioRef} className="">
        <source src="/msc.mp3" type="audio/mpeg" />
      </audio>

      <div className=" w-full">
        <canvas
          ref={canvasRef}
          width="700"
          height="160"
          className="border border-blue-500"
        ></canvas>
      </div>
    </div>
  );
};

export default AudViz;
`}
          language={`javascript`}
          showLineNumbers={true}
          theme={monokai}
          codeBlock
        />
      </div>
    </>
  );
}

export default AudVizCode;
