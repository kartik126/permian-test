"use client";
import StreamCard from "@/components/StreamCard";
import React, { useEffect, useRef, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import useTyped from "@/hooks/useTyped";
import imagesData from "../data/photos.json";
import Loader from "@/components/Loader";
import Typed from "typed.js";

export default function Home() {
  const [title, settitlle] = useState("Compare Foods In India");

  const typedTextRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const options = {
      strings: [title],
      typeSpeed: 20,
      backSpeed: 20,
      showCursor: false,
      onStart: () => {
        startTimeRef.current = performance.now();
      },
      onComplete: () => {
        const endTime = performance.now();
        const elapsedTime = endTime - startTimeRef.current;
        // console.log("Time taken to type:", elapsedTime);
      },
    };
    const typed = new Typed(typedTextRef.current, options);
  }, []);

  return (
    <main className="flex flex-col min-h-screen justify-between p-24 uppercase">
      <h1
        className="h-10 text-[26px] px-2 text-gray-300 title-text font-mono"
        ref={typedTextRef}
      ></h1>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={4}
        visibleSlides={2}
        className="w-[100%] mt-10"
      >
        <div>
          <ButtonBack className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/30 group-hover:bg-white/200 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </ButtonBack>
          <Slider>
            {imagesData.map((image, index) => (
              <Slide key={image.id} index={index}>
                <DelayedStreamCard url={image.url} index={index} />
              </Slide>
            ))}
          </Slider>
          <ButtonNext className="border-1 border-[#454545] absolute right-10 top-1/2 transform -translate-y-1/2 text-white">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </ButtonNext>
        </div>
      </CarouselProvider>
    </main>
  );
}

const DelayedStreamCard = ({ url, index }: any) => {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setVisibleIndex(index);
      },
      index == 0 ? 1371 : index * 5000
    );

    return () => clearTimeout(timeoutId);
  }, [index]);

  return visibleIndex === index ? <StreamCard url={url} /> : <Loader />;
};
