import type { ReactNode } from "react";
import MainLayout from "../MainLayout";
import ProtectedRoute from "../../components/common/auth/ProtectedRoute";

interface CommonBundlerProps {
  component: ReactNode;
  isProtected?: boolean;
}

export const commonBundler = ({
  component,
  isProtected = true,
}: CommonBundlerProps) => {
  return isProtected ? (
    <ProtectedRoute>
      <MainLayout>{component}</MainLayout>
    </ProtectedRoute>
  ) : (
    <MainLayout>{component}</MainLayout>
  );
};
