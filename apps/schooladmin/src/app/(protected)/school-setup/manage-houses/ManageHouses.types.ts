export interface School {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface ManageHousesFilters {
  first_name?: string;
  email?: string;
  mobile?: string;
  role?: string;
  status?: string;
}