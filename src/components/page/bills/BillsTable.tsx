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
import DashboardTable from "@/components/table";
import TablePagination from "@/components/table-pagination";
import columns from "@/components/tableColumns/billTableColumn";
import Image from "next/image";
import { IBill } from "@/types/bill";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { exportToExcel } from "@/utils/exportToExcel";
import exportToPDF from "@/utils/exportToPdf";

// Extract unique roles from data
const paymentStatus = ["Paid", "Unpaid"];

const BillsTable = ({ bills = [], meta, filters }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Table Pagination, Sorting, Filtering, Column Visibility, Row Selection
  const table = useReactTable<IBill>({
    data: bills || [],
    columns: columns as ColumnDef<IBill>[],
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

  // handle excel export data
  const exportData = bills?.map((item: IBill) => ({
    Report_No: item?.report?.report_no,
    Order_Provider: item?.report?.ordering_provider,
    Physician: item?.report?.doctor?.name,
    Bill_Date: item?.bill_date?.split("T")[0],
    Bill_Amount: item?.total_amount,
    Status: item?.isBilled ? "Paid" : "Unpaid",
  }));

  // handle pdf button
  const handleExportToPDF = () => {
    const headers = [
      "Report No",
      "Order Provider",
      "Physician",
      "Bill Date",
      "Bill Amount",
      "Status",
    ];

    const data = exportData.map((item) => [
      item.Report_No,
      item.Order_Provider,
      item.Physician,
      item.Bill_Date,
      item.Bill_Amount,
      item.Status,
    ]);

    exportToPDF({
      title: "Bills Table",
      headers,
      data,
      fileName: "BillsTable.pdf",
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex justify-end gap-4 items-center pb-4">
        {/* PDF button */}
        <Button
          onClick={handleExportToPDF}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={pdfIcon} alt="pdf" width={24} height={24} />
        </Button>
        <Button
          onClick={() => exportToExcel("Bills Data", exportData)}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={excelIcon} alt="pdf" width={24} height={24} />
        </Button>

        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.status
                ? filters?.status === "true"
                  ? "Paid"
                  : "Unpaid"
                : "Status"}
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
            {paymentStatus.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() =>
                  updateMultiSearchParams({
                    status: status === "Paid" ? "true" : "false",
                    page: null,
                  })
                }
              >
                {capitalizeSentence(status)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shadow text-zinc-500">
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

export default BillsTable;
