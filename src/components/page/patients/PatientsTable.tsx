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
import { IPatient, TPatient } from "@/types/patient";
import patientTablecolumns from "@/components/tableColumns/patientTableColumn";
import Image from "next/image";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import exportToPDF from "@/utils/exportToPdf";
import { exportToExcel } from "@/utils/exportToExcel";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";

const PatientsTable = ({
  patients = [],
  meta,
  filters,
  insuranceData = [],
}) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Extract unique insurances from data
  const insurances = insuranceData?.map((item: IPatient) => item.name);

  // Table Pagination, Sorting, Filtering, Column Visibility, Row Selection
  const table = useReactTable<TPatient>({
    data: patients || [],
    columns: patientTablecolumns as ColumnDef<TPatient>[],
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

  // format data for excel export
  const exportData = patients?.map((item: IPatient) => ({
    Sl_No: item?.id,
    Name: item?.name,
    Phone: item?.phone,
    Email: item?.email,
    Insurance: item?.insuranceCompany,
  }));

  // handle pdf button
  const handleExportToPDF = () => {
    const headers = ["Sl No", "Name", "Phone", "Email", "Insurance"];

    const data = exportData.map((item) => [
      item.Sl_No,
      item.Name,
      item.Phone,
      item.Email,
      item.Insurance,
    ]);

    exportToPDF({
      title: "Patient Table",
      headers,
      data,
      fileName: "PatientTable.pdf",
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
          onClick={() => exportToExcel("PatientTable", exportData)}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={excelIcon} alt="pdf" width={24} height={24} />
        </Button>

        {/* Insurance Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.insuranceCompany
                ? `${filters?.insuranceCompany}`
                : "Insurance"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ insuranceCompany: null, page: null })
              }
            >
              All Insurances
            </DropdownMenuItem>
            {insurances.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() =>
                  updateMultiSearchParams({
                    insuranceCompany: item,
                    page: null,
                  })
                }
              >
                {capitalizeSentence(item as string)}
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
        <DashboardTable table={table} columns={patientTablecolumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default PatientsTable;
