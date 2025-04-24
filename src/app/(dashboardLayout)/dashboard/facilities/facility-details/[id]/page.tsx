import { Card, CardHeader } from "@/components/ui/card";

type PageParams = Promise<{ id: string }>;

const FacilityDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  console.log(id);

  //! Note: This is server component, so you can fetch data directly here. If you want to use client component, you need to pass the data as props.

  // call your api to fetch data from the server
  // const res = await myFetch(`/facility/${id}`);

  return (
    <section className="grid gap-6 h-full">
      {/* Patient details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">
            Facility Details:
          </h1>
        </CardHeader>
      </Card>
    </section>
  );
};

export default FacilityDetailsPage;
