import PatientsTable from "@/components/page/patients/PatientsTable";
import { insuranceData } from "@/demoData/insurances";
import { patientsData } from "@/demoData/patients";

const PatientsPage = async ({ searchParams }) => {
  const { insuranceCompany } = await searchParams;
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(insuranceCompany && { insuranceCompany }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  //? Fetch data from the backend when backend is ready
  // const res = await myFetch(`/patient?${queryParams.toString()}`, {
  //   tags: ["patients"],
  // });

  return (
    <>
      <PatientsTable
        patients={patientsData?.data as never[]}
        meta={patientsData?.pagination as never}
        filters={{ insuranceCompany }}
        insuranceData={insuranceData as never[]}
      />
    </>
  );
};

export default PatientsPage;
