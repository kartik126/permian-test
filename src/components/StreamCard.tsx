import useTyped from "@/hooks/useTyped";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface StreamCardProps {
  url: string;
}

function StreamCard({ url }: StreamCardProps) {
  const typedTextRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const options = {
      strings: [
        "Imagine a black ceramic bowl set on a rustic wooden table, showcasing the enticing colors and textures. Tender, succulent pieces of boneless chicken are nestled the aroma of aromatic spices wafts through the air.",
      ],
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
  }, []);

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
          <p
            className="text-[10px] py-2 text-gray-300 font-mono"
            ref={typedTextRef}
          ></p>
        </div>
      </div>
  );
}

export default StreamCard;
