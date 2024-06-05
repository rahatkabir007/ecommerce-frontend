import { Splide } from "@splidejs/react-splide";
import { useRef, ReactNode } from "react";

interface SharedSliderProps {
    children: ReactNode;
    items?: number;
}

const SharedSlider = ({ children, items }: SharedSliderProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<any>(null);

    const options = {
        perPage: items,
        perMove: 1,
        pagination: false,
        gap: 10,
        arrows: true,
        type: "slide",
        wheel: true,
        releaseWheel: true,
        waitForTransition: true,
        breakpoints: {
            1130: {
                perPage: 4,
                perMove: 1,
            },
            840: {
                perPage: 2,
                perMove: 1,
            },
            506: {
                perPage: 1,
                perMove: 1,
                gap: 10,
            },
        },
    };

    return (
        <div ref={parentRef}>
            <Splide ref={sliderRef} options={options} className="splide__slider">
                {children}
            </Splide>
        </div>
    );
};

export default SharedSlider;