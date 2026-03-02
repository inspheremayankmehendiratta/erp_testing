'use client';

import { pdf } from '@react-pdf/renderer';
import { ManageSchoolTable } from '@/modules/shared/pdf/ManageSchoolTable';

interface GeneratePdfOptions {
    columns: string[];
    rows: Record<string, any>[];
    mode: 'download' | 'preview';
    fileName: string
}

export const generatePdf = async ({
    columns,
    rows,
    mode,
    fileName
}: GeneratePdfOptions) => {
    const blob = await pdf(
        <ManageSchoolTable columns={columns} rows={rows} />
    ).toBlob();

    const fileUrl = URL.createObjectURL(blob);

    if (mode === 'download') {
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = `${fileName}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    if (mode === 'preview') {
        window.open(fileUrl, '_blank');
    }

    URL.revokeObjectURL(fileUrl);
}