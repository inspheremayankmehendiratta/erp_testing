import {

  CalendarDays,
  BookOpen,
  Building2,
  Briefcase,
  GraduationCap,
  Home,
  Bus,
  Store,
  MessageSquare,
  UserCog,
  NotebookText,
  LayoutDashboard, School, FileText, Upload, Users, Globe, LayoutTemplate, Bell, ClipboardList, MessageCircle, Smartphone, Table, BadgeCheck, CreditCard, Settings, Palette, Layers, Database, GitBranch, ShieldCheck,

  Boxes,
  MonitorCog,
  ClipboardCheck,
  CalendarPlus,
  UserCheck,
  FileBarChart2,
  IndianRupee,
  AlertCircle,
  BanknoteX,
  MessagesSquare,
  Send,
  Activity,
  Edit,
  BarChart3,
  ListChecks,
  Shuffle,
  Award,
  FileMinus,
  UserPlus,
  BookOpenCheck,
  DollarSign,


} from "lucide-react";

import { APP_URL } from './config/constants';

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
    path: APP_URL.DASHBOARD,
  },
  {
    id: 'manage-user',
    label: 'Manage User',
    icon: <UserCog size={18} />,
    path: APP_URL.MANAGE_USER,
  },
  {
    id: 'manage-fee',
    label: 'Manage Fee',
    icon: <IndianRupee size={18} />,
    children: [
      {
        id: 'fee-group-structuring',
        label: 'Fee Group Structuring',
        icon: <Layers size={16} />,
        path: APP_URL.MANAGE_FEE_FEE_GROUP_STRUCTURING,
      },
      {
        id: 'fee-concession',
        label: 'Fee Concession',
        icon: <Layers size={16} />,
        path: APP_URL.MANAGE_FEE_FEE_CONCESSION,
      },
    ],
  },
  {
    id: 'student-attendance',
    label: 'Student Attendance',
    icon: <ClipboardList size={18} />,
    children: [
      {
        id: 'attendance',
        label: 'Attendance',
        icon: <ClipboardList size={16} />,
        path: APP_URL.STUDENT_ATTENDANCE_ATTENDANCE,
      },
      {
        id: 'assign-holiday',
        label: 'Assign Holiday',
        icon: <CalendarPlus size={16} />,
        path: APP_URL.STUDENT_ATTENDANCE_ASSIGN_HOLIDAY,
      },
      {
        id: 'leaves',
        label: 'Leaves',
        icon: <FileMinus size={16} />,
        path: APP_URL.STUDENT_ATTENDANCE_LEAVES,
      },
      {
        id: 'report',
        label: 'Report',
        icon: <BarChart3 size={16} />,
        path: APP_URL.STUDENT_ATTENDANCE_REPORT,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings size={16} />,
        path: APP_URL.STUDENT_ATTENDANCE_SETTINGS,
      },
    ],
  },
  {
    id: 'admission',
    label: 'Admission',
    icon: <Users size={18} />,
    children: [
      {
        id: 'student-info',
        label: 'Student Info',
        icon: <UserPlus size={16} />,
        path: APP_URL.ADMISSION_STUDENT_INFO_LIST,
      },
      {
        id: 'student-doc-import',
        label: 'Student Doc Import',
        icon: <Upload size={16} />,
        path: APP_URL.ADMISSION_STUDENT_DOC_IMPORT,
      },
      {
        id: 'slc-certificates',
        label: 'SLC Certificates',
        icon: <Award size={16} />,
        path: APP_URL.ADMISSION_SLC_CERTIFICATES,
      },
      // {
      //   id: 'struckoff-withdrawal',
      //   label: 'Struckoff Withdrawal',
      //   icon: <FileMinus size={16} />,
      //   path: APP_URL.ADMISSION_STRUCKOFF_WITHDRAWAL,
      // },
      {
        id: 'field-wise-modify',
        label: 'Field Wise Modify',
        icon: <Edit size={16} />,
        path: APP_URL.ADMISSION_FIELD_WISE_MODIFY,
      },
      // {
      //   id: 'student-official-multi',
      //   label: 'Student Official Multi',
      //   icon: <FileText size={16} />,
      //   path: APP_URL.ADMISSION_STUDENT_OFFICIAL_MULTI,
      // },
      {
        id: 'rollno-allotment',
        label: 'Roll No Allotment',
        icon: <ListChecks size={16} />,
        path: APP_URL.ADMISSION_ROLLNO_ALLOTMENT,
      },
      {
        id: 'activity',
        label: 'Activity',
        icon: <Activity size={16} />,
        path: APP_URL.ADMISSION_ACTIVITY,
      },
      // {
      //   id: 'student-subject-map',
      //   label: 'Student Subject Map',
      //   icon: <BookOpenCheck size={16} />,
      //   path: APP_URL.ADMISSION_STUDENT_SUBJECT_MAP,
      // },
      // {
      //   id: 'shuffle-classes',
      //   label: 'Shuffle Classes',
      //   icon: <Shuffle size={16} />,
      //   path: APP_URL.ADMISSION_SHUFFLE_CLASSES,
      // },
      {
        id: 'reports',
        label: 'Reports',
        icon: <BarChart3 size={16} />,
        path: APP_URL.ADMISSION_REPORTS,
      },


    ],
  },

  {
    id: 'all-cms',
    label: 'All CMS',
    icon: <FileText size={18} />,
    children: [
      {
        id: 'web-cms',
        label: 'Web CMS',
        icon: <Globe size={16} />,
        path: APP_URL.CMS_WEB,
      },
      {
        id: 'academic-cms',
        label: 'Academic CMS',
        icon: <GraduationCap size={16} />,
        path: APP_URL.CMS_ACADEMIC_CMS,
      },
      {
        id: 'web-manager',
        label: 'Web Manager',
        icon: <MonitorCog size={16} />,
        path: APP_URL.CMS_WEB_MANAGER,
      },
      {
        id: 'template-manager',
        label: 'Template Manager',
        icon: <LayoutTemplate size={16} />,
        path: APP_URL.CMS_TEMPLATE_MANAGER,
      },
    ],
  },
  {
    id: 'school-setup',
    label: 'School Setup',
    icon: <Building2 size={18} />,
    children: [

      {
        id: 'academic-session',
        label: 'Academic Session',
        icon: <CalendarDays size={16} />,
        path: APP_URL.SCHOOL_SETUP_ACADEMIC_SESSION,
      },

      {
        id: 'class-section',
        label: 'Class Section',
        icon: <Layers size={16} />,
        path: APP_URL.SCHOOL_SETUP_CLASS_SECTION,
      },

      {
        id: 'manage-subject',
        label: 'Manage Subject',
        icon: <BookOpen size={16} />,
        path: APP_URL.SCHOOL_SETUP_MANAGE_SUBJECT,
      },
      {
        id: 'manage-group',
        label: 'Manage Group',
        icon: <Users size={16} />,
        path: APP_URL.SCHOOL_SETUP_MANAGE_GROUP,
      },
      {
        id: 'manage-hostel',
        label: 'Manage Hostel',
        icon: <Home size={16} />,
        path: APP_URL.SCHOOL_SETUP_MANAGE_HOSTEL,
      },

      {
        id: 'manage-houses',
        label: 'Manage Houses',
        icon: <Home size={16} />,
        path: APP_URL.SCHOOL_SETUP_MANAGE_HOUSES,
      },

      {
        id: 'banks-branches',
        label: 'Banks & Branches',
        icon: <Building2 size={16} />,
        path: APP_URL.SCHOOL_SETUP_BANK_BRANCHES,
      },
      {
        id: 'transportation',
        label: 'Transportation',
        icon: <Bus size={16} />,
        path: APP_URL.SCHOOL_SETUP_TRANSPORTATION,
      },

      {
        id: 'leave-remarks',
        label: 'Leave Remarks',
        icon: <ClipboardList size={16} />,
        path: APP_URL.SCHOOL_SETUP_LEAVE_REMARKS,
      },

      {
        id: 'admission-no-format',
        label: 'Admission No Format',
        icon: <NotebookText size={16} />,
        path: APP_URL.SCHOOL_SETUP_ADMINISTON,
      },

      {
        id: 'manage-designation',
        label: 'Manage Designation',
        icon: <GraduationCap size={16} />,
        path: APP_URL.SCHOOL_SETUP_MANAGE_DESIGNATION,
      },
      {
        id: 'dashboard-running-note',
        label: 'Dashboard Running Note',
        icon: <NotebookText size={16} />,
        path: APP_URL.SCHOOL_SETUP_DASHBOARD_RUNNING_NOTE,
      },

    ],
  },
];
