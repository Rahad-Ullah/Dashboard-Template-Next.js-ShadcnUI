import BillsTable from "@/components/page/bills/BillsTable";
import { billsData } from "@/demoData/bills";

const BillsPage = async ({ searchParams }) => {
  const { status } = await searchParams;
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(searchTerm && { searchTerm }),
  //   ...(status && { status }),
  //   ...(page && { page }),
  // });

  //? Fetch data from the backend when backend is available
  // const res = await myFetch(`/bill?${queryParams.toString()}`, {
  //   tags: ["bills"],
  // });

  return (
    <>
      <BillsTable
        bills={billsData?.data as never[]}
        meta={billsData?.pagination}
        filters={{ status }}
      />
    </>
  );
};

export default BillsPage;
