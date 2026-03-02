import { useMemo } from "react";

export function usePagination<T>(
  data: T[],
  page: number,
  pageSize: number
) {
  return useMemo(() => {
    const start = page * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);
}
