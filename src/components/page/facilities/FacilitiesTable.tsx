/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ChevronDown } from "lucide-react";
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
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import columns from "@/components/tableColumns/facilityTableColumns";
import { IFacility, TFacility } from "@/types/facility";
import Image from "next/image";
import { facilityStatuses } from "@/constants/facilityStatuses";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { IUser } from "@/types/user";
import { exportToExcel } from "@/utils/exportToExcel";
import exportToPDF from "@/utils/exportToPdf";
import TablePagination from "@/components/shared/table-pagination";
import DashboardTable from "@/components/shared/table";

const FacilitiesTable = ({
  facilities = [],
  filters,
  meta,
  doctorsData = [],
  representativeData = [],
}) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Extract unique roles from data
  const statuses = Array.from(new Set(facilityStatuses.map((item) => item)));

  const doctors = doctorsData?.map((item: IUser) => item?.name);

  const representatives = representativeData?.map((item: IUser) => item?.name);

  const table = useReactTable<any>({
    data: facilities || [],
    columns: columns as ColumnDef<TFacility>[],
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
  const exportData = facilities?.map((item: IFacility) => ({
    Sl_No: item?.facilityId,
    Name: item?.name,
    Address: item?.address,
    Doctors: item?.doctors?.map((item) => item?.name).join(", "),
    Representative: item?.representative?.name,
    Status: item?.status,
  }));

  // handle pdf button
  const handleExportToPDF = () => {
    const headers = [
      "Sl No",
      "Name",
      "Address",
      "Doctors",
      "Representative",
      "Status",
    ];

    const data = exportData.map((item) => [
      item.Sl_No,
      item.Name,
      item.Address,
      item.Doctors,
      item.Representative,
      item.Status,
    ]);

    exportToPDF({
      title: "Facilities Table",
      headers,
      data,
      fileName: "FacilitiesTable.pdf",
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
          onClick={() => exportToExcel("Facilities", exportData)}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={excelIcon} alt="pdf" width={24} height={24} />
        </Button>

        {/* Doctor Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.doctor ? `${filters?.doctor}` : "Doctor"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ doctor: null, page: null })
              }
            >
              All Doctor
            </DropdownMenuItem>
            {doctors.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() =>
                  updateMultiSearchParams({ doctor: item, page: null })
                }
              >
                {capitalizeSentence(item as string)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Representative Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.representative
                ? `${filters?.representative}`
                : "Representative"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ representative: null, page: null })
              }
            >
              All Representative
            </DropdownMenuItem>
            {representatives.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() =>
                  updateMultiSearchParams({ representative: item, page: null })
                }
              >
                {capitalizeSentence(item as string)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Activity Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.status ? `${filters?.status}` : "Status"}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ status: null, page: null })
              }
            >
              All Status
            </DropdownMenuItem>
            {statuses.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() =>
                  updateMultiSearchParams({ status: item, page: null })
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
                    {capitalizeSentence(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={columns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default FacilitiesTable;
