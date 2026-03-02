export interface DailyAttendanceSheetRow {
 id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface DailyAttendanceSheetFilters {
  state?: string;
  name?: string;
}
