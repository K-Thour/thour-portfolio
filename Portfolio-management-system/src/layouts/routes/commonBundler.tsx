import type { ReactNode } from "react";
import MainLayout from "../MainLayout";
import ProtectedRoute from "../../components/common/auth/ProtectedRoute";
import PublicLayout from "../PublicLayout";

interface CommonBundlerProps {
  component: ReactNode;
  isProtected?: boolean;
  isLayoutRequired?: boolean;
  isPublic?: boolean;
}

export const commonBundler = ({
  component,
  isProtected = true,
  isLayoutRequired = true,
  isPublic = false,
}: CommonBundlerProps) => {
  if (isPublic) {
    return isProtected ? (
      <ProtectedRoute>
        {isLayoutRequired ? (
          <PublicLayout>{component}</PublicLayout>
        ) : (
          component
        )}
      </ProtectedRoute>
    ) : isLayoutRequired ? (
      <PublicLayout>{component}</PublicLayout>
    ) : (
      component
    );
  }
  return isProtected ? (
    <ProtectedRoute>
      {isLayoutRequired ? <MainLayout>{component}</MainLayout> : component}
    </ProtectedRoute>
  ) : isLayoutRequired && !isPublic ? (
    <MainLayout>{component}</MainLayout>
  ) : (
    component
  );
};
