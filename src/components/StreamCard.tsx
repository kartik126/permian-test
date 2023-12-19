import useTyped from "@/hooks/useTyped";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

interface StreamCardProps {
  url: string;
  description: string;
}

function StreamCard({ url, description }: StreamCardProps) {
  const typedTextRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

    const delayTime = 1000;

    const delayTypedInit = setTimeout(() => {
      const options = {
        strings: [description],
        typeSpeed: 10,
        backSpeed: 20,
        showCursor: false,
        onStart: () => {
          startTimeRef.current = performance.now();
        },
        onComplete: () => {
          const endTime = performance.now();
          const elapsedTime = endTime - startTimeRef.current;
          console.log("Time taken to type:", elapsedTime);
        },
      };

      const typed = new Typed(typedTextRef.current, options);
      return () => {
        typed.destroy();
      };
    }, delayTime);

    return () => clearTimeout(delayTypedInit);
  }, [description]);

  return (
    <div className="bg-gray-800 bg-opacity-50 border border-1 border-[#454545] w-1/1 h-fit rounded-[10px] p-2 text-white  mx-2 shadow-lg">
      <div className="h-[330px] relative">
        <Image
          src={url}
          alt=""
          layout="fill"
          objectFit="cover"
          className="rounded-[10px]"
        />
      </div>
      <div className="leading-5">

          <p className="text-[10px] py-2 text-gray-300 font-mono" ref={typedTextRef}></p>
  
      </div>
    </div>
  );
}

export default StreamCard;
