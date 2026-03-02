import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTableData } from '@/modules/shared/hooks/useTableData';
import { MANAGE_USER } from '@/modules/shared/config/apiConfig';
import { ManageSchoolFilters } from './leaves.types';

export const useLeavesLogic = () => {
  const { data: session } = useSession();
  const fileLabel = 'manage_user';
  const visibleColumnsCount = 4;

  const {
    data,
    loading,
    pagination,
    updateFilters,
    changePage,
    changeLimit,
    exportData,
  } = useTableData<ManageSchoolFilters>({
    url: MANAGE_USER,
    initialFilters: {},
    fileName: fileLabel,
    token: session?.accessToken,
    enabled: !!session?.accessToken,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filterValues, setFilterValues] = useState<ManageSchoolFilters>({});
  const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
  const [markAs, setMarkAs] = useState<HTMLElement | null>(null);

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

  const applyFilters = (values: ManageSchoolFilters) => {
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

  const handleOpenMark = (e: React.MouseEvent<HTMLElement>) => {
    setMarkAs(e.currentTarget);
  };

  const handleCloseMark = () => {
    setMarkAs(null);
  };

  const handleBulkAction = (type: 'approve' | 'reject') => {
    if (!selectedIds.length) return;
    if (type === 'approve') {
      console.log('Approved Rows →', selectedIds);
    }
    if (type === 'reject') {
      console.log('Rejected Rows →', selectedIds);
    }
    handleCloseMark();
  };

  return {
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

    showFilters,
    setShowFilters,

    markAs,
    handleOpenMark,
    handleCloseMark,
    handleBulkAction,

    visibleColumnsCount,
  };
};