export interface OverallSummaryRow {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  active_users: number;
}

export interface OverallSummaryFilters {
  state?: string;
  name?: string;
}