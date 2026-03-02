'use client';

import { useRef, useState } from 'react';
import { SchoolInfoPayload } from '../../types/type';
import SchoolBasicInfos from './forms/SchoolBasicInfos';
import SubDomain from './forms/SubDomain';
import { toast } from 'react-toastify';
import { Save, X } from 'lucide-react';
import { Box } from '@mui/material';
import { CustomAccordian } from '@/modules/shared/components/customaccordian';
import ActionButton from '@/modules/shared/ActionButton';


const ParentInfo = ({ setActiveIndex }: any) => {
    const [expanded, setExpanded] = useState<string | false>('schoolBasic');

    const [schoolInfo, setSchoolInfo] = useState<SchoolInfoPayload>({
        basicInfo: {},
        address: {},
        contact: {},
        admin: {},
        security: {},
        subDomain: {},
    });

    // Formik refs
    const basicRef = useRef<any>(null);
    const addressRef = useRef<any>(null);
    const contactRef = useRef<any>(null);
    const adminRef = useRef<any>(null);
    const securityRef = useRef<any>(null);
    const subDomainRef = useRef<any>(null);

    const handleSaveNext = () => {
        if (!sectionValidity.schoolBasic) {
            toast.error('Please complete required sections.');
            return;
        }

        // Api response
        const response = [
            {
                basicInfo: schoolInfo.basicInfo,
            },
            {
                subDomain: schoolInfo.subDomain,
            },
        ];

        console.log('API RESPONSE', response);

        toast.success('Record saved successfully');

        setActiveIndex(3);
    };

    const handleChange = (panel: string) => () => {
        setExpanded(expanded === panel ? false : panel);
    };

    const [sectionValidity, setSectionValidity] = useState({
        schoolBasic: false,
    });
    return (
        <>
            <CustomAccordian
                title="Parent Details"
                expanded={expanded === 'schoolBasic'}
                onChange={handleChange('schoolBasic')}
            >
                <SchoolBasicInfos
                    onSectionChange={(data: any, isValid: boolean) => {
                        setSchoolInfo(prev => ({ ...prev, basicInfo: data }));
                        setSectionValidity(prev => ({
                            ...prev,
                            schoolBasic: isValid,
                        }));
                    }}
                />
            </CustomAccordian>
            <CustomAccordian
                title="Guardian Details"
                expanded={expanded === 'website'}
                onChange={handleChange('website')}
                disabled={!sectionValidity.schoolBasic} // Disabled until first valid
            >
                <SubDomain
                    onSectionChange={(data: any) => {
                        setSchoolInfo(prev => ({
                            ...prev,
                            subDomain: data,
                        }));
                    }}
                />
            </CustomAccordian>

            <Box
                display="flex"
                justifyContent="flex-end"
                gap={1}
                flexWrap="wrap"
                mt={2}
            >

                {/* Cancel */}
                <ActionButton
                    label="Cancel"
                    variant="outlined"
                    icon={<X size={16} />}
                // clickHandler={() => setShowForm(false)}
                />



                {/* Save & Next → submits form */}
                <ActionButton
                    label="Save & Next"
                    type="submit"
                    variant="contained"
                    icon={<Save size={16} />}
                    clickHandler={handleSaveNext}
                />
            </Box>
        </>
    );
};

export default ParentInfo;
