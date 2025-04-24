/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { useTestFormContext } from "@/contexts/testFormContext";

interface ClinicalSymptom {
  title: string;
  disorders: {
    name: string;
    sides: string[];
  }[];
}

const Step5 = ({
  prevStep,
  nextStep,
  clinicalSymptoms,
}: {
  prevStep: () => void;
  nextStep: () => void;
  clinicalSymptoms: any[];
}) => {
  const { formData, setFormData } = useTestFormContext();
  const [selectedSymptoms, setSelectedSymptoms] = useState<ClinicalSymptom[]>(
    formData?.report_info?.clinical_symptoms
  );

  // Handle the checkbox change and update selected disorder sides
  const handleCheckboxChange = (
    symptomIdx: number,
    disorderIdx: number,
    side: string
  ) => {
    setSelectedSymptoms((prevSelected) => {
      const symptom = clinicalSymptoms[symptomIdx]; // Get the selected symptom using its index
      const disorder = symptom.disorders[disorderIdx]; // Get the selected disorder using its index

      // Check if the symptom already exists in selectedSymptoms
      const existingSymptom = prevSelected.find(
        (item) => item.title === symptom.title
      );

      if (existingSymptom) {
        // Check if the disorder already exists in the symptom
        const existingDisorder = existingSymptom.disorders.find(
          (d) => d.name === disorder.name
        );

        if (existingDisorder) {
          // Check if the side is already selected
          if (existingDisorder.sides.includes(side)) {
            // Remove the side immutably
            const updatedSides = existingDisorder.sides.filter(
              (s) => s !== side
            );

            // Remove the disorder if no sides remain
            const updatedDisorders =
              updatedSides.length > 0
                ? existingSymptom.disorders.map((d) =>
                    d.name === disorder.name ? { ...d, sides: updatedSides } : d
                  )
                : existingSymptom.disorders.filter(
                    (d) => d.name !== disorder.name
                  );

            // Remove the symptom if no disorders remain
            return updatedDisorders.length > 0
              ? prevSelected.map((s) =>
                  s.title === symptom.title
                    ? { ...s, disorders: updatedDisorders }
                    : s
                )
              : prevSelected.filter((s) => s.title !== symptom.title);
          } else {
            // Add the side immutably
            const updatedDisorders = existingSymptom.disorders.map((d) =>
              d.name === disorder.name ? { ...d, sides: [...d.sides, side] } : d
            );

            return prevSelected.map((s) =>
              s.title === symptom.title
                ? { ...s, disorders: updatedDisorders }
                : s
            );
          }
        } else {
          // Add the disorder with the selected side immutably
          const updatedDisorders = [
            ...existingSymptom.disorders,
            { name: disorder.name, sides: [side] },
          ];

          return prevSelected.map((s) =>
            s.title === symptom.title
              ? { ...s, disorders: updatedDisorders }
              : s
          );
        }
      } else {
        // Add the symptom with the selected disorder and side immutably
        return [
          ...prevSelected,
          {
            title: symptom.title,
            disorders: [{ name: disorder.name, sides: [side] }],
          },
        ];
      }
    });
  };

  // handle next button
  const handleNext = () => {
    setFormData({
      ...formData,
      report_info: {
        ...formData?.report_info,
        clinical_symptoms: selectedSymptoms,
      },
    });
    nextStep();
  };
  return (
    <div className="grid gap-8">
      {/* Body section */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <Accordion type="single" collapsible className="w-full grid gap-4">
            {clinicalSymptoms?.map((item: ClinicalSymptom, idx: number) => (
              <AccordionItem
                key={idx}
                value={item?.title}
                className="border-none"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="bg-zinc-100 rounded-lg w-full p-4 flex items-center gap-4">
                    <p className="font-medium flex items-center gap-5">
                      {item?.title}
                      <span className="text-xs font-medium text-zinc-400">
                        {item?.disorders?.length} items
                      </span>
                    </p>
                  </div>
                  <AccordionTrigger className="bg-zinc-100 p-5 rounded-lg"></AccordionTrigger>
                </div>

                <AccordionContent className="p-2 md:p-5 lg:pr-20">
                  <div className="grid gap-6">
                    {item?.disorders?.map((disorder, nestedIdx: number) => (
                      <div key={nestedIdx} className="grid gap-4">
                        <p className="text-stone-700">{disorder?.name}</p>
                        <div className="flex items-center gap-4 ml-8">
                          {/* Checkbox for "Both" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder?.name + "Both"}
                              value={"Both"}
                              checked={selectedSymptoms.some(
                                (symptom) =>
                                  symptom.title === item.title &&
                                  symptom.disorders.some(
                                    (d) =>
                                      d.name === disorder.name &&
                                      d.sides.includes("Both")
                                  )
                              )}
                              onCheckedChange={() =>
                                handleCheckboxChange(idx, nestedIdx, "Both")
                              }
                            />
                            <Label
                              htmlFor={disorder?.name + "Both"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Both Sides
                            </Label>
                          </span>

                          {/* Checkbox for "Left" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder?.name + "Left"}
                              value={"Left"}
                              checked={selectedSymptoms.some(
                                (symptom) =>
                                  symptom.title === item.title &&
                                  symptom.disorders.some(
                                    (d) =>
                                      d.name === disorder.name &&
                                      d.sides.includes("Left")
                                  )
                              )}
                              onCheckedChange={() =>
                                handleCheckboxChange(idx, nestedIdx, "Left")
                              }
                            />
                            <Label
                              htmlFor={disorder?.name + "Left"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Left Side
                            </Label>
                          </span>

                          {/* Checkbox for "Right" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder?.name + "Right"}
                              value={"Right"}
                              checked={selectedSymptoms.some(
                                (symptom) =>
                                  symptom.title === item.title &&
                                  symptom.disorders.some(
                                    (d) =>
                                      d.name === disorder.name &&
                                      d.sides.includes("Right")
                                  )
                              )}
                              onCheckedChange={() =>
                                handleCheckboxChange(idx, nestedIdx, "Right")
                              }
                            />
                            <Label
                              htmlFor={disorder?.name + "Right"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Right Side
                            </Label>
                          </span>

                          {/* Checkbox for "Middle" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder?.name + "Middle"}
                              value={"Middle"}
                              checked={selectedSymptoms.some(
                                (symptom) =>
                                  symptom.title === item.title &&
                                  symptom.disorders.some(
                                    (d) =>
                                      d.name === disorder.name &&
                                      d.sides.includes("Middle")
                                  )
                              )}
                              onCheckedChange={() =>
                                handleCheckboxChange(idx, nestedIdx, "Middle")
                              }
                            />
                            <Label
                              htmlFor={disorder?.name + "Middle"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Middle
                            </Label>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="flex-1">
          <AnatomyWrapper testPoints={[]} />
        </section>
      </div>

      {/* Submit buttons */}
      <div className="flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={handleNext} className="md:px-6">
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step5;
