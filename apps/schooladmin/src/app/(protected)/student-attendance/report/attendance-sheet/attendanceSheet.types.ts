export interface AttendanceSheetRow {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface AttendanceSheetFilters {
  state?: string;
  name?: string;
}
