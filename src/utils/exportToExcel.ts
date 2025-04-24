import * as XLSX from "xlsx";

export const exportToExcel = (worksheetName, data) => {
  // Prepare the data for export
  const worksheet = XLSX.utils.json_to_sheet(data); // Convert tests data to a worksheet
  const workbook = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName); // Append the worksheet to the workbook

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, `${worksheetName}.xlsx`);
};
