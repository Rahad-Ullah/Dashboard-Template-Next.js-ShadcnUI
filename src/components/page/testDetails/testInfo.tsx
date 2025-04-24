/* eslint-disable @typescript-eslint/no-explicit-any */
const TestInfo = ({ test }: { test: any }) => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Report No.</span>
        <span># {test?.report_no}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Sensory Symptoms</span>
        <span>{test?.patient?.sensorySymptoms[0] || "N/A"}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Status</span>
        <span className="text-primary">{test?.status}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ordering Provider</span>
        <span className="text-primary">{test?.ordering_provider}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">CPT(s)</span>
        <span>
          {" "}
          {test?.icd.length > 0
            ? test?.cpt.map((item: string) => item).join(", ")
            : "N/A"}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Apply Date</span>
        <span>{new Date(test?.apply_date).toLocaleString()}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ordering Physician</span>
        <span className="text-primary">
          {test?.doctor?.firstname || "N/A"} {test?.doctor?.firstname}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">ICD(s)</span>
        <span>
          {test?.icd.length > 0
            ? test?.icd.map((item: string) => item).join(", ")
            : "N/A"}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Report Date</span>
        <span className="text-red-500">
          {new Date(test?.report_date).toLocaleString()}
        </span>
      </li>
    </ul>
  );
};

export default TestInfo;
