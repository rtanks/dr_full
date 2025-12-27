import React, { useState, useRef, useEffect } from 'react';

const GUIDES = [
  { id: 1, title: 'ثبت تصویر MRI', src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_f551980302.mp3' },
  { id: 2, title: 'مشاهده نتایج آزمایش', src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2452c6f13c.mp3' },
  { id: 3, title: 'سوالات متداول', src: 'https://cdn.pixabay.com/download/audio/2022/07/26/audio_a7ec5ccb59.mp3' },
];

export default function AudioDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuide, setCurrentGuide] = useState({ title: 'راهنمای صوتی سامانه', src: '' });
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [wavePath, setWavePath] = useState({ p1: 'M0,20 L200,20', p2: 'M0,20 L200,20' });

  const audioRef = useRef(null);
  const requestRef = useRef();

  // انیمیشن موج صوتی با ریاضیات داینامیک
  const animateWave = () => {
    if (audioRef.current && !audioRef.current.paused) {
      const points = 10;
      const segment = 200 / points;
      const time = audioRef.current.currentTime;

      const generatePath = (offset, amplitude) => {
        let path = `M0,20`;
        for (let i = 1; i <= points; i++) {
          const x = i * segment;
          const noise = (Math.random() - 0.5) * amplitude;
          const y = 20 + noise * (Math.sin(i * 0.8 + time + offset));
          path += ` S${x - segment / 2},${y} ${x},20`;
        }
        return path;
      };

      setWavePath({
        p1: generatePath(0.1, 35),
        p2: generatePath(0.3, 20)
      });
      requestRef.current = setTimeout(() => requestAnimationFrame(animateWave), 50);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestAnimationFrame(animateWave);
    } else {
      clearTimeout(requestRef.current);
      setWavePath({ p1: 'M0,20 L200,20', p2: 'M0,20 L200,20' });
    }
    return () => clearTimeout(requestRef.current);
  }, [isPlaying]);

  const handleTogglePower = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const loadGuide = (guide) => {
    setCurrentGuide(guide);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = guide.src;
      audioRef.current.play();
    }
  };

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full h-[73px] bg-white px-1.5 rounded-xl flex flex-col md:flex-row gap-1 font-sans" dir="rtl">

      <audio
        ref={audioRef}
        onTimeUpdate={() => setProgress(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />
      {/* پنل سمت راست: لیست خدمات */}
      {/* <aside className="w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-2">راهنماهای صوتی خدمات</h3>
        <p className="text-xs text-gray-400 mb-6">با انتخاب هر مورد، راهنمای صوتی مربوطه پخش می‌شود.</p>
        <div className="space-y-3">
          {GUIDES.map(guide => (
            <button 
              key={guide.id} 
              onClick={() => loadGuide(guide)}
              className="w-full p-4 text-right bg-blue-50 hover:bg-blue-100 text-[#2F7C73] font-bold rounded-xl transition-colors duration-200"
            >
              {guide.title}
            </button>
          ))}
        </div>
      </aside> */}

      {/* محتوای اصلی */}
      <main className="w-full h-full p-0 m-0">
        {/* <h2 className="text-sm font-bold text-gray-800">{currentGuide.title}</h2> */}

        <div className="bg-transparent w-full h-[73px] rounded-lg  flex items-center transition-all duration-500">
          {!isPlaying ? (
            <button type='button'
              onClick={handleTogglePower}
              className="w-full py-5 bg-[#2F7C73] hover:bg-[#26665e] text-white text-sm font-bold rounded-lg transition-all active:scale-[0.98]"
            >
              روشن کردن راهنمای صوتی سامانه تیدا
            </button>
          ) : (
            <div className="flex w-full h-[73px] items-center gap-1 animate-in fade-in zoom-in duration-300">
              {/* دکمه خاموش */}
              <button 
                onClick={handleTogglePower}
                className="w-14 h-14 shrink-0 flex items-center justify-center bg-[#2F7C73] text-sm text-white font-bold rounded-xl border-2 border-[#2F7C73] active:scale-90 transition-transform"
              >
                خاموش
              </button>

              {/* بخش وسط و کنترلرها */}
              <div className="flex-1 flex flex-col h-12 items-center justify-center space-y-2">
                <div className="w-full h-10">
                  <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path className="fill-none stroke-[#2F7C73] stroke-[2px] transition-all duration-100" d={wavePath.p1} />
                    <path className="fill-none stroke-[#2F7C73] stroke-[1.5px] opacity-40" d={wavePath.p2} />
                  </svg>
                </div>
                
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 0} 
                  value={progress} 
                  onChange={(e) => (audioRef.current.currentTime = e.target.value)}
                  className="w-full h-0.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F7C73]"
                />
                
                <div className="text-xs font-bold text-gray-400 tabular-nums" dir="ltr">
                  {formatTime(duration)} / {formatTime(progress)}
                </div>
              </div>

              {/* دکمه تکرار */}
              <button 
                onClick={() => (audioRef.current.currentTime = 0)}
                className="w-14 h-14 text-sm shrink-0 flex items-center justify-center bg-white text-[#2F7C73] font-bold rounded-xl border-2 border-[#2F7C73] active:scale-90 transition-transform"
              >
                تکرار
              </button>
            </div>
          )}
        </div>
        
        {/* <p className="mt-1 text-sm text-gray-500 font-medium">
          {isPlaying ? `🎵 در حال پخش: ${currentGuide.title}` : "💡 با کلیک روی یکی از خدمات، راهنمای مربوطه فعال می‌شود."}
        </p> */}
      </main>
    </div>
  );
}