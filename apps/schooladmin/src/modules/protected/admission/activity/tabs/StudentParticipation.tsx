'use client';

import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    Pagination,
    Paper,
    Popover,
    Stack,
    TablePagination,

    useTheme,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import {
    Eye,
    Filter,
    Pencil,
    Trash2,

} from 'lucide-react';
import * as Yup from 'yup';
import { MANAGE_USER } from '@/modules/shared/config/apiConfig';
import { useTableData } from '@/modules/shared/hooks/useTableData';


interface School {
    id: number;
    first_name: string;
    email: string;
    mobile: string;
    role: string;
    status: string;
    active_users: number;
}

interface ManageSchoolFilters {
    first_name?: string;
    role?: string;
    status?: string;
}



const StudentParticipation = ({ setActiveIndex }: any) => {


    return (
        <>StudentParticipation</>
    );
};

export default StudentParticipation;
