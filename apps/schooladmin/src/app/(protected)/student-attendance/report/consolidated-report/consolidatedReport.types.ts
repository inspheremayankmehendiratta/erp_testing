export interface ConsolidatedRow {
  id: number;
 class_section?: string;
  date?: string;
  total?: string | number;
  present?: string | number;
  absent?: string | number;
  leave?: string | number;
  sports?: string | number;
  medical?: string | number;
  status: string;
  active_users?: number;
}

export interface ConsolidatedFilters {
  class_section?: string;
  date?: string;
  total?: string | number;
  present?: string | number;
  absent?: string | number;
  leave?: string | number;
  sports?: string | number;
  medical?: string | number;
}
