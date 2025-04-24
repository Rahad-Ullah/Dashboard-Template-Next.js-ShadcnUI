"use client";
import GraySection from "./grayPortion";
import { Download, File, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { config } from "@/config/env-config";
import { useRef } from "react";
import toast from "react-hot-toast";

type TDocument = {
  _id: string;
  name: string;
  path: string;
};

const DocumentSection = ({ test }) => {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // handle file downlaod
  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const response = await fetch(`${config.baseURL}${filePath}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.loading("Uploading...", { id: "file-upload" });
    const formData = new FormData();
    const file = e.target.files?.[0];
    if (file) {
      formData.append("doc", file);
    }

    try {
      // perform your api call here...

      toast.success("Uploaded successfully", {
        id: "file-upload",
      });
    } catch (error) {
      toast.error("Unknown error occured", { id: "file-upload" });
      console.error(error);
    }
  };

  // handle file delete
  const handleDeleteFile = async (item: TDocument) => {
    toast.loading("Deleting...", { id: "file-delete" });
    try {
      // perform your api call here...

      console.log(item);
      toast.success("Deleted successfully", {
        id: "file-delete",
      });
    } catch (error) {
      toast.error("Unknown error occured", { id: "file-delete" });
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-medium text-primary">Documents:</h1>
      <GraySection>
        <div className="grid gap-6">
          <ul className="text-zinc-500 grid gap-4 w-full">
            {test.documents.map((item: TDocument, idx: number) => (
              <li
                key={idx}
                className="flex justify-between items-center gap-2 p-4 px-6 bg-white rounded-xl shadow"
              >
                <p className="flex items-center gap-2">
                  <File className="size-5" /> {item?.name}
                </p>
                {pathname?.includes("bill") ? (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => handleDownload(item.path, item.name)}
                  >
                    <Download className="size-5" />
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => handleDeleteFile(item)}
                  >
                    <Trash className="size-5 text-red-500" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
          {!pathname?.includes("bill") && (
            <div className="grid justify-end">
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant={"destructive"}
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus /> Add Document
              </Button>
            </div>
          )}
        </div>
      </GraySection>
    </div>
  );
};

export default DocumentSection;
