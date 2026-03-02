export interface SchoolInfoPayload {
  basicInfo: any;
  address: any;
  contact: any;
  admin: any;
  security: any;
  subDomain: any;
}
export interface AllotmentsPayload {
  academicCMS: Record<string, boolean>;
  admission: Record<string, boolean>;
  fee: Record<string, boolean>;
  idCard: Record<string, boolean>;
  lessonPlanning: Record<string, boolean>;
  library: Record<string, boolean>;
  mailService: Record<string, boolean>;
  payroll: Record<string, boolean>;
}

