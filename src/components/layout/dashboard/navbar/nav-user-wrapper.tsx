import { profileData } from "@/demoData/profile";
import { NavUser } from "./nav-user";

const NavUserWrapper = async () => {
  //! fetch user profile data from server
  // const res = await myFetch("/user/profile", {
  //   tags: ["user-profile"],
  // });

  return <NavUser user={profileData} />;
};

export default NavUserWrapper;
