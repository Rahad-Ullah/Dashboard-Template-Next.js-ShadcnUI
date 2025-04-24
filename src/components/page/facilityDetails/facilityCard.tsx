import { IFacility } from "@/types/facility";
import { capitalizeSentence } from "@/utils/capitalizeSentence";

const FacilityCard = ({ facility }: { facility: IFacility }) => {
  return (
    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Facility Name </span>
        <span>{facility?.name}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Contact Name </span>
        <span>{facility?.contactName}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Email </span>
        <span>{facility?.email}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Phone Number </span>
        <span>{facility?.phone}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Address</span>
        <span>{facility?.address}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Suite</span>
        <span>{facility?.suite}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Notification Email 1</span>
        <span>{facility?.notificationEmail1}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Notification Email 2</span>
        <span>{facility?.notificationEmail2}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Fax</span>
        <span>{facility?.fax}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Account Type</span>
        <span>{capitalizeSentence(facility?.accountType)}</span>
      </li>
    </ul>
  );
};

export default FacilityCard;
