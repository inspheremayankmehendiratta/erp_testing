import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTableData } from "@/modules/shared/hooks/useTableData";
import { MANAGE_USER } from "@/modules/shared/config/apiConfig";
import { AttendanceSummaryFilters } from "./attendanceSummary.types";

export const useAttendanceSummaryLogic = () => {
  const { data: session } = useSession();
  const fileLabel = "manage_user";
  const visibleColumnsCount = 4;
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const {
    data,
    loading,
    pagination,
    updateFilters,
    changePage,
    changeLimit,
    exportData,
  } = useTableData<AttendanceSummaryFilters>({
    url: MANAGE_USER,
    initialFilters: {},
    fileName: fileLabel,
    token: session?.accessToken,
    enabled: !!session?.accessToken && isFilterApplied,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filterValues, setFilterValues] = useState<AttendanceSummaryFilters>({
    state: '',
    name: '',
  });

  const removeEmpty = <T extends Record<string, any>>(
    obj: T
  ): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) =>
          value !== '' &&
          value !== null &&
          value !== undefined
      )
    ) as Partial<T>;
  };

  const applyFilters = (values: AttendanceSummaryFilters) => {
    setFilterValues(values);
    setIsFilterApplied(true);
    updateFilters(removeEmpty(values));
  };

  const resetFilters = (values: AttendanceSummaryFilters) => {
    setFilterValues(values);
    setIsFilterApplied(false);
    updateFilters(removeEmpty(values));
  };

  const handleRowSelect = (id: number | string) => {
    setSelectedIds((prev) =>
      prev.includes(id as number)
        ? prev.filter((x) => x !== id)
        : [...prev, id as number]
    );
  };

  const handleSelectAll = (ids: (number | string)[], checked: boolean) => {
    setSelectedIds(checked ? (ids as number[]) : []);
  };

  const handlePdfDownload = async () => {
    const response = await exportData("pdf-download");
    const rows = response?.userList ?? [];
    const { generatePdf } = await import('@/lib/generatePdf');
    await generatePdf({
      columns: Object.keys(rows[0] || {}),
      rows,
      mode: "download",
      fileName: fileLabel
    });
  };

  const handlePdfPreview = async () => {
    const response = await exportData("pdf-preview");
    const rows = response?.userList ?? [];
    const { generatePdf } = await import('@/lib/generatePdf');
    await generatePdf({
      columns: Object.keys(rows[0] || {}),
      rows,
      mode: "preview",
      fileName: fileLabel
    });
  };

  return {
    fileLabel,
    visibleColumnsCount,

    data,
    loading,
    pagination,
    filterValues,
    applyFilters,
    resetFilters,
    isFilterApplied,

    changePage,
    changeLimit,
    exportData,

    selectedIds,
    handleRowSelect,
    handleSelectAll,

    handlePdfDownload,
    handlePdfPreview,
  };
};
