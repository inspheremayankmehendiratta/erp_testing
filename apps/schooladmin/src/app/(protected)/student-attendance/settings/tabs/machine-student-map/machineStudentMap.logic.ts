import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTableData } from "@/modules/shared/hooks/useTableData";
import { MANAGE_USER } from "@/modules/shared/config/apiConfig";
import { MachineStudentFilters } from "./machineStudentMap.types";


export const useMachineStudentMapLogic = () => {
  const { data: session } = useSession();
  const fileLabel = "manage_user";
  const visibleColumnsCount = 4;

  const {
    data,
    loading,
    pagination,
    updateFilters,
    changePage,
    changeLimit,
    exportData,
  } = useTableData<MachineStudentFilters>({
    url: MANAGE_USER,
    initialFilters: {},
    fileName: fileLabel,
    token: session?.accessToken,
    enabled: !!session?.accessToken,
  });
  /* ================= Row Selection ================= */

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filterValues, setFilterValues] = useState<MachineStudentFilters>({
    first_name: '',
    email: '',
    mobile: '',
    role: '',
    status:'',

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

  const applyFilters = (values: MachineStudentFilters) => {
    setFilterValues(values);
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

  /* ================= PDF ================= */

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
    changePage,
    changeLimit,
    exportData,

    selectedIds,
    setSelectedIds,
    handleRowSelect,
    handleSelectAll,

    handlePdfDownload,
    handlePdfPreview,
  };
};