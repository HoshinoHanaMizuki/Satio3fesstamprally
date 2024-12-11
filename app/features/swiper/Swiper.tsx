"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const slides: string[] = [
    "/image/swiper/1.png",
    "/image/swiper/2.png",
    "/image/swiper/3.png",
    "/image/swiper/4.png",
    "/image/swiper/5.png"
];

export default function Swiper() {
    const [currentSlideNum, setCurrentSlideNum] = useState(0);
    const router = useRouter();

    const handleSlideClick = () => {
        if (currentSlideNum === slides.length - 1) { 
            router.push("/lottery");
        }
    };

    const nextClickHandler = () => {
        setCurrentSlideNum((prevSlideNum) => 
            prevSlideNum === slides.length - 1 ? 0 : prevSlideNum + 1
        );
    };

    const prevClickHandler = () => {
        setCurrentSlideNum((prevSlideNum) =>
            prevSlideNum === 0 ? slides.length - 1 : prevSlideNum - 1
        );
    };

    return (
        <div className="swiper-container flex flex-col items-center">
            <div className="swiper-slide">
                <img
                    src={slides[currentSlideNum]}
                    alt={`Slide ${currentSlideNum + 1}`}
                    className="w-full h-auto cursor-pointer"
                    loading="lazy"
                    onClick={handleSlideClick}
                />
            </div>

            {/* 現在のスライド番号表示 */}
            <div className="currentSlidesNumDisplayer flex mt-2 space-x-2">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                            index === currentSlideNum ? "bg-blue-500" : "bg-black"
                        }`}
                    />
                ))}
            </div>

            <div className="swiper-buttons flex mt-4">
                <button
                    onClick={prevClickHandler}
                    className="swiper-button-prev px-4 py-2 mx-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                    前へ
                </button>
                <button
                    onClick={nextClickHandler}
                    className="swiper-button-next px-4 py-2 mx-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                    次へ
                </button>
            </div>
        </div>
    );
}