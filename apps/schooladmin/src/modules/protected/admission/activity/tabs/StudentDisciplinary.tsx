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
    Typography,
    useTheme,
} from '@mui/material';

import { useSession } from "next-auth/react";
import {

    Eye,
    Filter,
    Pencil,
    Trash2,
} from 'lucide-react';


import { MANAGE_USER } from '@/modules/shared/config/apiConfig';
import { useTableData } from '@/modules/shared/hooks/useTableData';


import { ColumnDef } from '@/modules/shared/components/customtable/type';

import { Form, Formik } from 'formik';
import { APP_URL } from '@/modules/shared/config/constants';
import { CustomTable } from '@/modules/shared/components/customtable';
import { CustomDatePicker, CustomInput, CustomMultiSelect, CustomSelect } from '@/modules/shared/components/forms';
import { CustomModal } from '@/modules/shared/components/custommodal';
import { PageHeader } from '@/modules/shared/components/sectionhead';


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



const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Assign Holiday', path: '#' },
];

const StudentDisciplinary = () => {

    return (
        <>
            StudentDisciplinary
        </>
    );
};

export default StudentDisciplinary;
