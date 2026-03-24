import type { ReactNode } from "react";
import MainLayout from "../MainLayout";
import ProtectedRoute from "../../components/common/auth/ProtectedRoute";

interface CommonBundlerProps {
  component: ReactNode;
  isProtected?: boolean;
  isLayoutRequired?: boolean;
}

export const commonBundler = ({
  component,
  isProtected = true,
  isLayoutRequired = true,
}: CommonBundlerProps) => {
  return isProtected ? (
    <ProtectedRoute>
      {isLayoutRequired ? <MainLayout>{component}</MainLayout> : component}
    </ProtectedRoute>
  ) : isLayoutRequired ? (
    <MainLayout>{component}</MainLayout>
  ) : (
    component
  );
};
