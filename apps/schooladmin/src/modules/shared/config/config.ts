
import { APP_URL } from "./constants";


export const APPIMAGES = {
  LOGO: `/images/logo/logo.svg`,
  LOGO_DARK: `/images/logo/logo-dark.svg`,
}
export const DRAWER_TYPE = "vertical";

export const CONSTANTS = {
  DRAWER_TYPE,
  DRAWER_WIDTH: DRAWER_TYPE === "vertical" ? 280 : 0,
  DRAWER_WIDTH_MINI: DRAWER_TYPE === "vertical" ? 64 : 0,
  REQUEST_FORMAT: 'application/json',
  RESPONSE_FORMAT: 'application/json',
  REQUEST_POST: 'POST',
  REQUEST_GET: 'GET',
  LANGUAGE_ENGLISH: 'en',
  SIGNATURE_KEY: 'QD32VdbRuMa0iI0q9q7cH6FIHGcNWGdEZOLyK669',
  HASHING_ALGORITHM: 'sha256',
  X_AUTHORIZATION_TOKEN: `${process.env.NEXT_PUBLIC_X_AUTH_TOKEN}`,
};

export const KEYS = {
  CONTENT_TYPE: "Content-Type",
  ACCEPT_TYPE: "Accept",
  ACCEPT_LANGUAGE: "accept-language",
  SIGNATURE: "Signature",
  TIMESTAMP: "timestamp",
  AUTHORIZATION: "Authorization",
  BEARER: "Bearer ",
  LANGUAGE: "Language",
  X_AUTHORIZATION_TOKEN: 'X-Authorization-Token'
};


export const NODES_TITLES = ['Human + AI Workflow', 'Generative Models', 'Creative Analytics', 'Adaptive Design', 'Asset Intelligence', 'Campaign Intelligence'];

export const schoolSetupTypes = [
  { id: "SCHOOL_SETUP", label: "School Setup" },
  { id: "ADMISSION", label: "Admission" },
  { id: "STUDENT_ATTENDANCE", label: "Student Attendance" },
  { id: "FEE", label: "Fee" },
  { id: "SMS", label: "SMS" },
  { id: "USER", label: "User" },
  { id: "WEB_CMS", label: "Web CMS" },
  { id: "WEB_MANAGER", label: "Web Manager" },
  { id: "ACADEMIC_CMS", label: "Academic CMS" },
  { id: "RESULT", label: "Result" },
  { id: "LIBRARY", label: "Library" },
  { id: "REGISTRATION", label: "Registration" },
  { id: "PAYROLL", label: "Payroll" },
  { id: "RECRUITMENT", label: "Recruitment" },
  { id: "STAFF_ATTENDANCE", label: "Staff Attendance" },
  { id: "LESSON_PLANNING", label: "Lesson Planning" },
  { id: "TICKETING", label: "Ticketing" },
  { id: "VISITOR_MANAGEMENT", label: "Visitor Management" },
  { id: "ID_CARD", label: "ID Card" },
  { id: "MAIL_SERVICE", label: "Mail Service" },
];

export const whatsAppAlertTypes = [
  { id: 0, label: "WhatsApp Templates", path: "/alerts/whatsapp/templates" },
  { id: 1, label: "School", path: "/alerts/whatsapp/school" },
  { id: 2, label: "Whatsspp Groups", path: "/alerts/whatsapp/groups" },
  { id: 3, label: "Logs", path: "/alerts/whatsapp/logs" },
  { id: 4, label: "Whatsapp Request", path: "/alerts/whatsapp/request" },
  { id: 5, label: "Settings", path: "/alerts/whatsapp/settings" },
];

