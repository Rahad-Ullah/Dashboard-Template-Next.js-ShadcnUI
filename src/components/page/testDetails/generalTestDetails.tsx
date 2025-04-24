import GraySection from "./grayPortion";

type TDisorder = { _id: string; name: string };
type TDisease = { _id: string; name: string; disorders: TDisorder[] };
type TMedicalTerm = { _id: string; type: string; content: string };
type TBiopsySample = {
  _id: string;
  report_id: string;
  sample_area: string;
  sample_side: string;
  specimen_id: string;
};

const GeneralTestDetails = ({ test }) => {
  return (
    <>
      <GraySection>
        <h1 className="text-xl font-medium">Disorder Observation:</h1>
        {test?.dieases?.map((item: TDisease) => (
          <div key={item?._id} className="flex flex-wrap gap-6">
            <h2 className="text-lg">{item?.name}</h2>
            <ul className="text-zinc-500 grid gap-4">
              {item?.disorders?.map((nestedItem: TDisorder) => (
                <li key={nestedItem?._id}>{nestedItem?.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Reason for Skin Biopsy:</h1>
        <div className="flex gap-6">
          <ul className="text-zinc-500 grid gap-4">
            {test.medical_terms
              .filter((item: TMedicalTerm) => item.type === "medical_diagnosis")
              .map((item: TMedicalTerm, idx: number) => (
                <li key={idx}>{item?.content}</li>
              ))}
          </ul>
        </div>
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Communication with Patient:</h1>
        <div className="flex gap-6">
          <ul className="text-zinc-500 grid gap-4">
            {test.medical_terms
              .filter((item: TMedicalTerm) => item.type === "pain_description")
              .map((item: TMedicalTerm, idx: number) => (
                <li key={idx}>{item?.content}</li>
              ))}
          </ul>
        </div>
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Clinical Symptoms:</h1>
        {test.clinical_symptoms?.map((item) => (
          <div key={item?._id} className="flex flex-wrap gap-6">
            <h2 className="text-lg">{item?.title}</h2>
            <ul className="text-zinc-500 grid gap-4">
              {item?.disorders?.map(
                (nestedItem: {
                  _id: string;
                  name: string;
                  sides: string[];
                }) => (
                  <li key={nestedItem?._id}>
                    {nestedItem?.name} -{" "}
                    <span className="text-red-500">
                      {nestedItem?.sides?.map((side: string) => `${side} Side`).join(", ")}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Biopsy Sample:</h1>
        <div className="flex gap-6 px-2">
          <ul className="text-zinc-500 grid gap-4 w-full">
            {test.biopsy_sample.map((item: TBiopsySample, idx: number) => (
              <li key={idx} className="flex flex-wrap justify-between">
                <p>
                  {idx + 1}. Sample taken from{" "}
                  <span className="text-primary font-medium">
                    {item.sample_area}
                  </span>{" "}
                  <span className="text-red-500 capitalize">
                    {item.sample_side} Side
                  </span>{" "}
                </p>
                <p className="text-sm text-zinc-400">
                  Specimen Id: {item.specimen_id}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </GraySection>
    </>
  );
};

export default GeneralTestDetails;
