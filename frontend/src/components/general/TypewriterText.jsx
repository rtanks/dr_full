import React, { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 80, getCompleteStatus, additionalItem, additionalText}) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText("");

        const textArray = text.split(' ');
        let counter = 0;

        const interval = setInterval(() => {
            if (counter >= textArray.length) {
                if(additionalText){
                    getCompleteStatus(false)
                } else {
                    getCompleteStatus(true)
                }
                clearInterval(interval);
                return;
            }
            const nextWord = textArray[counter];
            if (nextWord !== undefined) {
                setDisplayedText(prev => prev + (prev ? " " : "") + nextWord);
                counter++;
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="relative mb-4 inline">
            <p className={` whitespace-pre-line
                text-gray-800 leading-relaxed text-justify text-md
                transition-all duration-500
            `}>
                {
                    additionalItem ? (
                        <>
                            <span>{additionalItem}</span>
                            {displayedText}
                        </>
                    ) : (
                        displayedText
                    )
                }
                
            </p>
            {
                additionalText && (displayedText.length == text.length)? (
                    additionalText
                ): (
                    ""
                )
            }
        </div>
    );
}
// import React, { useState, useEffect } from 'react';

// export default function TypewriterText({ text, speed = 80, onComplete }) {
//     const [displayedText, setDisplayedText] = useState("");
//     const [isComplete, setIsComplete] = useState(false);

//     useEffect(() => {
//         // ریست کردن استیت‌ها برای متن جدید
//         setDisplayedText("");
//         setIsComplete(false);

//         const textArray = text.split(' ');
//         let counter = 0;

//         const interval = setInterval(() => {
//             // شرط توقف دقیق: اگر کانتر به طول آرایه رسید
//             if (counter >= textArray.length) {
//                 clearInterval(interval);
//                 setIsComplete(true);
//                 if (onComplete) onComplete(); // خبر دادن به والد که تایپ تمام شد
//                 return;
//             }

//             const nextWord = textArray[counter];
            
//             // جلوگیری از اضافه شدن undefined
//             if (nextWord !== undefined) {
//                 setDisplayedText(prev => prev + (prev ? " " : "") + nextWord);
//                 counter++;
//             }
//         }, speed);

//         // تمیزکاری در صورت Unmount شدن کامپوننت
//         return () => clearInterval(interval);
//     }, [text]); // وابستگی به متن برای اجرای مجدد در هر مرحله

//     return (
//         <div className="relative mb-4">
//             <p className={`
//                 text-gray-800 leading-relaxed text-justify text-base sm:text-lg
//                 transition-all duration-500
//                 ${isComplete ? 'opacity-100' : 'opacity-90'}
//             `}>
//                 {displayedText}
//                 {/* نشانگر تایپ (اختیاری) */}
//                 {!isComplete && (
//                     <span className="inline-block w-1 h-5 bg-blue-500 mr-1 animate-pulse" />
//                 )}
//             </p>
//         </div>
//     );
// }
