/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

const UserCard = ({ user }: { user?: any }) => {
  if (!user) return <h1 className="text-stone-500">Data not found</h1>;

  return (
    <div className="flex flex-col xl:flex-row gap-10">
      <figure className="p-2 col-span-1">
        <Image
          src={user.image.includes("i.ibb.co") ? user.image : `${user.image}`}
          alt="user image"
          width={200}
          height={200}
          className="rounded-2xl size-56 object-cover"
        ></Image>
      </figure>
      <div className="">
        <h1 className="text-xl font-medium text-primary capitalize mb-4 py-2">
          {user.role}:
        </h1>
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-fit">
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Name </span>
            <span>: {user.name}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Company </span>
            <span>: {user.company_name || "N/A"}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Email </span>
            <span>: {user.email}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Contact Number </span>
            <span>: {user.phone}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Address</span>
            <span>: {user.address}</span>
          </li>
          {user.facility_location && (
            <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <span className="text-zinc-400">Facility Location</span>
              <span>: {user.facility_location}</span>
            </li>
          )}
          {user.apt_number && (
            <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <span className="text-zinc-400">APT Number</span>
              <span>: {user.apt_number}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