export const TemplateCategory = [
  { label: 'Marketing', value: 0 },
  { label: 'Utility', value: 1 },
];
export const TemplateModule = [
  { label: 'None', value: 0 },
  { label: 'Text', value: 1 },
  { label: 'Image', value: 3 },
  { label: 'Video', value: 4 },
  { label: 'Document', value: 5 },
];
export const sectionOptions = [
  { label: "waypoints-min - JS(2)", value: "5068bb52-c69f-40dd-b342-95a20e9b2162" },
  { label: "bootstrap-min - JS(4)", value: "c21c4ea1-87e6-4994-ba62-847d72d07716" },
  { label: "jquery-min - JS(1)", value: "cf6ac3d0-75be-42f8-9a21-9110d760b148" },
  { label: "simple-line-icons - CSS(2)", value: "26ec0576-0f2f-436d-a00d-93b2dccfaaeb" },
  { label: "font-awesome - CSS(4)", value: "8aec2936-10d3-4ae4-a08d-12e898a7589a" },
  { label: "bootstrap - CSS(4)", value: "9772645c-2941-4cf7-b560-5723be95df25" },
  { label: "test - CSS(1)", value: "184a4387-1c33-4249-b470-47d0bd837727" },
  { label: "bootstrap - CSS(cus-1)", value: "23d6021d-9d95-4eac-8b95-f41c0cff69a8" },
  { label: "srikaya-main - JS(custom)", value: "2f79c109-2d3e-4e89-af76-2ca6b8b95e9b" },
  { label: "swiper-bundle.min - JS(8)", value: "f0d600c3-5742-4ea9-b704-c6052d9b2113" },
  { label: "isotope.pkgd.min - JS(3)", value: "ba6917eb-3af3-4258-8b22-e328062a544b" },
  { label: "glightbox.min - JS(glightbox.min)", value: "381eb640-cbba-4540-860a-23056e9abdfe" },
  { label: "bootstrap.bundle.min - JS(5)", value: "7e4d6962-9d71-4a31-a632-b723a95a5627" },
  { label: "Srikaya - CSS(custum-styles)", value: "6f88abb2-a8c1-40ce-a9bf-513220778a09" },
  { label: "swiper-bundle.min - CSS(8)", value: "c98440fa-636f-4612-abab-59b40e4664ef" },
  { label: "glightbox.min - CSS(glightbox.min)", value: "400139e8-391b-49ca-abed-cde5a9cbdb7f" },
  { label: "boxicons.min - CSS(1)", value: "0f86a033-3fb3-4d98-acf4-e9cfe6b385ed" },
  { label: "bootstrap-icons - CSS(1)", value: "f3222714-d721-450f-b6be-fb76eabd168d" },
  { label: "bootstrap.min - CSS(5)", value: "a292ec2b-5e89-4ef3-bae6-fad14d9bd7fb" },
  { label: "animate.min - CSS(4)", value: "91dff9fb-f87c-4e75-9218-858af1d52694" },
];



