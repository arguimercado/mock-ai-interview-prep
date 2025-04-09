

import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
   const techIcons = await getTechLogos(techStack);
   
   return (
      <div className="flex gap-2">
         {techIcons.slice(0, 3).map(({ tech, url }, index) => (
            <div
               className={cn("relative group bg-dark-300 rounded-full p-2 flext-center", index >= 1 && '-ml-3')}
               key={index}
            >
               <span className="tech-tooltip">{tech}</span>
               <Image
                  src={url}
                  alt={tech}
                  width={100}
                  height={100}
                  className="w-6 h-6 object-contain"
               />
            </div>
         ))}
      </div>
   );
};

export default DisplayTechIcons;
