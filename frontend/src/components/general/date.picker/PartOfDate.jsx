import { useEffect, useRef, useState } from "react";
import { transformFormat } from "../../../services/func/transformFunc";

export default function PartOfDate({items,getValue,initialIndex}) {
    const dayContainer = useRef();
    const itemDays = useRef([]);

    const additionalDiv = () => {
        return (
            <>
                <div className="w-full h-[14.2%]"></div>
                <div className="w-full h-[14.2%]"></div>
                <div className="w-full h-[14.2%]"></div>
            </>
        )
    }
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    useEffect(() => {
        const container = dayContainer.current;
        if (!container) return;

        let ticking = false;

        const getCenterItem = () => {
            const containerRect = container.getBoundingClientRect();
            const center = containerRect.top + containerRect.height / 2;

            let closestIndex = null;
            let minDistance = Infinity;

            itemDays.current.forEach((item, index) => {
              if (!item) return;

              const rect = item.getBoundingClientRect();
              const itemCenter = rect.top + rect.height / 2;

              const distance = Math.abs(center - itemCenter);

              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
              }
            });
            console.log('scroll',items[closestIndex])
            getValue(items[closestIndex])
            setActiveIndex(closestIndex);
        };

        const onScroll = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              getCenterItem();
              ticking = false;
            });
            ticking = true;
          }
        };

        container.addEventListener("scroll", onScroll);
        const initialItem = itemDays.current[initialIndex];
        if (initialItem) {
            initialItem.scrollIntoView({
                behavior: "auto", // بار اول بدون انیمیشن
                block: "center",
            });
        }
        // مقدار اولیه
        getCenterItem();
      
        return () => container.removeEventListener("scroll", onScroll);

    }, [initialIndex])

    const scrollToItem = (index) => {
      console.log('click',itemDays.current[index])
      getValue(index + 1)
      const item = itemDays.current[index];
      if (!item) return;
        
      item.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };
    return (
        <div ref={dayContainer} className="w-1/3 snap-y snap-mandatory scroll-smooth h-full overflow-y-scroll z-10">
            {additionalDiv()}
            {
                items.map((d, i)=> (
                    <div key={i} ref={(el) => (itemDays.current[i] = el)} onClick={() => scrollToItem(i)}
                    className={`w-full h-[14.2%] snap-center
                    dayItem ${activeIndex === i ? "scale-105 text-black" : "text-a7a7a7"}
                    flex justify-center items-center text-xl font-bold`}>{transformFormat(d < 10 ? "0" + d : d)}</div>
                ))
            }
            {additionalDiv()}
        </div>
    )
}