export const roleOptions = [
  { label: "Cricket Mantras", value: "Cricket Mantras" },
  { label: "BLACKBOX SCHOOL OF VISUAL EFFECTS", value: "BLACKBOX SCHOOL OF VISUAL EFFECTS" },
  { label: "REDWOODS GLOBAL SCHOOL", value: "REDWOODS GLOBAL SCHOOL" },
  { label: "HAAKIIA Islamic International Academy City Poonch", value: "HAAKIIA Islamic International Academy City Poonch" },
  { label: "PRARAMBHA SCHOOL", value: "PRARAMBHA SCHOOL" },
  { label: "DE INDIAN PUBLIC SCHOOL", value: "DE INDIAN PUBLIC SCHOOL" },
  { label: "QuickCampus School", value: "QuickCampus School" },
  { label: "GOOD SHEPHERD SCHOOL, KANGPOKPI", value: "GOOD SHEPHERD SCHOOL, KANGPOKPI" },
  { label: "Brainy N Bright Public School", value: "Brainy N Bright Public School" },
  { label: "NGF junior school", value: "NGF junior school" },
  { label: "modern public school", value: "modern public school" },
  { label: "birla vidya niketan", value: "birla vidya niketan" },
  { label: "AGDAV", value: "AGDAV" },
  { label: "Arvind Gupta D.A.V centenary public school", value: "Arvind Gupta D.A.V centenary public school" },
  { label: "Radiance Central School", value: "Radiance Central School" },
  { label: "Quicktouch Technologies Limited", value: "Quicktouch Technologies Limited" },
  { label: "KPS Unisoo", value: "KPS Unisoo" },
  { label: "Little Brainy Play School", value: "Little Brainy Play School" },
  { label: "MUSAEDATUN ACADEMY", value: "MUSAEDATUN ACADEMY" },
  { label: "Hari Vidya Bhawan", value: "Hari Vidya Bhawan" },
  { label: "Prestige Convent School", value: "Prestige Convent School" },
  { label: "QuickCampus QT Schools", value: "QuickCampus QT Schools" },
  { label: "For ERP Website Demo", value: "For ERP Website Demo" },
  { label: "Quick Campus Demo Public School", value: "Quick Campus Demo Public School" },
  { label: "DEMO PUBLIC SCHOOL", value: "DEMO PUBLIC SCHOOL" },
  { label: "Sachdeva Public School", value: "Sachdeva Public School" },
  { label: "Sachdeva Public School Rohini", value: "Sachdeva Public School Rohini" },
  { label: "Sachdeva Global School", value: "Sachdeva Global School" },
  { label: "ShreeRam World School", value: "ShreeRam World School" },
  { label: "Goodley Public School", value: "Goodley Public School" },
  { label: "Arvind Gupta DAV Centenary Public School", value: "Arvind Gupta DAV Centenary Public School" },
  { label: "Sanatan Dharam Public School Punjabi Bagh", value: "Sanatan Dharam Public School Punjabi Bagh" },
  { label: "Delhi Heritage School", value: "Delhi Heritage School" },
  { label: "NGF Saket", value: "NGF Saket" },
  { label: "Lead Well School", value: "Lead Well School" },
  { label: "SRDAV PUBLIC SCHOOL", value: "SRDAV PUBLIC SCHOOL" },
  { label: "Srikaya", value: "Srikaya" },
  { label: "D.C. Model Sr. Sec. School", value: "D.C. Model Sr. Sec. School" },
  { label: "JIJAMATA PUBLIC SCHOOL AND JR. COLLEGE, SONPETH", value: "JIJAMATA PUBLIC SCHOOL AND JR. COLLEGE, SONPETH" },
  { label: "BIGLOW'S PUBLIC SCHOOL", value: "BIGLOW'S PUBLIC SCHOOL" },
  { label: "PARTH PUBLIC SCHOOL", value: "PARTH PUBLIC SCHOOL" },
  { label: "BRIGHTWAYS INTERNATIONAL SCHOOL", value: "BRIGHTWAYS INTERNATIONAL SCHOOL" },
  { label: "PARTH PUBLIC SCHOOL(JR)", value: "PARTH PUBLIC SCHOOL(JR)" },
  { label: "ARYA MODEL SCHOOL", value: "ARYA MODEL SCHOOL" },
  { label: "ST. JOHN'S CO-ED SCHOOL", value: "ST. JOHN'S CO-ED SCHOOL" },
  { label: "Score Well International School", value: "Score Well International School" },
  { label: "MONTESSORIE CAMBRIDGE SCHOOL", value: "MONTESSORIE CAMBRIDGE SCHOOL" },
  { label: "PSGM ACADEMY KATKUT", value: "PSGM ACADEMY KATKUT" },
  { label: "City School of Educational Institute Pandhurna", value: "City School of Educational Institute Pandhurna" },
  { label: "Shree Dadaji Prominent School Satwas", value: "Shree Dadaji Prominent School Satwas" },
  { label: "SILVER BELLS ENGLISH MEDIUM SCHOOL", value: "SILVER BELLS ENGLISH MEDIUM SCHOOL" },
  { label: "Wonder Grow School", value: "Wonder Grow School" },
  { label: "Shri Sukhwasi Lal Inter College", value: "Shri Sukhwasi Lal Inter College" },
  { label: "SRI RABINDRANATH TAGORE PRIMARY SCHOOL", value: "SRI RABINDRANATH TAGORE PRIMARY SCHOOL" },
  { label: "RHEMA INTERNATIONAL SCHOOL", value: "RHEMA INTERNATIONAL SCHOOL" },
  { label: "St. Teresa school", value: "St. Teresa school" },
  { label: "Deocharan Mahto Public School", value: "Deocharan Mahto Public School" },
  { label: "GURUKUL ENGLISH SCHOOL", value: "GURUKUL ENGLISH SCHOOL" },
  { label: "NEW HIMALAYA EDUCATIONAL ACADEMY", value: "NEW HIMALAYA EDUCATIONAL ACADEMY" },
  { label: "Anant Gurukul School", value: "Anant Gurukul School" },
  { label: "Divine Global Academy", value: "Divine Global Academy" },
  { label: "Birla Vidya Niketan", value: "Birla Vidya Niketan" },
  { label: "NEW GREEN FIELD SCHOOL", value: "NEW GREEN FIELD SCHOOL" },
  { label: "N.G.F JUNIOR SCHOOL", value: "N.G.F JUNIOR SCHOOL" },
  { label: "St. Columbo Public School", value: "St. Columbo Public School" },
  { label: "Vivekanand Shiksha Kunj School", value: "Vivekanand Shiksha Kunj School" },
  { label: "Bhatnagar International School", value: "Bhatnagar International School" },
  { label: "RAM NARAYAN MEMORIAL SENIOR SECONDARY SCHOOL", value: "RAM NARAYAN MEMORIAL SENIOR SECONDARY SCHOOL" },
  { label: "Basudevpur Public School", value: "Basudevpur Public School" },
  { label: "SUNSHINE INTERNATIONAL SCHOOL", value: "SUNSHINE INTERNATIONAL SCHOOL" },
  { label: "SHREE RAM ABM DHUNDHARA", value: "SHREE RAM ABM DHUNDHARA" },
  { label: "Modern Public School", value: "Modern Public School" },
  { label: "SHREE JI WORLD SCHOOL", value: "SHREE JI WORLD SCHOOL" },
  { label: "Sant Sudhasagar International School", value: "Sant Sudhasagar International School" },
  { label: "Hansraj Model School", value: "Hansraj Model School" },
  { label: "My pride Sachdeva junior school", value: "My pride Sachdeva junior school" },
  { label: "Oxford Public School", value: "Oxford Public School" },
  { label: "SHAHEEN FOUNDATION CLASSES", value: "SHAHEEN FOUNDATION CLASSES" },
  { label: "UNACADEMY CENTER BHEL", value: "UNACADEMY CENTER BHEL" },
  { label: "New Olympic Higher Secondary School", value: "New Olympic Higher Secondary School" },
  { label: "Hayagreeva Vidhyalaya Matriculation Higher Secondary School", value: "Hayagreeva Vidhyalaya Matriculation Higher Secondary School" },
  { label: "JEEVAN JYOTI PUBLIC HIGH SCHOOL", value: "JEEVAN JYOTI PUBLIC HIGH SCHOOL" },
  { label: "Gyanoday Junior High School", value: "Gyanoday Junior High School" },
  { label: "PRINCE SCHOOL CHURU", value: "PRINCE SCHOOL CHURU" },
  { label: "BETTER FUTURE SACHDEVA JUNIOR SCHOOL", value: "BETTER FUTURE SACHDEVA JUNIOR SCHOOL" },
  { label: "NEW DIMENSION JUNIOR SCHOOL", value: "NEW DIMENSION JUNIOR SCHOOL" },
  { label: "MY STEPS JUNIOR SCHOOL", value: "MY STEPS JUNIOR SCHOOL" },
  { label: "ROTARY PUBLIC SCHOOL", value: "ROTARY PUBLIC SCHOOL" },
  { label: "MATA SHIV DEVI", value: "MATA SHIV DEVI" },
  { label: "TRI NAGAR PUBLIC SCHOOL", value: "TRI NAGAR PUBLIC SCHOOL" },
  { label: "NRK Public School Kanti", value: "NRK Public School Kanti" },
  { label: "SRI GAYATHRI SCHOOL", value: "SRI GAYATHRI SCHOOL" },
  { label: "NAVA CHAITANYA VIDYALAYA BYADGI", value: "NAVA CHAITANYA VIDYALAYA BYADGI" },
  { label: "Khunga Academy", value: "Khunga Academy" },
  { label: "Guru Nanak Public School", value: "Guru Nanak Public School" },
  { label: "Ummed Play Kids", value: "Ummed Play Kids" },
  { label: "RAZA COACHING INSTITUTE", value: "RAZA COACHING INSTITUTE" },
  { label: "Sri Gayathri School", value: "Sri Gayathri School" },
  { label: "The Nest International School", value: "The Nest International School" },
  { label: "DARBARI LAL D. A. V. MODEL SCHOOL", value: "DARBARI LAL D. A. V. MODEL SCHOOL" }
];
export const moduleOptions = [
  { "label": "ID Card", "value": "ID Card" },
  { "label": "School Setup", "value": "School Setup" },
  { "label": "Visitor Management", "value": "Visitor Management" },
  { "label": "Staff Attendance", "value": "Staff Attendance" },
  { "label": "Web Manager", "value": "Web Manager" },
  { "label": "SMS", "value": "SMS" },
  { "label": "Lesson Planning", "value": "Lesson Planning" },
  { "label": "Payroll", "value": "Payroll" },
  { "label": "Ticketing", "value": "Ticketing" },
  { "label": "Mail Service", "value": "Mail Service" },
  { "label": "Recruitment", "value": "Recruitment" },
  { "label": "Academic CMS", "value": "Academic CMS" },
  { "label": "Fee", "value": "Fee" },
  { "label": "Registration", "value": "Registration" },
  { "label": "Result", "value": "Result" },
  { "label": "Library", "value": "Library" },
  { "label": "Web CMS", "value": "Web CMS" },
  { "label": "Admission", "value": "Admission" },
  { "label": "User", "value": "User" },
  { "label": "Student Attendance", "value": "Student Attendance" }
];
export const subModuleName = [
  { "label": "Attendance", "value": "Attendance" },
  { "label": "Assign Holiday", "value": "Assign Holiday" },
  { "label": "Attendance Log", "value": "Attendance Log" },
  { "label": "Shift Setting", "value": "Shift Setting" },
  { "label": "Department Shift Assignment", "value": "Department Shift Assignment" },
  { "label": "Employee Shift Allotment", "value": "Employee Shift Allotment" },
  { "label": "Leave Type", "value": "Leave Type" },
  { "label": "Leave Name", "value": "Leave Name" },
  { "label": "Leave Structure", "value": "Leave Structure" },
  { "label": "Redmark Configuration", "value": "Redmark Configuration" },
  { "label": "Redmark Allotment", "value": "Redmark Allotment" },
  { "label": "Redmark Report", "value": "Redmark Report" },
  { "label": "Advance Leave", "value": "Advance Leave" },
  { "label": "Financial Session", "value": "Financial Session" },
  { "label": "Attendance Regularization", "value": "Attendance Regularization" },
  { "label": "Employee Attendance Consolidated Report", "value": "Employee Attendance Consolidated Report" },
  { "label": "Work From Home Request", "value": "Work From Home Request" },
  { "label": "Geofence Location", "value": "Geofence Location" },
  { "label": "Geofence Location Allotment", "value": "Geofence Location Allotment" },
  { "label": "Leave Summary Report", "value": "Leave Summary Report" },
  { "label": "Monthly Attendance Summary Report", "value": "Monthly Attendance Summary Report" },
  { "label": "Machine Id Allotment", "value": "Machine Id Allotment" },
  { "label": "Employee Details", "value": "Employee Details" }
]

