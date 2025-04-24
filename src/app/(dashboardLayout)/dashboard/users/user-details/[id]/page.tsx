import { Card, CardHeader } from "@/components/ui/card";

type PageParams = Promise<{ id: string }>;

const UserDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  console.log(id);

  //! Note: This is server component, so you can fetch data directly here. If you want to use client component, you need to pass the data as props.

  // fetch user details from the server
  // const res = await myFetch(`/user/users/${id}`);

  return (
    <section className="flex flex-col gap-6 h-full">
      <Card className="h-full">
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">User Details:</h1>
        </CardHeader>
      </Card>
    </section>
  );
};

export default UserDetailsPage;
