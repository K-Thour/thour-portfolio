import type { ReactNode } from "react";
import MainLayout from "../MainLayout";
import ProtectedRoute from "../../components/common/auth/ProtectedRoute";

export const commonBundler = (component: ReactNode) => {
  return (
    <ProtectedRoute>
      <MainLayout>{component}</MainLayout>
    </ProtectedRoute>
  );
};
