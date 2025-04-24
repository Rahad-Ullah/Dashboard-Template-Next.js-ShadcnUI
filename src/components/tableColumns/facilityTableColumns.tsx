import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IFacility } from "@/types/facility";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import Link from "next/link";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

// table column definition
const columns: ColumnDef<IFacility>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-[#5C5C5C]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-[#A1A1A1]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "facilityId",
    header: "Sl. No",
    cell: ({ row }) => {
      const item = row.original as IFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.facilityId}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Facilities Name",
    cell: ({ row }) => {
      const item = row.original as IFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const item = row.original as IFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.address}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "doctors",
    header: "Doctors",
    cell: ({ row }) => {
      const item = row.original as IFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {`Dr. ${item?.doctors[0]?.name}, `}
            {item?.doctors?.length > 1 && (
              <span className="text-primary">{item?.doctors?.length - 1}+</span>
            )}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "representative",
    header: () => <div>Representative</div>,
    cell: ({ row }) => {
      const item = row.original as IFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.representative?.name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as IFacility;
      const status = row.getValue("status");
      return (
        <Link href={`/dashboard/facilities/facility-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className={`capitalize w-full justify-start hover:bg-transparent`}
          >
            <div className="flex items-center space-x-2">
              <MdOutlineRadioButtonChecked
                className={`size-5 ${
                  status === "Active" ? "text-[#319517]" : "text-red-500"
                }`}
              />
              <p>{status as string}</p>
            </div>
          </Button>
        </Link>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const item = row.original as IFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item._id}`}>
          <div className="flex items-center gap-1">
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Info />
            </Button>
          </div>
        </Link>
      );
    },
  },
];

export default columns;
