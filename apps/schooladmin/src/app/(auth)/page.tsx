import { redirect } from "next/navigation";
import {getServerSession } from "next-auth";
import Login from "./_partials/Login";
import { authOptions } from "@/lib/authOptions";
import { APP_URL } from "@/modules/shared/config/constants";


const LoginPage = async () => {

  const session = await getServerSession(authOptions);
  if (session) {
    redirect(APP_URL.DASHBOARD);
  }

  return (
    <Login/>
  );
};

export default LoginPage;