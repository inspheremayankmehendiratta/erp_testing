export interface School {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface ManageSchoolFilters {
  state?: string;
  status?: string;
  activeFrom?: string;
  activeTo?: string;
  name?: string;
  subscription?: string;
}