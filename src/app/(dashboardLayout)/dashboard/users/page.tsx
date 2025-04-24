import UsersTable from "@/components/page/users/UsersTable";
import { usersData } from "@/demoData/users";

const UsersPage = async ({ searchParams }) => {
  const { role } = await searchParams;
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(role && { role }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // Fetch data from the backend when backend is ready
  // const res = await myFetch(`/user/users?${queryParams.toString()}`, {
  //   tags: ["users"],
  // });

  return (
    <>
      <UsersTable
        users={usersData?.data as never[]}
        meta={usersData?.pagination as never}
        filters={{ role }}
      />
    </>
  );
};

export default UsersPage;
