export interface AttendanceSummaryRow {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface AttendanceSummaryFilters {
  state?: string;
  name?: string;
}
