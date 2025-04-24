"use client";

import { usePathname } from "next/navigation";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import BackButton from "../../../shared/back-button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

const DashboardBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isDynamicId = (segment: string): boolean => {
    // Check if the segment contains "$", "%", or any number (0-9)
    return /[$%0-9]/.test(segment);
  };

  // Filter out solid route segments
  const filteredSegments = pathSegments.filter(
    (segment) => !isDynamicId(segment)
  );
  const lastSegment = filteredSegments[filteredSegments.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden lg:block">
          {filteredSegments?.length > 2 && <BackButton />}
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage className="md:text-base lg:text-lg font-medium">
            {capitalizeSentence(lastSegment)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
