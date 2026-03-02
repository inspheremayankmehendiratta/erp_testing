
'use client';



import { CustomCard } from "@/modules/shared/components/customcard";
import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";
import { cmsurls } from "@/modules/shared/config/config";
import { APP_URL } from "@/modules/shared/config/constants";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AttendanceImport } from "./tabs/attendance-import/attendanceImport";
import { AttendanceMachine } from "./tabs/attendance-machine";
import { MachineStudentMap } from "./tabs/machine-student-map/MachinestudentMap";

const tabs = [
  'Attendance Machine',
  'Machine Student Map',
  'Attendance Import',
];
const Settings = () => {

  const pathname = usePathname();
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAlertType = cmsurls.find((type) =>
    pathname.includes(type.path)
  );
  const activeLabel = activeAlertType?.label || "";

  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Student Attendance', path: '#' },
    { label: activeLabel, path: '#' },
  ];
  return (
    <>
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title={tabs[activeIndex]}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 3 }} mt={2.1}>

        {/* LEFT SIDEBAR */}
        <CustomCard styles={{ marginTop: 0, padding: 0 }}>
          <List sx={{ py: 0 }}>
            {tabs.map((type: string, index: number) => {
              const isActive = activeIndex === index;

              return (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    position: "relative",
                    cursor: "pointer",

                    bgcolor: isActive
                      ? theme.palette.primary.main
                      : "transparent",

                    color: isActive ? "#fff" : "inherit",

                    "&:hover": {
                      bgcolor: isActive
                        ? theme.palette.primary.main
                        : theme.palette.action.hover,
                    },

                    "&:first-child": {
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    },
                    "&:last-child": {
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    },
                  }}
                >
                  <Box sx={{ padding: "8px 16px", width: "100%" }}>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          {type.toUpperCase()}
                        </Typography>
                      }
                    />
                  </Box>
                </ListItem>
              );
            })}


          </List>
        </CustomCard>

        {/* RIGHT CONTENT */}
     {activeIndex === 0 && <AttendanceMachine />}
     {activeIndex === 1 && <MachineStudentMap />}
     {activeIndex === 2 && <AttendanceImport />}
        
      </Box></>
  );
};

export default Settings;