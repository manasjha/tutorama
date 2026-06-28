import type { ReactNode } from "react";

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
};

export function Table<T>({ columns, rows, getRowKey }: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-soft text-sm">
          <thead className="bg-background text-left text-xs font-semibold uppercase text-text-muted">
            <tr>
              {columns.map((column) => (
                <th className="px-4 py-3" key={column.key} scope="col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td className="px-4 py-4 text-text-primary" key={column.key}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
