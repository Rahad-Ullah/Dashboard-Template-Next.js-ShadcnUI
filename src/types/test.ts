import { TPatient } from "./patient";

export type TTest = {
  _id: string;
  report_no: string;
  status: string;
  ordering_provider: string;
  doctor: {
    _id: string;
    name: string;
  };
  facility_location: string;
  cpts: string[];
  icds: string[];
  apply_date: string;
  report_date: string;
  patient: TPatient;
  disorder_observation: {
    metabolic: {
      code: string;
      description: string;
    }[];
  };
  reason_for_skin_biopsy: string[];
  communication_with_patient: string[];
  clinical_symptoms: {
    neck_pain: {
      description: string;
      code: string;
      side: string;
    }[];
    leg_pain: {
      description: string;
      side: string;
    }[];
  };
  biopsy_samples: {
    location: string;
    abbreviation: string;
    side: string;
    specimen_id: string;
  }[];
  documents: string[];
  pathologist_section: {
    final_microscopic_diagnosis: {
      normal: string;
      borderline: string;
      mild: string;
      moderate: string;
      severe: string;
    };
    samples: {
      location: string;
      abbreviation: string;
      side: string;
      specimen_id: string;
      diagnosis: string;
      canned_dx: string;
    }[];
    microscopic_examination: {
      location: string;
      abbreviation: string;
      side: string;
      specimen_id: string;
      diagnosis: string;
    }[];
    gross_description: {
      location: string;
      abbreviation: string;
      side: string;
      specimen_id: string;
      diagnosis: string;
    }[];
    comments: {
      location: string;
      abbreviation: string;
      side: string;
      specimen_id: string;
      comment: string;
    }[];
    biopsy_findings: {
      number_of_fibers: number;
      nerve_fiber_density: string;
      neuropathy_type: string;
    };
    notes: {
      text: string;
    }[];
  };
};

export interface ITest {
  _id: string;
  report_no: number;
  status: string;
  patient: {
    _id: string;
    address: string;
    name: string;
  };
  doctor: {
    _id: string;
    name: string;
  };
  apply_date: string;
  report_date: string;
  facility_location: {
    _id: string;
    name: string;
    address: string;
    id: string;
  };
  ordering_provider: string;
}