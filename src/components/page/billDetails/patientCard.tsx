const PatientCard = ({ patient }) => {
  if (!patient) return <p className="text-stone-500">No data found</p>;
  return (
    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Name </span>
        <span>
          {patient?.firstname} {patient?.lastname}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Insurance </span>
        <span>{patient?.insuranceCompany}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Email </span>
        <span className="lowercase">{patient?.email}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Member ID </span>
        <span>{patient?.memberId}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Contact Number </span>
        <span>{patient?.phone}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Reason for visit </span>
        <span>{patient?.reasonsForVisit[0]}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Address</span>
        <span>{patient?.address}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ethnicity</span>
        <span>{patient?.ethnicity}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Gender</span>
        <span>{patient?.gender}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ordering Physician</span>
        <span>
          {patient?.orderingPhysician?.firstname || 'N/A'}{" "}
          {patient?.orderingPhysician?.lastname}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Death of Birth</span>
        <span>{patient?.dateOfBirth.split("T")[0]}</span>
      </li>
    </ul>
  );
};

export default PatientCard;
