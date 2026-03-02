import { useEffect, useState, useCallback } from "react";
import { clientApi } from "@/lib/clientApi";
import { decrypt } from "@/lib/encryption";

export type ExportType = "pdf-download" | "pdf-preview" | "excel" | null;

interface UseTableOptions<TFilters> {
    url: string;
    method?: "GET" | "POST";
    initialFilters: TFilters;
    fileName: string
    token?: string;
    initialLimit?: number;
    enabled?: boolean;

}

export function useTableData<TFilters>({
    url,
    method = "POST",
    initialFilters,
    fileName,
    token,
    initialLimit = 10,
    enabled = true,
}: UseTableOptions<TFilters>) {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState<TFilters>(initialFilters);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: initialLimit,
        total: 0,
    });

    const fetchData = useCallback(
        async (exportType: ExportType = null) => {
            if (!enabled) return;
            if (!token) return;

            try {
                setLoading(true);
                
                const payload = {
                    ...filters,
                    page: pagination.page,
                    size: pagination.limit,
                    exportData: exportType == null ? undefined : exportType == 'excel' ? exportType  : 'pdf',
                };
                const response = await clientApi<any>({
                    url,
                    method,
                    payload,
                    token,
                    responseType: exportType === "excel" ? "blob" : "json",
                });

                /* ================= EXPORT MODE ================= */
                if (exportType === "excel") {
                    const blob = response as Blob;

                    const fileUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = fileUrl;
                    a.download = `${fileName}.xlsx`; // 👈 filename customize kar sakte ho
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(fileUrl);
                    a.remove();

                    return; // ❗ table update na ho
                }

                if (exportType === "pdf-download" || exportType === "pdf-preview") {
                    const decryptedData: any = decrypt(response.data);
                    const parsedData = JSON.parse(decryptedData);

                    // 👇 Hook sirf parsedData return karega
                    return parsedData;
                }



                /* ================= NORMAL TABLE MODE ================= */
                if (!exportType) {
                    if (response.status == 'success') {
                        const decryptedData: any = decrypt(response.data);
                        const parsedData = JSON.parse(decryptedData);
                        setData(parsedData);
                        setPagination((prev) => ({
                            ...prev,
                            total: Number(parsedData?.meta?.total_count ?? 0),
                        }));
                    } else {
                        console.log('aya yaa')
                        setData([]);
                    }
                }
            } finally {
                setLoading(false);
            }
        },
        [filters, pagination.page, pagination.limit, url, method, token]
    );

    useEffect(() => {
        if (!token) return;   // 👈 only guard needed
        fetchData();
    }, [filters, pagination.page, pagination.limit, token]);

    const updateFilters = (newFilters: Partial<TFilters>) => {
        setPagination((prev) => ({ ...prev, page: 1 }));
         setFilters({ ...newFilters } as TFilters);
    };

    const changePage = (page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const changeLimit = (limit: number) => {
        setPagination((prev) => ({ ...prev, limit, page: 1 }));
    };

    return {
        data,
        loading,
        pagination,
        updateFilters,
        changePage,
        changeLimit,
        exportData: fetchData,
    };
}
