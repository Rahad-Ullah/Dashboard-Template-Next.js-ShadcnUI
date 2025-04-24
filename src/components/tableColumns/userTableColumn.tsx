"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidate } from "@/helpers/revalidateHelper";
import { IUser } from "@/types/user";
import { myFetch } from "@/utils/myFetch";
import { ColumnDef } from "@tanstack/react-table";
import { Info, Lock, LockOpen } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// handle user lock
const handleUserLock = async (id: string) => {
  try {
    const res = await myFetch(`/user/lock/${id}`, {
      method: "PUT",
    });
    if (res?.success) {
      revalidate("users");
    } else {
      toast.error(res?.message || "Failed to update");
    }
  } catch (error) {
    toast.error("Failed to update");
    console.error(error);
  }
};

// table column definition
const columns: ColumnDef<IUser>[] = [
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
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.id}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: " User Name",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
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
    accessorKey: "phone",
    header: "Phone No",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
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
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
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
    accessorKey: "address",
    header: () => <div>Address</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.address}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Badge
            className={`capitalize font-medium text-white rounded-full hover:bg-primary py-1.5 w-full flex justify-center`}
            style={{
              backgroundColor:
                role === "Admin"
                  ? "#F17600"
                  : role === "Representative"
                  ? "#C42985"
                  : role === "Pathologist"
                  ? "#319517"
                  : role === "Histologist"
                  ? "#85CA53"
                  : "",
            }}
          >
            {row.getValue("role")}
          </Badge>
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
          {!item.isLocked && (
            <Button
              onClick={() => handleUserLock(item?._id)}
              variant={"ghost"}
              size={"icon"}
              className="text-zinc-400"
            >
              <LockOpen />
            </Button>
          )}
          {item.isLocked && (
            <Button
              onClick={() => handleUserLock(item?._id)}
              variant={"ghost"}
              size={"icon"}
              className="text-red-500"
            >
              <Lock />
            </Button>
          )}
          <Link href={`/dashboard/users/user-details/${item._id}`} passHref>
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
