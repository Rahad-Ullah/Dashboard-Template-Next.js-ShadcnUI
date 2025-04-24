import Image from "next/image";
import EditProfileModal from "./EditProfileModal";

const ProfileDetailsTab = ({ user }) => {
  return (
    <>
      {/* header */}
      <section className="flex justify-end items-center gap-2 mb-4">
        <EditProfileModal user={user} />
      </section>
      {/* body */}
      <section className="flex flex-col md:flex-row gap-16">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={`${user.image}`}
            alt="profile"
            width={250}
            height={250}
            priority
            className="rounded-2xl w-64 aspect-square object-cover"
          />
          <h1 className="text-[#333333]">{user.name}</h1>
          <p className="text-[#006EEE]">S.no. {user.id}</p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Name</p>
            <p className="text-[#5C5C5C]">{user.name}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Position</p>
            <p className="text-primary">{user.role}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Email</p>
            <p className="text-[#5C5C5C]">{user.email}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Phone No</p>
            <p className="text-[#5C5C5C]">{user.phone}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-[#A1A1A1]">Address</p>
            <p className="text-[#5C5C5C]">{user.address}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileDetailsTab;
