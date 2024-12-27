import { auth, AuthSession } from "@/auth";
import { redirect } from "next/navigation";
import SellerDashboardPage from "./seller/page";
import AdminDashboardPage from "./admin/page";
import BuyerDashboardPage from "./buyer/page";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const role = (session as AuthSession).role;

  switch (role) {
    case "admin":
      return <AdminDashboardPage />;
    case "seller":
      return <SellerDashboardPage />;
    case "buyer":
      return <BuyerDashboardPage />;
    default:
      redirect("/404");
  }
}
