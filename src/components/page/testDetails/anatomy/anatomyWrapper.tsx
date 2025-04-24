"use client";

import dynamic from "next/dynamic";

// Dynamically import the ImageAnnotation component with ssr: false
const ImageAnnotation = dynamic(
  () => import("@/components/page/testDetails/anatomy/anatomy"),
  {
    ssr: false, // Disable SSR for this component
  }
);

const AnatomyWrapper = ({ testPoints }) => {
  return <ImageAnnotation testPoints={testPoints} />;
};

export default AnatomyWrapper;
