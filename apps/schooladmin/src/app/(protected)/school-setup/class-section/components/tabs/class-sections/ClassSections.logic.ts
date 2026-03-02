import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTableData } from '@/modules/shared/hooks/useTableData';
import { MANAGE_USER } from '@/modules/shared/config/apiConfig';
import { ClassSectionsFilters } from './ClassSections.types';



// placeholder API constant; replace with real endpoint when available
export const MANAGE_FEE_GROUPS = `${MANAGE_USER}`; // reusing user endpoint temporarily

export const useClassSectionsLogic = () => {
  const { data: session } = useSession();
  const fileLabel = 'fee_group';
  const visibleColumnsCount = 4;

  const {
    data,
    loading,
    pagination,
    updateFilters,
    changePage,
    changeLimit,
    exportData,
  } = useTableData<ClassSectionsFilters>({
    url:  MANAGE_USER,
    initialFilters: {},
    fileName: fileLabel,
    token: session?.accessToken,
    enabled: !!session?.accessToken,
  });

  /* ================= Row selection ================= */
  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [filterValues, setFilterValues] =
    useState<ClassSectionsFilters>({
      first_name: '',
      email: '',
      mobile: '',
      role: '',
      status: '',
    });

  const removeEmpty = <T extends Record<string, any>>(obj: T): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) =>
          value !== '' &&
          value !== null &&
          value !== undefined
      )
    ) as Partial<T>;
  };

  const applyFilters = (values: ClassSectionsFilters) => {
    setFilterValues(values);
    updateFilters(removeEmpty(values));
  };

  const handleRowSelect = (id: number | string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (ids: (number | string)[], checked: boolean) => {
    setSelectedIds(checked ? ids : []);
  };

  /* ============== pdf helpers ============= */
  const handlePdfDownload = async () => {
    const response = await exportData('pdf-download');
    const rows = response?.userList ?? [];
    const { generatePdf } = await import('@/lib/generatePdf');
    await generatePdf({
      columns: Object.keys(rows[0] || {}),
      rows,
      mode: 'download',
      fileName: fileLabel,
    });
  };

  const handlePdfPreview = async () => {
    const response = await exportData('pdf-preview');
    const rows = response?.userList ?? [];
    const { generatePdf } = await import('@/lib/generatePdf');
    await generatePdf({
      columns: Object.keys(rows[0] || {}),
      rows,
      mode: 'preview',
      fileName: fileLabel,
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
    handleRowSelect,
    handleSelectAll,

    handlePdfDownload,
    handlePdfPreview,
  };
};
