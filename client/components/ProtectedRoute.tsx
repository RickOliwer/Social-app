import { useRouter } from "next/router";

const currentUser = false;

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  if (!currentUser) {
    if (router.asPath !== "login" && typeof window !== "undefined") {
      router.push("/login");
    }
  }

  return children;
};

export default ProtectedRoute;
