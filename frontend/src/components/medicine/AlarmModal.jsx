import React from 'react';
import { Check, BellOff, Clock } from 'lucide-react';

export default function AlarmModal({ drug, onConfirm, onSnooze }){
  if (!drug) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-center shadow-2xl border-t-[10px] border-rose-500 animate-in zoom-in duration-300">
        
        {/* آیکون متحرک */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-rose-100 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-rose-500 text-white w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg">
            {drug.name || '💊'}
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-1">وقت دارو!</h2>
        <p className="text-rose-500 font-bold text-lg mb-2">{drug.name}</p>
        <div className="bg-slate-50 rounded-2xl py-3 px-4 mb-8">
          <p className="text-slate-500 text-sm">مقدار دوز مصرفی:</p>
          <p className="text-slate-800 font-bold">{drug.dose}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Check size={24} />
            مصرف کردم
          </button>
          
          <button
            onClick={onSnooze}
            className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <Clock size={18} />
            ۵ دقیقه دیگر یادآوری کن
          </button>
        </div>
      </div>
    </div>
  );
};
