import React, { useState, useEffect } from 'react';

export default function AudioTextSync() {
  const text = "سلام، به وب‌سایت ما خوش آمدید";
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    // ۱. متوقف کردن صداهای قبلی
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'fa-IR';

    // ۲. مدیریت وضعیت پخش
    msg.onstart = () => setIsSpeaking(true);
    msg.onend = () => setIsSpeaking(false);

    // ۳. اجرای دستور پخش
    window.speechSynthesis.speak(msg);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', direction: 'rtl' }}>
      <p style={{ 
        fontSize: '20px', 
        color: isSpeaking ? '#007bff' : '#333',
        transition: 'color 0.3s'
      }}>
        {text}
      </p>
      
      <button 
        onClick={speak}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {isSpeaking ? 'در حال خواندن...' : 'پخش صدا'}
      </button>
    </div>
  );
}