export default interface DoctorsType {
  doctorName: string;
  specialty: string;
  totalExperience?: string;
  isTelemedicine: boolean;
  photo: any;
  hospitals: HospitalsType[];
};

export interface HospitalsType {
  title: string;
  clinics: ClinicsType[];
}

export interface ClinicsType {
  name: string;
  schedule: DoctorScheduleSample[];
}

export interface DoctorScheduleSample {
  day: string;
  time: string[];
}