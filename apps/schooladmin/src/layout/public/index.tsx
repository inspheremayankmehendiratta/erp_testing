'use client';
import { ReactNode } from 'react';
const PublicLayout = ({ children }: { children: ReactNode }) => {
    return <div>PublicLayout
        {children}
    </div>
}
export default PublicLayout;