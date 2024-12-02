"use client";

import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerPage() {
  const router = useRouter();

  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error.message);
          return;
        }

        if (data?.user) {
          setRole(data.user.user_metadata.role);
        } else {
          setRole(undefined);
        }
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  if (role !== "seller") {
    router.push("/");
  }

  return (
    <div>
      <h3>Seller Dashboard</h3>
    </div>
  );
}
