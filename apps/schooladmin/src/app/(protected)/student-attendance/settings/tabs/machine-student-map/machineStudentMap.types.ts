export interface MachineStudent {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
}

export interface MachineStudentFilters {
  first_name?: string;
  email?: string;
  mobile?: string;
  role?: string;
  status?: string;
}
