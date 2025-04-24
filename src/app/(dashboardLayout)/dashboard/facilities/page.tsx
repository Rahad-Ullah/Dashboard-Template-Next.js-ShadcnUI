import FacilitiesTable from "@/components/page/facilities/FacilitiesTable";
import { facilitiesData } from "@/demoData/facilities";
import { usersData } from "@/demoData/users";

const FacilitiesPage = async ({ searchParams }) => {
  const { doctor, representative, status } = await searchParams;
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(doctor && { doctor }),
  //   ...(representative && { representative }),
  //   ...(status && { status }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  //? Fetch data from the backend when backend is ready
  // const res = await myFetch(`/facility?${queryParams.toString()}`, {
  //   tags: ["facilities"],
  // });

  return (
    <>
      <FacilitiesTable
        facilities={facilitiesData?.data as never[]}
        meta={facilitiesData?.pagination}
        filters={{ doctor, representative, status }}
        doctorsData={usersData?.data as never[]}
        representativeData={usersData?.data as never[]}
      />
    </>
  );
};

export default FacilitiesPage;
