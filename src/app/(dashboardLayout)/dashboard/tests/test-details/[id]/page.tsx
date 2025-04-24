import PatientCard from "@/components/page/billDetails/patientCard";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import BillingSection from "@/components/page/testDetails/billingSection";
import DocumentSection from "@/components/page/testDetails/documentSection";
import GeneralTestDetails from "@/components/page/testDetails/generalTestDetails";
import NoteSection from "@/components/page/testDetails/noteSection";
import PathologistSection from "@/components/page/testDetails/pathologistSection";
import TestInfo from "@/components/page/testDetails/testInfo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { singleTest } from "@/demoData/singleTest";

type PageParams = Promise<{ id: string }>;

const TestDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  console.log(id);

  //! Note: This is server component, so you can fetch data directly here. If you need to use client components, you can pass the data to them as props.

  //? Fetching the test data from the API
  // const res = await myFetch(`/report/${id}`, {
  //   tags: ["single-test"],
  // });

  const test = singleTest.data;
  if (!test) return <h1 className="text-stone-500">Data not found</h1>;

  return (
    <section className="grid gap-6">
      {/* Patient details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">Patient:</h1>
        </CardHeader>
        <CardContent>
          <PatientCard patient={test.patient} />
        </CardContent>
      </Card>
      {/* Test Details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">Test Details:</h1>
        </CardHeader>
        <CardContent className="grid gap-10">
          <TestInfo test={test} />
          <section className="flex flex-col-reverse lg:flex-row gap-8">
            {/* left section */}
            <section className="w-full lg:w-2/3 grid gap-8">
              <GeneralTestDetails test={test} />

              {/* Document */}
              <section>
                <DocumentSection test={test} />
              </section>

              {/* Pathologist section */}
              <section>
                <PathologistSection test={test} />
              </section>

              {/* Billing */}
              <section>
                <BillingSection bill={{ report: test }} />
              </section>

              {/* Note */}
              <NoteSection testId={test?._id} note={test?.note} />
            </section>
            {/* Anatomy Image section */}
            <section>
              <AnatomyWrapper testPoints={test.biopsy_sample} />
            </section>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default TestDetailsPage;
