import InsuranceTab from "@/components/page/toolbox/InsuranceTab";
import LengthResponseTab from "@/components/page/toolbox/LengthResponseTab";
import NonLengthResponseTab from "@/components/page/toolbox/NonLengthResponseTab";
import ReportDisclaimerTab from "@/components/page/toolbox/ReportDisclaimer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolboxTabs } from "@/constants/toolbox";
import { capitalizeSentence } from "@/utils/capitalizeSentence";

const ToolboxPage = async () => {
  //! This is server component, fetch your data here...

  // const insuranceResponse = await myFetch("/insurance", {
  //   tags: ["insurance"],
  // });

  // demo data
  const insuranceData = [
    {
      id: 1,
      name: "Insurance 1",
    },
    {
      id: 2,
      name: "Insurance 2",
    },
    {
      id: 3,
      name: "Insurance 3",
    },
    {
      id: 4,
      name: "Insurance 4",
    },
  ];

  return (
    <Tabs
      defaultValue={"Insurance"}
      className="flex flex-col lg:flex-row gap-2 h-[calc(100vh-128px)] sticky top-32"
    >
      <div className="bg-white p-4 rounded-xl">
        <TabsList className="flex flex-col justify-start items-start gap-2">
          {toolboxTabs.map((item, idx) => {
            return (
              <TabsTrigger
                value={item}
                key={idx}
                className="text-zinc-500 text-base font-normal"
              >
                {capitalizeSentence(item)}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* tab content 1 */}
      <InsuranceTab data={insuranceData} />

      {/* tab content 2 */}
      <ReportDisclaimerTab />

      {/* tab content 3 */}
      <LengthResponseTab />

      {/* tab content 4 */}
      <NonLengthResponseTab />
    </Tabs>
  );
};

export default ToolboxPage;
