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

interface Diease {
  name: string;
  disorders: {
    name: string;
  }[];
}

const Step2 = ({
  prevStep,
  nextStep,
  dieases,
}: {
  prevStep: () => void;
  nextStep: () => void;
  dieases: Diease[];
}) => {
  const { formData, setFormData } = useTestFormContext();
  const [selectedDisorders, setSelectedDisorders] = useState<Diease[]>(
    formData?.report_info?.dieases
  );

  // handle checkbox selection
  const handleCheckboxChange = (dieasesIdx: number, disorderIdx: number) => {
    setSelectedDisorders((prevSelected) => {
      const disease = dieases[dieasesIdx]; // Get the selected disease using its index
      const disorder = disease.disorders[disorderIdx]; // Get the selected disorder using its index

      // Check if the disease already exists in selectedDisorders
      const existingDisease = prevSelected.find(
        (item) => item.name === disease.name
      );

      if (existingDisease) {
        // If the disease exists, check if the disorder is already selected
        const isDisorderSelected = existingDisease.disorders.some(
          (d) => d.name === disorder.name
        );

        if (isDisorderSelected) {
          // If the disorder is already selected, remove it
          return prevSelected
            .map((item) =>
              item.name === disease.name
                ? {
                    ...item,
                    disorders: item.disorders.filter(
                      (d) => d.name !== disorder.name
                    ),
                  }
                : item
            )
            .filter((item) => item.disorders.length > 0); // Remove the disease if no disorders remain
        } else {
          // If the disorder is not selected, add it
          return prevSelected.map((item) =>
            item.name === disease.name
              ? {
                  ...item,
                  disorders: [...item.disorders, disorder],
                }
              : item
          );
        }
      } else {
        // If the disease does not exist, add it with the selected disorder
        return [...prevSelected, { name: disease.name, disorders: [disorder] }];
      }
    });
  };

  // handle next button
  const handleNext = () => {
    setFormData({
      ...formData,
      report_info: {
        ...formData?.report_info,
        dieases: selectedDisorders,
      },
    });
    nextStep()
  };

  return (
    <div className="grid gap-8">
      {/* body */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <Accordion type="single" collapsible className="w-full grid gap-2">
            {dieases?.length > 0 ? (
              dieases.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={item?.name}
                  className="border-none"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="bg-zinc-100 rounded-lg w-full p-4 flex items-center gap-4">
                      <p className="font-medium flex items-center gap-5">
                        {item?.name}
                        <span className="text-xs font-medium text-zinc-400">
                          {item?.disorders?.length} items
                        </span>
                      </p>
                    </div>
                    <AccordionTrigger className="bg-zinc-100 p-5 rounded-lg"></AccordionTrigger>
                  </div>
                  <AccordionContent className="p-2 md:p-5 lg:pr-20">
                    <div className="grid gap-4 md:gap-2">
                      {item.disorders.map((disorder, nestedIdx) => (
                        <div
                          key={nestedIdx}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={disorder?.name}
                            value={disorder?.name}
                            checked={selectedDisorders.some(
                              (selectedDisease) =>
                                selectedDisease.name === item.name &&
                                selectedDisease.disorders.some(
                                  (d) => d.name === disorder.name
                                )
                            )}
                            onCheckedChange={() =>
                              handleCheckboxChange(idx, nestedIdx)
                            }
                          />
                          <Label
                            htmlFor={disorder?.name}
                            className="text-sm text-stone-600"
                          >
                            {disorder?.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-stone-500 text-center py-8">No data found</p>
            )}
          </Accordion>
        </section>
        <section className="flex-1">
          <AnatomyWrapper testPoints={[]} />
        </section>
      </div>

      {/* submit button */}
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

export default Step2;
