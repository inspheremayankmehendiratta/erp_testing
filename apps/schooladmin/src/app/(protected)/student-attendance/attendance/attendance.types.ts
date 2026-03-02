export interface AttendanceRow {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface AttendanceFilters {
  state?: string;
  name?: string;
}
