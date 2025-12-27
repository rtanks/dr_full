import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineMicrophone, HiOutlineStop, HiPlay, HiPause } from 'react-icons/hi2';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordedTime, setRecordedTime] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [status, setStatus] = useState('ضبط');

  // Refs برای جلوگیری از تداخل در ضبط‌های مجدد
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaSourceRef = useRef(null); // منبع متصل به تگ Audio (فقط یکبار ساخته می‌شود)
  const streamSourceRef = useRef(null); // منبع متصل به میکروفون
  const dataArrayRef = useRef(null);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(new Audio());
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const wavePath1Ref = useRef(null);
  const wavePath2Ref = useRef(null);
  const chunksRef = useRef([]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ایجاد کانتکست و آنالایزر به صورت یکتا
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      // اتصال دائمی آنالایزر به خروجی (بلندگو)
      analyserRef.current.connect(audioContextRef.current.destination);
      
      // اتصال دائمی تگ Audio به آنالایزر (فقط یکبار در طول عمر کامپوننت)
      mediaSourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      mediaSourceRef.current.connect(analyserRef.current);
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const animate = () => {
    if (!analyserRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    const volumeFactor = average / 120; 

    const points = 10;
    const segment = 200 / points;
    const t = performance.now() / 150;

    const generatePath = (offset, maxAmplitude) => {
      let path = `M0,20`;
      const currentAmplitude = Math.max(1, maxAmplitude * volumeFactor); 
      for (let i = 1; i <= points; i++) {
        const x = i * segment;
        const y = 20 + Math.sin(i * 0.8 + t + offset) * currentAmplitude;
        path += ` S${x - segment / 2},${y} ${x},20`;
      }
      return path;
    };

    if (wavePath1Ref.current) wavePath1Ref.current.setAttribute('d', generatePath(0.1, 18));
    if (wavePath2Ref.current) wavePath2Ref.current.setAttribute('d', generatePath(0.4, 8));
    animationRef.current = requestAnimationFrame(animate);
  };

  const startRecording = async () => {
    try {
      initAudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // اتصال میکروفون به آنالایزر
      streamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      streamSourceRef.current.connect(analyserRef.current);

      chunksRef.current = [];
      setAudioBlob(null);
      setRecordedTime(0);
      setPlaybackTime(0);
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        audioRef.current.src = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setStatus('ضبط مجدد');
        
        // قطع اتصال میکروفون برای جلوگیری از نویز در زمان پخش
        streamSourceRef.current?.disconnect();
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setStatus('درحال ضبط');
      timerRef.current = setInterval(() => setRecordedTime(p => p + 1), 1000);
      animate();
    } catch (err) {
      alert("دسترسی به میکروفن ندارید.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());
    clearInterval(timerRef.current);
    setRecording(false);
    cancelAnimationFrame(animationRef.current);
  };

  const togglePlayback = () => {
    initAudioContext();
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPaused(false);
      animate();
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const player = audioRef.current;
    const updateProgress = () => setPlaybackTime(Math.floor(player.currentTime));
    const handleEnd = () => {
      setIsPaused(true);
      setPlaybackTime(0);
      cancelAnimationFrame(animationRef.current);
    };
    player.addEventListener('timeupdate', updateProgress);
    player.addEventListener('ended', handleEnd);
    return () => {
      player.removeEventListener('timeupdate', updateProgress);
      player.removeEventListener('ended', handleEnd);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center px-0 py-5 bg-white w-full gap-1 sm:gap-4" dir="rtl">
      <div className="flex flex-row items-center w-full gap-2 sm:gap-4">
        <button type='button'
          onClick={recording ? stopRecording : startRecording}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 transition-all ${
            recording ? 'border-red-500 text-red-500 shadow-lg' : 'border-gray-300 text-gray-500'
          }`}
        >
          {/* {recording ? <HiOutlineStop size={32} /> : <HiOutlineMicrophone size={32} />} */}
          <span className="text-[12px] mt-1 font-bold text-center">{status}</span>
        </button>

        <div className="w-[60%]  flex flex-col flex-grow items-center">
          <div className="w-full h-12 bg-white rounded-xl overflow-hidden flex items-center sm:px-2">
            <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-full">
              <path ref={wavePath1Ref} fill="none" stroke={recording ? "#ef4444" : "#2C8073"} strokeWidth="2.5" d="M0,20 L200,20" />
              <path ref={wavePath2Ref} fill="none" stroke={recording ? "#ef4444" : "#2C8073"} opacity="0.3" strokeWidth="1.5" d="M0,20 L200,20" />
            </svg>
          </div>
          <div className="flex gap-1 w-full px-2 text-[13px] font-bold font-mono">
            <div className={"text-gray-700"}>{formatTime(recordedTime)}</div>
            <div>/</div>
            <div className="text-gray-400">{formatTime(playbackTime)}</div>
          </div>
        </div>

        <button type='button'
          disabled={!audioBlob || recording}
          onClick={togglePlayback}
          className="w-14 sm:w-16 h-14 sm:h-16 bg-[#2F7C73] text-white rounded-2xl disabled:opacity-20 flex items-center justify-center"
        >
          {isPaused ? <HiPlay size={30} /> : <HiPause size={30} />}
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;


// import React, { useState, useRef, useEffect } from 'react';
// import { HiOutlineMicrophone, HiOutlineStop, HiPlay, HiPause } from 'react-icons/hi2';

// const VoiceRecorder = () => {
//   const [recording, setRecording] = useState(false);
//   const [isPaused, setIsPaused] = useState(true);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [recordedTime, setRecordedTime] = useState(0);
//   const [playbackTime, setPlaybackTime] = useState(0);
//   const [status, setStatus] = useState('ضبط');

//   // Refs برای Web Audio API
//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const sourceRef = useRef(null);
//   const dataArrayRef = useRef(null);

//   const mediaRecorderRef = useRef(null);
//   const audioRef = useRef(new Audio());
//   const timerRef = useRef(null);
//   const animationRef = useRef(null);
//   const wavePath1Ref = useRef(null);
//   const wavePath2Ref = useRef(null);
//   const chunksRef = useRef([]);

//   const formatTime = (sec) => {
//     const m = String(Math.floor(sec / 60)).padStart(2, "0");
//     const s = String(Math.floor(sec % 60)).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   // --- تنظیم تحلیل‌گر صدا ---
//   const setupAudioContext = (streamOrElement) => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     }
//     const context = audioContextRef.current;
    
//     if (analyserRef.current) analyserRef.current.disconnect();
//     analyserRef.current = context.createAnalyser();
//     analyserRef.current.fftSize = 64; // دقت تحلیل (اعداد کوچک برای موج‌های نرم‌تر)
    
//     const bufferLength = analyserRef.current.frequencyBinCount;
//     dataArrayRef.current = new Uint8Array(bufferLength);

//     if (streamOrElement instanceof MediaStream) {
//       sourceRef.current = context.createMediaStreamSource(streamOrElement);
//     } else {
//       sourceRef.current = context.createMediaElementSource(streamOrElement);
//     }
    
//     sourceRef.current.connect(analyserRef.current);
//     if (!(streamOrElement instanceof MediaStream)) {
//       analyserRef.current.connect(context.destination);
//     }
//   };

//   // --- انیمیشن هماهنگ با فرکانس صدا ---
//   const animate = () => {
//     if (!analyserRef.current) return;

//     analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
//     // محاسبه میانگین بلندی صدا برای تعیین دامنه موج
//     const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
//     const volumeFactor = average / 128; // عددی بین 0 تا 2

//     const points = 12;
//     const segment = 200 / points;
//     const t = performance.now() / 100;

//     const generatePath = (offset, maxAmplitude) => {
//       let path = `M0,20`;
//       const currentAmplitude = maxAmplitude * volumeFactor; // دامنه حساس به صدا

//       for (let i = 1; i <= points; i++) {
//         const x = i * segment;
//         const y = 20 + Math.sin(i * 0.5 + t + offset) * currentAmplitude;
//         path += ` S${x - segment / 2},${y} ${x},20`;
//       }
//       return path;
//     };

//     // نوسان ۷۰٪ و ۳۰٪ حساس به بلندی صدا
//     if (wavePath1Ref.current) wavePath1Ref.current.setAttribute('d', generatePath(0.1, 18));
//     if (wavePath2Ref.current) wavePath2Ref.current.setAttribute('d', generatePath(0.4, 8));

//     animationRef.current = requestAnimationFrame(animate);
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setupAudioContext(stream); // شروع تحلیل صدا از میکروفون
      
//       chunksRef.current = [];
//       setAudioBlob(null);
//       setRecordedTime(0);
//       setPlaybackTime(0);
      
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
//         audioRef.current.src = URL.createObjectURL(blob);
//         setAudioBlob(blob);
//         setStatus('ضبط مجدد');
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//       setStatus('درحال ضبط');
      
//       timerRef.current = setInterval(() => setRecordedTime(p => p + 1), 1000);
//       animate(); 
//     } catch (err) {
//       alert("دسترسی به میکروفن ندارید.");
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());
//     clearInterval(timerRef.current);
//     setRecording(false);
//     if (audioContextRef.current?.state === 'running') {
//         // انیمیشن بعد از توقف ضبط قطع می‌شود تا برای پخش دوباره صدا را بگیرد
//     }
//   };

//   const togglePlayback = () => {
//     if (audioRef.current.paused) {
//       if (audioContextRef.current?.state === 'suspended') {
//         audioContextRef.current.resume();
//       }
//       setupAudioContext(audioRef.current); // تحلیل صدا از تگ Audio
//       audioRef.current.play();
//       setIsPaused(false);
//       animate();
//     } else {
//       audioRef.current.pause();
//       setIsPaused(true);
//     }
//   };

//   useEffect(() => {
//     const player = audioRef.current;
//     const updateProgress = () => setPlaybackTime(Math.floor(player.currentTime));
//     const handleEnd = () => { setIsPaused(true); setPlaybackTime(0); };
//     player.addEventListener('timeupdate', updateProgress);
//     player.addEventListener('ended', handleEnd);
//     return () => {
//       player.removeEventListener('timeupdate', updateProgress);
//       player.removeEventListener('ended', handleEnd);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center p-6 bg-white w-full h-max max-w-xl gap-4" dir="rtl">
//       <div className="flex items-center w-full gap-4">
        
//         <button type='button'
//           onClick={recording ? stopRecording : startRecording}
//           className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 transition-all ${
//             recording ? 'border-red-500 text-red-500 shadow-lg' : 'border-gray-300 text-gray-500'
//           }`}
//         >
//           {/* {recording ? <HiOutlineStop size={32} /> : <HiOutlineMicrophone size={32} />} */}
//           <span className="text-[10px] mt-1 font-bold">{status}</span>
//         </button>

//         <div className="flex flex-col flex-grow items-center">
//           <div className="w-full h-12 bg-white rounded-xl overflow-hidden flex items-center px-2">
//             <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-full">
//               <path ref={wavePath1Ref} fill="none" stroke={recording ? "#ef4444" : "#2C8073"} strokeWidth="2" d="M0,20 L200,20" />
//               <path ref={wavePath2Ref} fill="none" stroke={recording ? "#ef4444" : "#2C8073"} opacity="0.3" strokeWidth="1.5" d="M0,20 L200,20" />
//             </svg>
//           </div>
          
//           <div className="flex flex-row gap-2 items-center w-full mt-2 px-2 text-[11px] font-bold font-mono">
//             <div className="text-gray-400">{formatTime(playbackTime)}</div> 
//             <div>/</div>
//             <div className={recording ? "text-red-500 animate-pulse" : "text-gray-700"}>
//               {formatTime(recordedTime)}
//             </div>
//           </div>
//         </div>

//         <button type='button'
//           disabled={!audioBlob || recording}
//           onClick={togglePlayback}
//           className="w-16 h-16 bg-main text-white rounded-2xl disabled:opacity-20 shadow-md flex items-center justify-center"
//         >
//           {isPaused ? <HiPlay size={30} /> : <HiPause size={30} />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VoiceRecorder;



