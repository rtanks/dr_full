import { useEffect, useRef, useState } from "react";

export default function VoiceRecorder() {
  const recordBtnRef = useRef(null);
  const wavePath1 = useRef(null);
  const wavePath2 = useRef(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(new Audio());
  const animationIdRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [isRecordingFlag, setIsRecordingFlag] = useState(false);
  const [timeText, setTimeText] = useState("00:00 / 00:00");
  const [canPlay, setCanPlay] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const [playIcon, setPlayIcon] = useState("▶");

  const startTimeMsRef = useRef(0);
  const timerRef = useRef(null);
  const finalDurationRef = useRef(0);

  const format = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ================= RECORD ================= */
  const startRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        audioRef.current.src = URL.createObjectURL(blob);

        audioRef.current.onloadedmetadata = () => {
          finalDurationRef.current = Math.floor(audioRef.current.duration);
          setTimeText(`00:00 / ${format(finalDurationRef.current)}`);
          setCanPlay(true);
          setCanSend(true);
        };
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setIsRecordingFlag(true);
      startTimeMsRef.current = performance.now();
      startTimer();
      startWaveAnimation(true);
    } catch {
      alert("دسترسی به میکروفن امکان‌پذیر نیست");
    }
  };

  const stopRecord = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    setIsRecordingFlag(false);
    stopTimer();
    stopWaveAnimation();
  };

  /* ================= TIMER ================= */
  const startTimer = () => {
    let sec = 0;
    timerRef.current = setInterval(() => {
      if (isRecordingFlag) {
        sec++;
        setTimeText(`${format(sec)} / ${format(sec)}`);
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  /* ================= PLAY ================= */
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlayIcon("⏸");
      startWaveAnimation(false);
    } else {
      audioRef.current.pause();
      setPlayIcon("▶");
      stopWaveAnimation();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.ontimeupdate = () => {
      if (!isRecordingFlag && finalDurationRef.current) {
        setTimeText(
          `${format(Math.floor(audio.currentTime))} / ${format(
            finalDurationRef.current
          )}`
        );
      }
    };

    audio.onended = () => {
      setPlayIcon("▶");
      stopWaveAnimation();
      audio.currentTime = 0;
    };
  }, [isRecordingFlag]);

  /* ================= WAVE ================= */
  const startWaveAnimation = (isRecording) => {
    cancelAnimationFrame(animationIdRef.current);
    wavePath1.current.classList.toggle(
      "waveform-recording",
      isRecording
    );
    wavePath2.current.classList.toggle(
      "waveform-recording",
      isRecording
    );
    animate();
  };

  const stopWaveAnimation = () => {
    cancelAnimationFrame(animationIdRef.current);
    wavePath1.current.setAttribute("d", "M0,20 L200,20");
    wavePath2.current.setAttribute("d", "M0,20 L200,20");
  };

  const animate = () => {
    const audio = audioRef.current;
    if (!isRecordingFlag && audio.paused) return;

    const points = 10;
    const segment = 200 / points;
    const t = isRecordingFlag
      ? (performance.now() - startTimeMsRef.current) / 1000
      : audio.currentTime;

    const generate = (offset, amp) => {
      let d = "M0,20";
      for (let i = 1; i <= points; i++) {
        const x = i * segment;
        const y =
          20 +
          (Math.random() - 0.5) *
            amp *
            Math.sin(i * 0.8 + t + offset);
        d += ` S${x - segment / 2},${y} ${x},20`;
      }
      return d;
    };

    wavePath1.current.setAttribute("d", generate(0.1, 70));
    wavePath2.current.setAttribute("d", generate(0.3, 20));
    animationIdRef.current = requestAnimationFrame(animate);
  };

  /* ================= JSX ================= */
  return (
    <div className="bg-white w-full h-24 mb-5 flex flex-row gap-1 sm:gap-2 items-center justify-between">
      <div className="w-4/5 sm:w-[80%] h-max gap-2 flex flex-row items-center">
        <div
          ref={recordBtnRef}
          className={`w-16 h-16 sm:w-[65px] sm:h-[65px] flex items-center justify-center rounded-full border-[3px] border-[#ff3b30] text-[#ff3b30]
           ${recording ? "recording" : ""}`}
          onClick={recording ? stopRecord : startRecord}
        >
          {recording ? "تمام" : "ضبط"}
        </div>

        <div className="center-controls w-[70%] sm:w-[80%]">
          <svg className="waveform" viewBox="0 0 200 40">
            <path ref={wavePath1} className="waveform-path" d="M0,20 L200,20" />
            <path
              ref={wavePath2}
              className="waveform-path"
              opacity="0.6"
              strokeWidth="1.5"
              d="M0,20 L200,20"
            />
          </svg>
          <div className="time-text">{timeText}</div>
        </div>
      </div>

      <div className="w-1/5 sm:w-[20%] h-max flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
        <button type={'button'} className={`w-12 h-9 sm:w-16 sm:h-16 rounded-xl bg-main text-white font-bold border-none  
        ${canPlay? "opacity-100": "opacity-50"}`}onClick={togglePlay} disabled={!canPlay}>
          {playIcon}
        </button>

        <button type={'button'} className={`w-12 h-9 sm:w-16 sm:h-16 rounded-xl bg-main text-white font-bold border-none 
        ${canSend? "opacity-100": "opacity-50"}`} disabled={!canSend}>
          ارسال
        </button>
      </div>
    </div>
  );
}
