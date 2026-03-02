import * as Yup from "yup";
export const step1ValidationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  mobile: Yup.number().required("Required"),
  email: Yup.string().required("Required"),
  gender: Yup.number().required("Required"),
  qualification: Yup.number().required("Required"),
  wing: Yup.number().required("Required"),
  designation: Yup.number().required("Required"),
  working_status: Yup.number().required("Required"),
  employment_type: Yup.number().required("Required"),
  department: Yup.number().required("Required"),
  teaching: Yup.number().required("Required"),
});
export const permissionValidationSchema = Yup.object({
  module: Yup.string().required("Module is required"),
  sub_module: Yup.string().required("Sub Module is required"),
});