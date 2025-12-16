import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileSetupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile-setup/step-1");
  }, [router]);

  return null;
}