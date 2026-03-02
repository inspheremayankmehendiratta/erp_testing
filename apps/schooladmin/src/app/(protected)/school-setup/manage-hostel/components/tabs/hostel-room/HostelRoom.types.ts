export interface School {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface HostelFilters {
  first_name?: string;
  email?: string;
  mobile?: string;
  role?: string;
  status?: string;
}