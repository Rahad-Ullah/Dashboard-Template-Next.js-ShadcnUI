/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { Pencil, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import EditModal from "@/components/modals/EditModal";
import DeleteModal from "@/components/modals/DeleteModal";
import AddModal from "@/components/modals/add-modal";

const InsuranceTab = ({ data = [] }: { data: any[] }) => {
  // handle add new option
  const handleAdd = (values: { option: string }) => {
    toast.loading("Adding...", { id: "add-insurance" });
    try {
      console.log(values);
      // perform your API call here and return the response
      toast.success("Added successfully", { id: "add-insurance" });
    } catch (error) {
      toast.error("Failed to add", { id: "add-insurance" });
      console.error(error);
    }
    return;
  };

  // handle edit existing option
  const handleEdit = async (values: { option: string }, id: string) => {
    toast.loading("Updating...", { id: "edit-insurance" });
    try {
      // perform your api here...
      console.log(values, id);
      toast.success("Updated successfully", { id: "edit-insurance" });
    } catch (error) {
      toast.error("Failed to update", {
        id: "edit-insurance",
      });
      console.error(error);
    }
    return { success: false, message: "Unknown error" };
  };

  // handle delete existing option
  const handleDelete = async (id: string) => {
    toast.loading("Deleting...", { id: "delete-insurance" });
    try {
      // perform your api here...
      console.log(id);
      toast.success("Deleted successfully", { id: "delete-insurance" });
    } catch (error) {
      toast.error("Failed to delete", {
        id: "delete-insurance",
      });
      console.error(error);
    }
  };

  return (
    <TabsContent
      value={"Insurance"}
      className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
    >
      {/* header */}
      <section className="flex justify-between items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-medium text-primary">
          {capitalizeSentence("Insurance")}
        </h1>
        <AddModal
          triggerBtn={
            <Button>
              <Plus /> Add
            </Button>
          }
          title="Add New Insurance"
          placeholderText="Enter insurance name"
          action={handleAdd}
        />
      </section>
      <Separator className="my-4" />
      {/* body */}
      <section className="">
        <ul className="grid gap-4 md:gap-2">
          {data?.length > 0 ? (
            data?.map((item: { _id: string; name: string }) => (
              <li
                key={item?._id}
                className="flex justify-between items-center gap-2 ml-2 md:m-0"
              >
                <p className={`flex items-center gap-3 text-sm text-stone-600`}>
                  <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                  {item?.name}
                </p>
                <div className="flex">
                  <EditModal
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-primary"
                      >
                        <Pencil />
                      </Button>
                    }
                    title="Edit Insurance"
                    btnText="Update"
                    action={handleEdit}
                    item={item}
                    inputValue={item?.name}
                  />
                  <DeleteModal
                    itemId={item?._id}
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-red-500"
                      >
                        <Trash />
                      </Button>
                    }
                    actionBtnText="Delete"
                    action={handleDelete}
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-stone-600">No data found</p>
          )}
        </ul>
      </section>
    </TabsContent>
  );
};

export default InsuranceTab;