export const ticketListName = [
  { "label": "Technical glich/bugs", "value": "Technical glich/bugs" },
  { "label": "Query", "value": "Query" },
  { "label": "Feedback", "value": "Feedback" },
  { "label": "Requirment/Chnages", "value": "Technical glich/bugs" },
]


export const multiClassFrom = [
  { label: "Play", value: "Play" },
  { label: "Nursery", value: "Nursery" },
  { label: "KG", value: "KG" },
  { label: "LKG", value: "LKG" },
  { label: "UKG", value: "UKG" },
  { label: "I", value: "I" },
  { label: "II", value: "II" },
  { label: "III", value: "III" },
  { label: "IV", value: "IV" },
  { label: "V", value: "V" },
  { label: "VI", value: "VI" },
  { label: "VII", value: "VII" },
  { label: "VIII", value: "VIII" },
  { label: "IX", value: "IX" },
  { label: "X", value: "X" },
  { label: "XI", value: "XI" },
  { label: "XII", value: "XII" }
];
export const multiClassTo = [
  { label: "Play", value: "Play" },
  { label: "Nursery", value: "Nursery" },
  { label: "KG", value: "KG" },
  { label: "LKG", value: "LKG" },
  { label: "UKG", value: "UKG" },
  { label: "I", value: "I" },
  { label: "II", value: "II" },
  { label: "III", value: "III" },
  { label: "IV", value: "IV" },
  { label: "V", value: "V" },
  { label: "VI", value: "VI" },
  { label: "VII", value: "VII" },
  { label: "VIII", value: "VIII" },
  { label: "IX", value: "IX" },
  { label: "X", value: "X" },
  { label: "XI", value: "XI" },
  { label: "XII", value: "XII" }
];


