import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IBill } from "@/types/bill";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<IBill>[] = [
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
    accessorKey: "report_no",
    header: "Report No.",
    cell: ({ row }) => {
      const item = row.original as IBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.report?.report_no}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "ordering_provider",
    header: "Ordering Provider",
    cell: ({ row }) => {
      const item = row.original as IBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.report?.ordering_provider}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "ordering_physician",
    header: "Ordering Physician",
    cell: ({ row }) => {
      const item = row.original as IBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.report?.doctor?.name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "bill_date",
    header: () => <div>Bill Date</div>,
    cell: ({ row }) => {
      const item = row.original as IBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.bill_date.split("T")[0]}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "bill_amount",
    header: " Bill Amount",
    cell: ({ row }) => {
      const item = row.original as IBill;
      const bill = parseFloat(item?.total_amount?.toString())?.toFixed(2);
      return (
        <Link href={`/dashboard/bills/bill-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent px-6"
          >
            $ {bill}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original as IBill;
      const status = item?.isBilled ? "Paid" : "Unpaid";
      return (
        <Link href={`/dashboard/bills/bill-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent px-6"
          >
            {status}
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
          <Link href={`/dashboard/bills/bill-details/${item._id}`} passHref>
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
