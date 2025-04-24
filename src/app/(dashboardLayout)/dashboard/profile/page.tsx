import { profileData } from "@/demoData/profile";
import ChangePasswordTab from "@/components/page/profile/ChangePasswordTab";
import ProfileDetailsTab from "@/components/page/profile/ProfileDetailsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = async () => {
  // const res = await myFetch("/user/profile", {
  //   tags: ["user-profile"],
  // });

  const user = profileData;

  return (
    <Tabs
      defaultValue={"profile-details"}
      className="flex flex-col gap-4 h-[calc(100vh-128px)] sticky top-32 bg-white p-6 rounded-xl"
    >
      <div className="border-b">
        <TabsList className="flex items-start gap-8 w-fit p-0">
          <TabsTrigger
            value={"profile-details"}
            key={"profile-details"}
            className="text-zinc-400 border-b-2 border-transparent rounded-none px-0 text-xl font-normal data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary"
          >
            Profile Details
          </TabsTrigger>
          <TabsTrigger
            value={"change-password"}
            key={"change-password"}
            className="text-zinc-400 border-b-2 border-transparent rounded-none px-0 text-xl font-normal data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary"
          >
            Change Password
          </TabsTrigger>
        </TabsList>
      </div>

      {/* tab content 1 */}
      <TabsContent
        value={"profile-details"}
        className="rounded-xl border-none p-0 overflow-y-scroll no-scrollbar"
      >
        {user ? (
          <ProfileDetailsTab user={user} />
        ) : (
          <p className="text-muted-foreground my-8">Something went wrong</p>
        )}
      </TabsContent>

      {/* tab content 2 */}
      <TabsContent
        value={"change-password"}
        className="rounded-xl border-none p-0 overflow-y-scroll no-scrollbar"
      >
        <ChangePasswordTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;
