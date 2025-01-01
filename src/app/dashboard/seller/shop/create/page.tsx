import { auth, AuthSession } from "@/auth";
import { CreateShopForm } from "@/components/create-shop-form";
import { redirect } from "next/navigation";

export default async function CreateShopPage() {
  const session = await auth();
  const role = (session as AuthSession).role;
  const email = session?.user?.email;
  if (!email) {
    redirect("/sign-in");
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create Your Shop</h1>
      <CreateShopForm email={email} role={role} />
    </div>
  );
}
