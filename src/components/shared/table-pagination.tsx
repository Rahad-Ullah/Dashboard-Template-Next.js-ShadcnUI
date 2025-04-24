import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const TablePagination = ({ table, meta }) => {
  const page = meta?.page;
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
      <div className="md:absolute text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex justify-center flex-1">
        <Pagination className="text-[#A7A7A7]">
          <PaginationContent className="">
            {/* previous button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  updateSearchParams("page", page > 1 ? `${page - 1}` : page)
                }
                className={page <= 1 ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>
            {/* page buttons */}
            {Array.from({ length: meta?.totalPage }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() =>
                    updateSearchParams("page", (index + 1).toString())
                  }
                  isActive={page == index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {/* next button */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  updateSearchParams(
                    "page",
                    page < meta?.totalPage ? `${page + 1}` : page
                  )
                }
                className={
                  page >= meta?.totalPage ? "cursor-not-allowed opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;
