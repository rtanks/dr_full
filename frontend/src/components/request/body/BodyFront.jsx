import { useEffect, useState } from "react";
import point from '../../../assets/images/Group4065.png';

export default function BodyFront({pic,getItemsArea}) {
    const [position, setPosition] = useState({top: null, right: null});
    const front= { 
        'head': { options: ['سر', 'صورت', 'فک'], position: { top: '5', right: '43' } }, 
        'neck': { options: ['گردن', 'ترقوه'], position: { top: '14', right: '43' } }, 
        'sternum_upper': { options: ['استخوان جناغ', 'مرکز سینه'], position: { top: '21', right: '43' } },
        'shoulder_right': { options: ['شانه راست', 'بازو راست'], position: { top: '19', right: '62' } }, 
        'shoulder_left': { options: ['شانه چپ', 'بازو چپ'], position: { top: '19', right: '23' } }, 
        'ribs_right': { options: ['دنده‌های راست', 'پهلوی راست'], position: { top: '31', right: '56' } }, 
        'ribs_left': { options: ['دنده‌های چپ', 'پهلوی چپ'], position: { top: '31', right: '28' } },
        'arm_right': { options: ['بازوی راست', 'آرنج راست'], position: { top: '33', right: '77' } }, 
        'arm_left': { options: ['بازوی چپ', 'آرنج چپ'], position: { top: '33.5', right: '8' } }, 
        'wrist_right': { options: ['مچ دست راست', 'دست راست'], position: { top: '49', right: '83' } }, 
        'wrist_left': { options: ['مچ دست چپ', 'دست چپ'], position: { top: '49', right: '1' } }, 
        'pelvis_center': { options: ['شکم', 'مرکز لگن'], position: { top: '44', right: '43' } }, 
        'hip_right': { options: ['باسن راست', 'ران راست'], position: { top: '52', right: '58' } }, 
        'hip_left': { options: ['باسن چپ', 'ران چپ'], position: { top: '52', right: '28' } }, 
        'thigh_right': { options: ['ران راست', 'بالای زانو راست'], position: { top: '64', right: '56' } }, 
        'thigh_left': { options: ['ران چپ', 'بالای زانو چپ'], position: { top: '64', right: '27' } }, 
        'knee_right': { options: ['زانو راست', 'ساق راست'], position: { top: '75', right: '58' } }, 
        'knee_left': { options: ['زانو چپ', 'ساق چپ'], position: { top: '75', right: '26' } }, 
        'ankle_right': { options: ['مچ پای راست', 'کف پای راست'], position: { top: '90', right: '60' } }, 
        'ankle_left': { options: ['مچ پای چپ', 'کف پای چپ'], position: { top: '91', right: '23' } }, 
    }

    const clickHandler = (area) => {
        if(window.innerWidth > 470) {
            setPosition({top: `${front[area].position.top}%`, right: `${front[area].position.right}%`});
        } else {
            setPosition({top: `${+front[area].position.top - 2}%`, right: `${+front[area].position.right - 4}%`});
        }
        getItemsArea(front[area].options);
    }
    useEffect(() => {
        console.log(window.innerWidth)
    } , [position])
    return (
        <div className="w-full h-full relative hover:cursor-pointer">
            <img src={pic} alt="body picture" className="w-full h-full"/>
            <div className="absolute left-0 top-0 h-full w-full">
                <div className="w-full h-[19%] bg-[#f0030] relative">
                    <div onClick={() => clickHandler('head')} className="w-[21%] h-[68%] rounded-t-4xl rounded-b-[60%] bg-[#0000] absolute top-[6%] right-[40.5%]"></div>
                    <div onClick={() => clickHandler('neck')} className="neck bg-[#0000] absolute bottom-0 right-[24%]"></div>
                </div>
                <div className="w-full h-[10%] bg-[#0f030] relative">
                    <div onClick={() => clickHandler('shoulder_left')} className="w-[30%] h-full rounded-tr-3xl bg-[#0000] absolute top-0 right-[15%]"></div>
                    <div onClick={() => clickHandler('sternum_upper')} className="w-[11%] h-full bg-[#f000] absolute top-0 right-[45%]"></div>
                    <div onClick={() => clickHandler('shoulder_right')} className="w-[30%] h-full rounded-tl-3xl bg-[#0000] absolute top-0 left-[14%]"></div>
                </div>
                <div className="w-full h-[18%] bg-[#00f30] relative">
                    <div onClick={() => clickHandler('arm_left')} className="w-[14.6%] skew-x-15 rounded-br-[40%] rounded-bl-[45%] h-full bg-[#0000] absolute top-0 right-[7%]"></div>
                    <div onClick={() => clickHandler('ribs_left')} className="w-[20%] h-[72%] middle-right bg-[#0000] absolute top-0 right-[30%]"></div>
                    <div onClick={() => clickHandler('pelvis_center')} className="w-[40%] h-[53%] lagan bg-[#f000] absolute -bottom-[25%] right-[30%]"></div>
                    <div onClick={() => clickHandler('ribs_right')} className="w-[20%] h-[72%] middle-left bg-[#0000] absolute top-0 left-[30%]"></div>
                    <div onClick={() => clickHandler('arm_right')} className="w-[14.6%] -skew-x-15 rounded-bl-[45%] rounded-br-[40%] h-full bg-[#0000] absolute top-0 left-[8%]"></div>
                </div>
                <div className="w-full h-[23%] bg-[#ff030] relative">
                    <div onClick={() => clickHandler('wrist_left')} className="w-[12.5%] h-[46%] bg-[#0000] hand-right absolute top-[6%] right-[3%]"></div>
                    <div onClick={() => clickHandler('hip_left')} className="w-[24%] h-[70%] thigh-right bg-[#0000] absolute top-0 right-[24%]"></div>
                    <div onClick={() => clickHandler('thigh_left')} className="w-[18%] h-[30%] rounded-b-[30%] bg-[#f000] absolute bottom-0 right-[25%]"></div>
                    <div onClick={() => clickHandler('thigh_right')} className="w-[18%] h-[30%] rounded-b-[30%] bg-[#f000] absolute bottom-0 left-[27%]"></div>
                    <div onClick={() => clickHandler('hip_right')} className="w-[24%] h-[70%] thigh-left bg-[#0000] absolute top-0 left-[26%]"></div>
                    <div onClick={() => clickHandler('wrist_right')} className="w-[12.5%] h-[46%] bg-[#0000] hand-left absolute top-[6%] left-[5%]"></div>
                </div>
                <div className="w-full h-[19%] bg-[#f0030] relative">
                    <div onClick={() => clickHandler('knee_left')} className="w-[17%] h-full bg-[#0000] sagh-right absolute top-0 right-[25%]"></div>
                    <div onClick={() => clickHandler('knee_right')} className="w-[18%] h-full bg-[#0000] sagh-left absolute top-0 left-[27%]"></div>
                </div>
                <div className="w-full h-[10%] bg-[#0f030] relative">
                    <div onClick={() => clickHandler('ankle_left')} className="w-[17%] h-[89%] ankle-left bg-[#0000] absolute top-0 right-[21%]"></div>
                    <div onClick={() => clickHandler('ankle_right')} className="w-[17%] h-[89%] ankle-right bg-[#0000] absolute top-0 left-[24%]"></div>
                </div>
            </div>
            <img src={point} alt="point" className={`w-10 h-10 absolute`} style={{top: position.top, right: position.right, display: position.top == null && position.right == null? 'none' : "block"}}/>
        </div>
    )
}