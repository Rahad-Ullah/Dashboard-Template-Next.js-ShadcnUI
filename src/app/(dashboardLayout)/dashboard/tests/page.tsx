import { demoTestsData } from "@/demoData/tests";
import TestsTable from "@/components/page/tests/TestsTable";

const TestPage = async ({ searchParams }) => {
  const { doctor, facility, status } = await searchParams;

  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(doctor && { doctor }),
  //   ...(facility && { facility }),
  //   ...(status && { status }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // fetch your data from the backend here...

  // const res = await myFetch(`/report?${queryParams.toString()}`, {
  //   tags: ["tests"],
  // });

  // demo data
  const facilityData = [
    { _id: 1, name: "Facility A" },
    { _id: 2, name: "Facility B" },
    { _id: 3, name: "Facility C" },
  ] as never[];

  const doctorsData = [
    { _id: 1, name: "Doctor A" },
    { _id: 2, name: "Doctor B" },
    { _id: 3, name: "Doctor C" },
  ] as never[];

  return (
    <>
      <TestsTable
        tests={demoTestsData?.data as never[]}
        meta={demoTestsData?.pagination as never}
        filters={{ doctor, facility, status }}
        facilitiesData={facilityData}
        doctorsData={doctorsData}
      />
    </>
  );
};

export default TestPage;
