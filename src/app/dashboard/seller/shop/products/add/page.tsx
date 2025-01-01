import { auth, AuthSession } from "@/auth";
import CreateProductForm from "@/components/create-product-form";
import { redirect } from "next/navigation";

export default async function CreateShopPage() {
  const session = await auth();
  const role = (session as AuthSession).role;
  const email = session?.user?.email;

  if (!role || !email) {
    redirect("/sign-in");
  }
  
  const res = await fetch(
    `${process.env.BASE_URL}/api/shops?sellerEmail=${email}`,
    {
      cache: "no-cache",
    }
  );
  const shop = await res.json();

  return (
    <div className="container mx-auto py-4">
      <CreateProductForm role={role} shopName={shop.name} />
    </div>
  );
}