export const genderOptions = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 },
  { label: "Other", value: 2 },
];

export const qualificationOptions = [
  { label: "10th Pass", value: 0 },
  { label: "12th Pass", value: 1 },
  { label: "Graduate", value: 2 }
];
export const wingOptions = [
  { label: "Pre Primary", value: 0 },
  { label: "Primary", value: 1 },
  { label: "Middle", value: 2 },
  { label: "School", value: 3 },
  { label: "Secondary", value: 4 },
  { label: "Sr. Secondary", value: 5 }
];
export const designationOptions = [
  { label: "Post Graduate Teacher", value: 0 },
  { label: "Trained Graduate Teacher", value: 1 },
  { label: "Primary Teacher", value: 2 },
  { label: "Other", value: 3 },
];
export const workingStatusOptions = [
  { label: "On Duty", value: 0 },
  { label: "On Long Leave", value: 1 },
  { label: "Suspended", value: 2 },
  { label: "Retired", value: 3 },
  { label: "Discharged", value: 4 },
  { label: "Died", value: 5 },
  { label: "Time Over", value: 6 },
  { label: "Terminated", value: 7 },
  { label: "Left", value: 8 },
  { label: "Other", value: 9 },
];
export const employmentTypeOptions = [
  { label: "Permanent", value: 0 },
  { label: "Temporary", value: 1 },
  { label: "Probation", value: 2 },
  { label: "Adhoc", value: 3 },
  { label: "Consultant", value: 4 },
  { label: "Contractual", value: 5 },
  { label: "Other", value: 6 },
];
export const departmentOptions = [
  { label: "Accountant", value: 0 },
  { label: "Admin", value: 1 },
  { label: "IT Department", value: 2 },
  { label: "Other", value: 3 },
];
export const teachingOptions = [
  { label: "Yes", value: 0 },
  { label: "No", value: 1 },
];
export const stateOptions = [
  { label: "Andhra Pradesh", value: 1 },
  { label: "Arunachal Pradesh", value: 2 },
  { label: "Assam", value: 3 },
  { label: "Bihar", value: 4 },
  { label: "Chhattisgarh", value: 5 },
  { label: "Goa", value: 6 },
  { label: "Gujarat", value: 7 },
  { label: "Haryana", value: 8 },
  { label: "Himachal Pradesh", value: 9 },
  { label: "Jharkhand", value: 10 },
  { label: "Karnataka", value: 11 },
  { label: "Kerala", value: 12 },
  { label: "Madhya Pradesh", value: 13 },
  { label: "Maharashtra", value: 14 },
  { label: "Manipur", value: 15 },
  { label: "Meghalaya", value: 16 },
  { label: "Mizoram", value: 17 },
  { label: "Nagaland", value: 18 },
  { label: "Odisha", value: 19 },
  { label: "Punjab", value: 20 },
  { label: "Rajasthan", value: 21 },
  { label: "Sikkim", value: 22 },
  { label: "Tamil Nadu", value: 23 },
  { label: "Telangana", value: 24 },
  { label: "Tripura", value: 25 },
  { label: "Uttar Pradesh", value: 26 },
  { label: "Uttarakhand", value: 27 },
  { label: "West Bengal", value: 28 },
  { label: "Andaman and Nicobar Islands", value: 29 },
  { label: "Chandigarh", value: 30 },
  { label: "Dadra and Nagar Haveli and Daman and Diu", value: 31 },
  { label: "Delhi", value: 32 },
  { label: "Jammu and Kashmir", value: 33 },
  { label: "Ladakh", value: 34 },
  { label: "Lakshadweep", value: 35 },
  { label: "Puducherry", value: 36 }
];
export const routeOptions = [
  { label: "Route 1 - Main Campus to City Center", value: 1 },
  { label: "Route 2 - North Zone Pickup", value: 2 },
  { label: "Route 3 - East Residential Area", value: 3 },
  { label: "Route 4 - West Industrial Area", value: 4 },
  { label: "Route 5 - South Suburb Line", value: 5 },
  { label: "Route 6 - Ring Road Service", value: 6 },
  { label: "Route 7 - Express Highway Route", value: 7 },
  { label: "Route 8 - Old City Route", value: 8 },
  { label: "Route 9 - University Shuttle", value: 9 },
  { label: "Route 10 - Airport Connector", value: 10 }
];
export const stopOptions = [
  { label: "Central Bus Stand", value: 1 },
  { label: "Railway Station", value: 2 },
  { label: "City Mall", value: 3 },
  { label: "Green Park", value: 4 },
  { label: "Main Market", value: 5 },
  { label: "River Bridge", value: 6 },
  { label: "University Gate", value: 7 },
  { label: "Tech Park", value: 8 },
  { label: "Airport Terminal", value: 9 },
  { label: "Industrial Estate", value: 10 },
  { label: "Lake View Stop", value: 11 },
  { label: "City Hospital", value: 12 },
  { label: "Metro Station", value: 13 },
  { label: "Town Hall", value: 14 },
  { label: "Residential Block A", value: 15 }
];
export const experienceOptions = [
  { label: "Fresher", value: "fresher" },
  { label: "1 Year", value: "1" },
  { label: "2 Years", value: "2" },
  { label: "3 Years", value: "3" },
  { label: "4 Years", value: "4" },
  { label: "5 Years", value: "5" },
  { label: "6-10 Years", value: "6_10" },
  { label: "10+ Years", value: "10_plus" },
];
export const maritalStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
];
export const religionOptions = [
  { label: "Hindu", value: "hindu" },
  { label: "Muslim", value: "muslim" },
  { label: "Christian", value: "christian" },
  { label: "Sikh", value: "sikh" },
  { label: "Buddhist", value: "buddhist" },
  { label: "Jain", value: "jain" },
  { label: "Other", value: "other" },
];
export const casteOptions = [
  { label: "General", value: "general" },
  { label: "OBC", value: "obc" },
  { label: "SC", value: "sc" },
  { label: "ST", value: "st" },
  { label: "Other", value: "other" },
];
export const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];


