import { formatStatusLabel, statusToneByValue } from "@/lib/constants/statuses";

import { Badge } from "./Badge";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge tone={statusToneByValue[status] ?? "neutral"}>
      {formatStatusLabel(status)}
    </Badge>
  );
}
