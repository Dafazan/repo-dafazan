"use client";
// components/AudioVisualizer.tsx
import { useEffect, useRef, useState } from "react";

const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [scaledValuesArray, setScaledValuesArray] = useState<number[]>([]);

  //   useEffect(() => {
  //     const initializeAudioContext = () => {
  //       if (!canvasRef.current || !audioRef.current) return;

  //       const canvas = canvasRef.current;
  //       const ctx = canvas.getContext("2d");
  //       if (!ctx) return;

  //       if (!audioContextRef.current) {
  //         const audioContext = new (window.AudioContext ||
  //           (window as any).webkitAudioContext)();
  //         audioContextRef.current = audioContext;

  //         const analyser = audioContext.createAnalyser();
  //         analyser.fftSize = 256;
  //         analyserRef.current = analyser;

  //         const source = audioContext.createMediaElementSource(audioRef.current);
  //         source.connect(analyser);
  //         analyser.connect(audioContext.destination);
  //       }

  //       const analyser = analyserRef.current;
  //       const bufferLength = analyser.frequencyBinCount;
  //       const dataArray = new Uint8Array(bufferLength);

  //       const draw = () => {
  //         if (!analyser) return;
  //         requestAnimationFrame(draw);

  //         analyser.getByteFrequencyData(dataArray);
  //         ctx.clearRect(0, 0, canvas.width, canvas.height);

  //         const barCount = 12;
  //         const gap = 12;
  //         const barWidth = (canvas.width - (barCount - 1) * gap) / barCount;
  //         let x = 0;

  //         const scaledValues: number[] = [];

  //         for (let i = 0; i < barCount; i++) {
  //           const scaleFactor = 2;
  //           const scaledValue = dataArray[i] * scaleFactor;
  //           const barHeight = Math.min(
  //             (scaledValue / 255) * (canvas.height - 10) + 10,
  //             canvas.height
  //           );

  //           ctx.fillStyle = "rgb(0, 0, 255)";
  //           ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
  //           x += barWidth + gap;

  //           scaledValues.push(scaledValue);
  //         }

  //         setScaledValuesArray(scaledValues);
  //       };

  //       draw();
  //     };

  //     const audioElement = audioRef.current;
  //     if (audioElement) {
  //       const handlePlay = () => {
  //         if (!audioContextRef.current) {
  //           initializeAudioContext();
  //         }
  //       };
  //       audioElement.addEventListener("play", handlePlay);
  //       return () => {
  //         audioElement.removeEventListener("play", handlePlay);
  //       };
  //     }
  //   }, []);

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

      const analyser = analyserRef.current!;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!analyser) return;
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barCount = 12;
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

  const data = [
    { name: "Jan", value: 100.5 },
    { name: "Feb", value: 24.5 },
    { name: "Mar", value: 10 },
    { name: "Apr", value: 4 },
    { name: "Mei", value: 50 },
    { name: "Jun", value: 3 },
    { name: "Jul", value: 2 },
    { name: "Agu", value: 2 },
    { name: "Sep", value: 2 },
    { name: "Okt", value: 3 },
    { name: "Nov", value: 30 },
    { name: "Des", value: 100 },
  ];
  const maxNumber = Math.max(...data.map((item) => item.value));
  const redIndicator = 4;
  const sortedData = [...data].sort((a, b) => a.value - b.value);

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

  useEffect(() => {
    // Your existing audio visualization logic here...
  }, [isPlaying]);

  function setAud1() {
    setAudio("/ff.mp3");
  }
  function setAud2() {
    setAudio("/msc.mp3");
  }
  const [audio, setAudio] = useState("/msc.mp3");
  return (
    <div className="flex flex-col items-center">
      {/* <div className="flex">
        <button
          className={`p-2 rounded-sm bg-blue-600 ${
            audio == "/ff.mp3" ? "bg-blue-300" : "bg-blue-600"
          }`}
          onClick={setAud1}
        >
          Production
        </button>
        <button
          className={`p-2 rounded-sm bg-blue-600 ${
            audio == "/msc.mp3" ? "bg-blue-300" : "bg-blue-600"
          }`}
          onClick={setAud2}
        >
          Quality
        </button>
      </div> */}
      <button className="p-2 rounded-sm bg-blue-600" onClick={handlePlay}>
        Calculate Graph
      </button>
      {/* {scaledValuesArray.map((value, index) => (
        <div
          key={index}
          className="output-bar"
          style={{ height: `${value}px` }}
        ></div>
      ))} */}
      <audio ref={audioRef} className="">
        <source src="/msc.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex-flex-col w-full">
        <div className="flex">
          <div className="w-[5px] h-[160px] border-s-[1.5px] border-black"></div>
          <canvas
            ref={canvasRef}
            width="540"
            height="160"
            className=""
          ></canvas>
          <div className="w-[5px]"></div>
        </div>
        <div className="h-full flex">
          <div className="h-full w-[1.5px] bg-black"></div>
          {data.map((item, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="flex w-full h-full flex-col-reverse">
                <div
                  className="flex items-center justify-center mx-2"
                  style={{
                    height: `${(item.value / maxNumber) * 80}%`,
                    background: "blue",
                    width: "30px",
                  }}
                ></div>
              </div>
              <div className="w-full h-[1.5px] bg-black"></div>
              <div className="flex h-2 w-full justify-center">
                <div className="h-full w-[1.5px] bg-black"></div>
              </div>
              <div className="w-full text-center line-clamp-1 text-xs text-black h-5">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizer;
