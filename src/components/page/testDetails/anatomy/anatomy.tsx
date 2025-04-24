"use client";

import { Button } from "@/components/ui/button";
import { anatomyPointsData } from "@/constants/anatomyPointsData";
import { Eye, EyeOff, Mars, RefreshCcw, Venus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Circle, Text } from "react-konva";
import useImage from "use-image";

const ImageAnnotation = ({ testPoints }) => {
  const [isHidden, setHidden] = useState(false);
  const [isImageFront, setIsImageFront] = useState(false);
  const [isGenderMale, setIsGenderMale] = useState(true);

  const [maleBack, loading] = useImage("/images/male-back.png");
  const [maleFront] = useImage("/images/male-front.png");
  const [femaleFront] = useImage("/images/female-front.png");

  // Reference to circles for animation
  const circleRefs = useRef({});

  useEffect(() => {
    // Animation for selected circles every 500ms
    const interval = setInterval(() => {
      testPoints?.forEach((point) => {
        const circle =
          circleRefs.current[`${point.sample_area}-${point.sample_side}`];
        if (circle) {
          // Get the current scale
          const currentScale = circle.scaleX();
          // Animate scale to either 1.25 or 1 based on current state
          circle.to({
            scaleX: currentScale === 1 ? 1.5 : 1,
            scaleY: currentScale === 1 ? 1.5 : 1,
            duration: 0.3,
          });
        }
      });
    }, 500); // every 500ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [testPoints]); // Empty dependency array ensures the effect runs once

  if (loading === "loading") {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const screenWidth = window.innerWidth;
  const canvasWidth = screenWidth > 425 ? 390 : 340;

  return (
    <div className="flex flex-col md:flex-row justify-center space-y-4 sticky top-20">
      <div className="md:grid gap-2 mt-12 h-fit">
        <Button
          onClick={() => setHidden(!isHidden)}
          variant={"ghost"}
          size={"icon"}
          className="text-zinc-500"
        >
          {isHidden ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          onClick={() => {
            setIsImageFront(!isImageFront);
          }}
          variant={"ghost"}
          size={"icon"}
          className="text-zinc-500"
        >
          <RefreshCcw />
        </Button>
        <Button
          onClick={() => {
            setIsGenderMale(!isGenderMale);
          }}
          variant={"ghost"}
          size={"icon"}
          className="text-zinc-500"
        >
          {isGenderMale ? <Mars /> : <Venus />}
        </Button>
      </div>
      <Stage width={canvasWidth} height={560} className="flex-1">
        <Layer>
          {/* Image rendering */}
          {isGenderMale && !isImageFront && (
            <Image image={maleBack} width={340} height={560} alt="image" />
          )}
          {isGenderMale && isImageFront && (
            <Image image={maleFront} width={340} height={560} alt="image" />
          )}
          {!isGenderMale && isImageFront && (
            <Image image={femaleFront} width={340} height={560} alt="image" />
          )}
          {!isGenderMale && !isImageFront && (
            <Image image={maleBack} width={340} height={560} alt="image" />
          )}

          {/* Render circles */}
          {anatomyPointsData.map((point) => {
            const isSelected = testPoints?.some(
              (item) =>
                item.sample_area === point.sample_area &&
                item.sample_side === point.sample_side
            );

            return (
              <React.Fragment key={`${point.sample_area}-${point.sample_side}`}>
                <Circle
                  ref={(el) => {
                    circleRefs.current[
                      `${point.sample_area}-${point.sample_side}`
                    ] = el;
                  }}
                  x={point.x}
                  y={point.y}
                  radius={isSelected ? 5 : 4}
                  fill={isSelected ? "red" : "turquoise"}
                />
                {point.sample_side === "Right" && !isHidden && (
                  <Text
                    x={point.x + 15} // Slight offset for text visibility
                    y={point.y - 5} // Slight offset for text visibility
                    text={`← ${point.sample_area}`}
                    fontSize={12}
                    fontFamily="Poppins"
                    fill="gray"
                  />
                )}
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAnnotation;
