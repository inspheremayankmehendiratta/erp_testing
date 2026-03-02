export interface SlcCertificate {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface SlcCertificatesFilters {
  classSection?: string;
  admissionNo?: string;
  status?: string;
  // keep other generic fields in case the table uses them
  state?: string;
  activeFrom?: string;
  activeTo?: string;
  name?: string;
  subscription?: string;
}

export interface SlcCertificatesFilters {
  state?: string;
  name?: string;
}