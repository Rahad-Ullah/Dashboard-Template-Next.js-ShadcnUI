import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IPatient } from "@/types/patient";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<IPatient>[] = [
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
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      const item = row.original as IPatient;
      return (
        <Link href={`/dashboard/patients/patient-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {row.getValue("id")}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => {
      const item = row.original as IPatient;
      return (
        <Link href={`/dashboard/patients/patient-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone No",
    cell: ({ row }) => {
      const item = row.original as IPatient;
      return (
        <Link href={`/dashboard/patients/patient-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.phone}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IPatient;
      return (
        <Link href={`/dashboard/patients/patient-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="w-full justify-start hover:bg-transparent"
          >
            {item.email}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "insurance_company",
    header: () => <div>Insurance</div>,
    cell: ({ row }) => {
      const item = row.original as IPatient;
      return (
        <Link href={`/dashboard/patients/patient-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.insuranceCompany}
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
      const item = row.original;
      return (
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/patients/patient-details/${item?._id}`}
            passHref
          >
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Info />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default columns;