export const subModuleOptions = [
  { label: "Admission", value: "admission" },
  { label: "Student List", value: "student_list" },
  { label: "Promotion", value: "promotion" },
];

export const classOptions = [
  { label: "Class 1", value: "1" },
  { label: "Class 2", value: "2" },
  { label: "Class 3", value: "3" },
];



export const subjectOptions = [
  { label: "Mathematics", value: "math" },
  { label: "Science", value: "science" },
  { label: "English", value: "english" },
];
export const cmsurls = [
  { id: 0, label: "Category", path: APP_URL.CMS_WEB_CATEGORY },
  { id: 1, label: "News", path: APP_URL.CMS_WEB_NEWS },
  { id: 2, label: "Events", path: APP_URL.CMS_WEB_EVENTS },
  { id: 3, label: "Circular", path: APP_URL.CMS_WEB_CIRCULAR },
  { id: 4, label: "Gallery", path: APP_URL.CMS_WEB_GALLERY },
  { id: 5, label: "Video Gallery", path: APP_URL.CMS_WEB_VIDEO },
  { id: 6, label: "Slider", path: APP_URL.CMS_WEB_SLIDER },
  { id: 7, label: "Publications", path: APP_URL.CMS_WEB_PUBLICATION },
  { id: 8, label: "Media Press", path: APP_URL.CMS_WEB_MEDIA },
  { id: 9, label: "Bulletin Board", path: APP_URL.BULLETIN_BOARD },
  { id: 10, label: "Thought Of The Day", path: APP_URL.CMS_WEB_THOUGHT },
  { id: 11, label: "Award & Achievement", path: APP_URL.AWARD_ACHIEVEMENT },
];
export const schoolOptions = [
  { label: 'Select School', value: '' },
  { label: 'School A', value: 'A' },
  { label: 'School B', value: 'B' },
];
