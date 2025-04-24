/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { useTestFormContext } from "@/contexts/testFormContext";

interface Diagnosis {
  content: string;
  type: string;
}

const Step3 = ({
  prevStep,
  nextStep,
  medicalTerms,
}: {
  prevStep: () => void;
  nextStep: () => void;
  medicalTerms: any[];
}) => {
  const { formData, setFormData } = useTestFormContext();
  const [selectedMedicalDiagnosises, setSelectedMedicalDiagnosises] = useState<
    Diagnosis[]
  >(
    formData?.report_info?.medical_terms?.filter(
      (item) => item?.type === "medical_diagnosis"
    )
  );

  // filter only medical diagnosis
  const medicalDiagnosises = medicalTerms?.filter(
    (item) => item?.type === "medical_diagnosis"
  );

  // Function to handle checkbox change
  const handleCheckboxChange = (idx: number) => {
    setSelectedMedicalDiagnosises((prevSelected) => {
      const selectedItem = medicalDiagnosises[idx]; // Get the selected item using its index

      // Check if the item is already in the state
      const isAlreadySelected = prevSelected.some(
        (item) => item.content === selectedItem.name
      );

      if (isAlreadySelected) {
        // If the item is already selected, remove it from the state
        return prevSelected.filter(
          (item) => item.content !== selectedItem.name
        );
      } else {
        // If the item is not selected, add it to the state
        return [
          ...prevSelected,
          { content: selectedItem.name, type: selectedItem.type },
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
        medical_terms: selectedMedicalDiagnosises,
      },
    });
    nextStep();
  };

  return (
    <div className="grid gap-8">
      {/* Body section */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <div className="grid gap-4">
            {medicalDiagnosises?.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <Checkbox
                  id={item?.name}
                  value={item?.name}
                  checked={selectedMedicalDiagnosises.some(
                    (selectedItem) => selectedItem.content === item.name
                  )} // Check if the item exists in the selectedMedicalDiagnosises state
                  onCheckedChange={() => handleCheckboxChange(idx)}
                  className="mt-1"
                />
                <Label htmlFor={item?.name} className="text-sm text-stone-600">
                  {item?.name}
                </Label>
              </div>
            ))}
          </div>
        </section>

        <section className="flex-1">
          {/* Anatomy Wrapper can be placed here */}
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

export default Step3;
