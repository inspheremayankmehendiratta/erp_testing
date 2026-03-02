import { ReactNode } from 'react';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ProtectedClient from './_partials/ProtectedClient';
import { authOptions } from '@/lib/authOptions';

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {

    const session = await getServerSession(authOptions);
    if (session == null) {
        redirect("/");
    }
    return (
        <ProtectedClient>{children}</ProtectedClient>
    );
};

export default ProtectedLayout;