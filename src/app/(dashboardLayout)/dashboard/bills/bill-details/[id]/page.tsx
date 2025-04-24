import { Card, CardHeader } from "@/components/ui/card";

type PageParams = Promise<{ id: string }>;

const BillDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  console.log(id);

  //! Note: This is server component, so you can fetch data directly here. If need to use client component, you call client component and pass the data as props.

  // const billResponse = await myFetch(`/bill/${id}`, {
  //   tags: ["single-bill"],
  // });

  return (
    <section className="grid gap-6 h-full">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">
            Bill Details Page
          </h1>
        </CardHeader>
      </Card>
    </section>
  );
};

export default BillDetailsPage;
