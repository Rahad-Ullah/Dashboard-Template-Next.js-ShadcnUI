import AddTestForm from "@/components/page/addTest/AddTestForm";
import { insuranceData } from "@/demoData/insurances";
import { singleFacility } from "@/demoData/singleFacility";
import { usersData } from "@/demoData/users";

const AddTestPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  //? Fetching data from the API
  // const facilityRes = await myFetch(`/facility/${id}`, {
  //   tags: ["single-facility"],
  // });

  return (
    <div>
      <AddTestForm
        doctors={usersData?.data as never[]}
        dieases={singleFacility?.data[0]?.disorders as never[]}
        medicalTerms={singleFacility?.data[0]?.reasons as never[]}
        clinicalSymptoms={singleFacility?.data[0]?.clinical_symptoms as never[]}
        insurances={insuranceData as never[]}
        facility={singleFacility?.data[0]}
      />
    </div>
  );
};

export default AddTestPage;
