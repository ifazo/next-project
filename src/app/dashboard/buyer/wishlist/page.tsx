import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { Wishlist } from "@prisma/client";
import WishlistProduct from "@/components/wishlist-product";

export default async function BuyerWishlistPage () {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/sign-in");
  }
  const res = await fetch(
    `${process.env.BASE_URL}/api/wishlist?userEmail=${email}`,
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  
  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-bold mb-6">Wishlist Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((data: Wishlist) => (
          <WishlistProduct key={data.id} id={data.id} productId={data.productId} email={email} />
        ))}
      </div>
    </div>
  );
}
