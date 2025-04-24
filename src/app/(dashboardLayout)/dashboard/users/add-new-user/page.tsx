import AddNewUserForm from "@/components/page/addUser/AddUserForm";
import { facilitiesData } from "@/demoData/facilities";

const AddUserPage = async () => {
  return <AddNewUserForm facilities={facilitiesData?.data} />;
};

export default AddUserPage;
