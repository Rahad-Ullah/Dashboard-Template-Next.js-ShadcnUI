"use client";

import { TabsContent } from "@/components/ui/tabs";
import { capitalizeSentence } from "@/utils/capitalizeSentence";

const LengthResponseTab = () => {
  return (
    <TabsContent
      value={"Length Dependent Response"}
      className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
    >
      {/* header */}
      <div className="h-full flex flex-col">
        <section className="flex justify-between items-center gap-2 mb-6">
          <h1 className="text-xl lg:text-2xl font-medium text-primary">
            {capitalizeSentence("Length Dependent Response")}
          </h1>
        </section>
      </div>
    </TabsContent>
  );
};

export default LengthResponseTab;
