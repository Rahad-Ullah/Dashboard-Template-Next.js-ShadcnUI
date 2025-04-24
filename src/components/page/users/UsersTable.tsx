"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Plus } from "lucide-react";
import pdfIcon from "@/assets/icons/pdf.svg";
import excelIcon from "@/assets/icons/excel.svg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userTableColumns from "@/components/tableColumns/userTableColumn";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import Link from "next/link";
import Image from "next/image";
import { userRoles } from "@/constants/user-roles";
import { IUser } from "@/types/user";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import exportToPDF from "@/utils/exportToPdf";
import { exportToExcel } from "@/utils/exportToExcel";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";

// Extract unique roles from data
const roles = Array.from(new Set(userRoles.map((item) => item.title)));

const UsersTable = ({ users = [], filters, meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: users || [],
    columns: userTableColumns as ColumnDef<IUser>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  // handle excel button
  const exportData = users?.map((item: IUser) => ({
    Sl_No: item?.id,
    Name: item?.name,
    Phone: item?.phone,
    Email: item?.email,
    Address: item?.address,
    Role: item?.role,
  }));

  // handle pdf button
  const handleExportToPDF = () => {
    const headers = ["Sl No", "Name", "Phone", "Email", "Address", "Role"];

    const data = exportData.map((item) => [
      item.Sl_No,
      item.Name,
      item.Phone,
      item.Email,
      item.Address,
      item.Role,
    ]);

    exportToPDF({
      title: "Users Table",
      headers,
      data,
      fileName: "UsersTable.pdf",
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4 items-center pb-4">
        {/* PDF button */}
        <Button
          onClick={handleExportToPDF}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={pdfIcon} alt="pdf" width={24} height={24} />
        </Button>
        <Button
          onClick={() => exportToExcel("Users Data", exportData)}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={excelIcon} alt="pdf" width={24} height={24} />
        </Button>

        {/* Role Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.role ? `${filters?.role}` : "Role"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ role: null, page: null })
              }
            >
              All Roles
            </DropdownMenuItem>
            {roles.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() =>
                  updateMultiSearchParams({ role: item, page: null })
                }
              >
                {capitalizeSentence(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shadow text-[#929292]">
              Columns <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add new user button */}
        <Link href="/dashboard/users/add-new-user">
          <Button>
            <Plus /> Add New User
          </Button>
        </Link>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={userTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default UsersTable;
