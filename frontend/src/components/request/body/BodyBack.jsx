import { useEffect, useState } from "react";
import point from '../../../assets/images/Group4065.png';

export default function BodyBack({pic, getItemsArea}) {
    const [position, setPosition] = useState({top: null, right: null});
    const back = { 
        'head_back': { options: ['پس سر', 'پشت گردن'], position: { top: '4', right: '43' } },
        'neck_back': { options: ['پشت گردن', 'ستون فقرات گردنی'], position: { top: '12', right: '43' } },
        'upper_back_center': { options: ['بین دو کتف', 'ستون فقرات (بالا)'], position: { top: '20', right: '43' } },
        'shoulder_back_right': { options: ['کتف راست', 'شانه راست'], position: { top: '20', right: '23' } }, 
        'shoulder_back_left': { options: ['کتف چپ', 'شانه چپ'], position: { top: '20', right: '61' } }, 
        'mid_back_right': { options: ['پشت راست', 'کمر راست (دنده)'], position: { top: '33', right: '30' } },
        'mid_back_left': { options: ['پشت چپ', 'کمر چپ (دنده)'], position: { top: '33', right: '53' } },
        
        'arm_back_right': { options: ['پشت بازو راست', 'پشت آرنج راست'], position: { top: '35', right: '5' } },
        'arm_back_left': { options: ['پشت بازو چپ', 'پشت آرنج چپ'], position: { top: '36', right: '85' } },
        
        'wrist_back_right': { options: ['پشت مچ دست راست', 'پشت دست راست'], position: { top: '51', right: '1' } }, 
        'wrist_back_left': { options: ['پشت مچ دست چپ', 'پشت دست چپ'], position: { top: '51', right: '85' } },
        
        'lower_back_center': { options: ['پایین کمر', 'ستون فقرات (مرکز)'], position: { top: '41', right: '43' } },
        
        'buttocks_right': { options: ['باسن راست', 'پشت ران راست'], position: { top: '54', right: '30' } },
        'buttocks_left': { options: ['باسن چپ', 'پشت ران چپ'], position: { top: '54', right: '57' } },
        
        'back_thigh_right': { options: ['پشت ران راست', 'بالای زانو پشت راست'], position: { top: '65', right: '29' } },
        'back_thigh_left': { options: ['پشت ران چپ', 'بالای زانو پشت چپ'], position: { top: '65', right: '58' } },
        
        'back_knee_right': { options: ['پشت زانو راست', 'پشت ساق راست'], position: { top: '79', right: '25' } },
        'back_knee_left': { options: ['پشت زانو چپ', 'پشت ساق چپ'], position: { top: '79', right: '60' } },
        
        'heel_right': { options: ['پاشنه راست', 'مچ پای راست'], position: { top: '91', right: '26' } },
        'heel_left': { options: ['پاشنه چپ', 'مچ پای چپ'], position: { top: '91', right: '60' } },
    }

    const clickHandler = (area) => {
        console.log(back[area])
        if(window.innerWidth > 470) {
            setPosition({top: `${back[area].position.top}%`, right: `${back[area].position.right}%`});
        } else {
            setPosition({top: `${+back[area].position.top - 2}%`, right: `${+back[area].position.right - 4}%`});
        }
        getItemsArea(back[area].options);
    }
    useEffect(() => {
        console.log(position)

        console.log(window.innerWidth)
    } , [position])
    return (
        <div className="w-full h-full relative hover:cursor-pointer">
            <img src={pic} alt="body picture" className="w-full h-full"/>
            <div className="absolute left-0 top-0 h-full w-full">
                <div className="w-full h-[18%] bg-[#f000] relative">
                    <div onClick={() => clickHandler('head_back')} className="w-[21%] h-[58%] rounded-t-4xl rounded-b-[40%] bg-[#0000] absolute top-[6%] right-[39%]"></div>
                    <div onClick={() => clickHandler('neck_back')} className="neck-back bg-[#0000] absolute bottom-0 right-[24%]"></div>
                </div>
                <div className="w-full h-[11%] bg-[#0f00] relative">
                    <div onClick={() => clickHandler('shoulder_back_right')} className="w-[35%] h-full rounded-tr-3xl bg-[#0000] absolute top-0 right-[13%]"></div>
                    <div onClick={() => clickHandler('upper_back_center')} className="w-[8%] h-full bg-[#f000] absolute top-0 right-[46%]"></div>
                    <div onClick={() => clickHandler('shoulder_back_left')} className="w-[35%] h-full rounded-tl-3xl bg-[#0000] absolute top-0 left-[12%]"></div>
                </div>
                <div className="w-full h-[20%] bg-[#00f0] relative">
                    <div onClick={() => clickHandler('arm_back_right')} className="w-[14.6%] skew-x-15 rounded-br-[40%] rounded-bl-[45%] h-full bg-[#0000] absolute top-0 right-[5%]"></div>
                    <div onClick={() => clickHandler('mid_back_right')} className="w-[20%] h-[66%] middle-right bg-[#0000] absolute top-0 right-[28%]"></div>
                    <div onClick={() => clickHandler('lower_back_center')} className="w-[40%] h-[60%] lagan-back bg-[#f000] absolute -bottom-[25%] right-[30%]"></div>
                    <div onClick={() => clickHandler('lower_back_center')} className="w-[5%] h-[65%] bg-[#f000] absolute top-0 right-[48%]"></div>
                    <div onClick={() => clickHandler('mid_back_left')} className="w-[20%] h-[66%] middle-left bg-[#0000] absolute top-0 left-[28%]"></div>
                    <div onClick={() => clickHandler('arm_back_left')} className="w-[14.6%] -skew-x-15 rounded-bl-[45%] rounded-br-[40%] h-full bg-[#0000] absolute top-0 left-[4%]"></div>
                    
                    <div onClick={() => clickHandler('buttocks_right')} className="w-[21%] h-[25%] bg-[#0000] thigh-left-back absolute bottom-0 right-[27%]"></div>
                    <div onClick={() => clickHandler('buttocks_left')} className="w-[21%] h-[25%] bg-[#0000] thigh-right-back absolute bottom-0 left-[27%]"></div>
                </div>
                <div className="w-full h-[23%] bg-[#ff00] relative">
                    <div onClick={() => clickHandler('wrist_back_right')} className="w-[12.5%] h-[46%] bg-[#0000] hand-right absolute top-[5%] right-[1%]"></div>
                    <div onClick={() => clickHandler('buttocks_right')} className="w-[25%] h-[70%] rounded-bl-[30%] bg-[#0000] absolute top-0 right-[25%]"></div>
                    <div onClick={() => clickHandler('back_thigh_right')} className="w-[16%] h-[30%] bg-[#f000] absolute bottom-0 right-[28%]"></div>
                    <div onClick={() => clickHandler('back_thigh_left')} className="w-[18%] h-[30%] bg-[#f000] absolute bottom-0 left-[27%]"></div>
                    <div onClick={() => clickHandler('buttocks_left')} className="w-[25%] h-[70%] rounded-br-[30%] bg-[#0000] absolute top-0 left-[25%]"></div>
                    <div onClick={() => clickHandler('wrist_back_left')} className="w-[12.5%] h-[46%] bg-[#0000] hand-left absolute top-[5%] left-[2%]"></div>
                </div>
                <div className="w-full h-[19%] bg-[#f000] relative">
                    <div onClick={() => clickHandler('back_knee_right')} className="w-[17%] h-full bg-[#0000] sagh-right absolute top-0 right-[25%]"></div>
                    <div onClick={() => clickHandler('back_knee_left')} className="w-[18%] h-full bg-[#0000] sagh-left absolute top-0 left-[24%]"></div>
                </div>
                <div className="w-full h-[9%] bg-[#0f00] relative">
                    <div onClick={() => clickHandler('heel_right')} className="w-[17%] h-[89%] ankle-left bg-[#0000] absolute top-0 right-[21%]"></div>
                    <div onClick={() => clickHandler('heel_left')} className="w-[17%] h-[89%] ankle-right bg-[#0000] absolute top-0 left-[22%]"></div>
                </div>
            </div>
            <img src={point} alt="point" className={`w-10 h-10 absolute`} style={{top: position.top, right: position.right, display: position.top == null && position.right == null? 'none' : "block"}}/>
        </div>
    )
}