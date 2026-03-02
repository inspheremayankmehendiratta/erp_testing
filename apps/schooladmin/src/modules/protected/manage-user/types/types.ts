export interface StepFormRef {
  submitForm: () => void;
  validateForm: () => Promise<any>;
}
export interface BasicDetailValues {
  employee_no: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile:number
  email: string;
  gender: number;
  qualification: number;
  wing: number;
  designation: number;
  working_status: number;
  employment_type: number;
  department: number;
  teaching: number;
  photo: File | null;
  signature: File | null;
}
export interface AddressDetailValues {
  house_no: number;
  area: string;
  street: string;
  city: string;
  district:number
  landmark: string;
  nearest_police_station: string;
  pincode: number;
  state: number;
  phone1: number;
  phone2: number;
  route: number;
  stop: number;
}
export interface PersonalDetailValues {
  dob: string;
  experience: string;
  father_name: string;
  marital_status: string;
  dependants: string;
  religion: string;
  caste: string;
  blood_group: string;
  height: string;
  weight: string;
  id_mark: string;
  physical_disability: string;
  health_remark: string;
}
export interface EmployeePreviousValues {
  smart_card_id: string;
  old_employee_no: string;
  prev_designation: string;
  employer_remark: string;
  leave_remark: string;
  previous_details: string;
}
export interface PermissionFormValues {
  module: string;
  sub_module: string;
  class: string;
  section: string;
  subject: string;
  permission: string;
}