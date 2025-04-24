/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

interface ExportToPDFParams {
  title: string; // Title of the PDF
  headers: string[]; // Table headers
  data: any[][]; // Table data (array of arrays)
  fileName?: string; // Optional file name for the PDF
}

const exportToPDF = ({
  title,
  headers,
  data,
  fileName = "DataTable.pdf",
}: ExportToPDFParams) => {
  const doc = new jsPDF();

  // Add title to the PDF
  doc.text(title, 14, 10);

  // Add the table to the PDF
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 20,
  });

  // Save the PDF with the provided file name
  doc.save(fileName);
};

export default exportToPDF;
