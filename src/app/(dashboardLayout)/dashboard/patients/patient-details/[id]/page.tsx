import { Card, CardContent, CardHeader } from "@/components/ui/card";

type PageParams = Promise<{ id: string }>;

const PatientDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  console.log(id);

  //! Note: This is server component, so you can fetch data directly here. If you need to use client components, you can call and pass the data as props to them.

  // Fetch patient details using the id from params
  // const res = await myFetch(`/patient/${id}`, {
  //   tags: ["single-patient"],
  // });

  return (
    <section className="grid gap-4 h-full">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Patient Details:</h1>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </section>
  );
};

export default PatientDetailsPage;
