import type { LeadsHeaderProps } from "../types";

export function LeadsHeader(_props: LeadsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Client Leads Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Track inbound project inquiries, proposals, and consultation requests
        </p>
      </div>
    </div>
  );
}
