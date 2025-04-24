import BillIcon from "@/components/icons/bill-icon";
import FacilityIcon from "@/components/icons/facility-icon";
import PatientIcon from "@/components/icons/patient-icon";
import TestIcon from "@/components/icons/test-icon";
import ToolboxIcon from "@/components/icons/tool-icon";
import UserIcon from "@/components/icons/user-icon";

export const sidebarMenu = {
  navMain: [
    {
      title: "Tests",
      url: "/dashboard/tests",
      icon: TestIcon,
      isActive: true,
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: PatientIcon,
    },
    {
      title: "User Details",
      url: "/dashboard/users",
      icon: UserIcon,
    },
    {
      title: "Bill Details",
      url: "/dashboard/bills",
      icon: BillIcon,
    },
  ],
  settings: [
    {
      name: "Facilities",
      url: "/dashboard/facilities",
      icon: FacilityIcon,
    },
    {
      name: "Toolbox",
      url: "/dashboard/toolbox",
      icon: ToolboxIcon,
    },
  ],
};

export const userData = {
  name: "Md. Asadujjaman",
  email: "me@example.com",
  role: "Admin",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
};
