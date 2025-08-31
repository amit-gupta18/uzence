import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey as keyof T];
      const valB = b[sortKey as keyof T];
      if (valA === valB) return 0;
      if (valA! < valB!) return sortOrder === "asc" ? -1 : 1;
      return sortOrder === "asc" ? 1 : -1;
    });
  }, [data, sortKey, sortOrder]);


  const toggleRowSelect = (row: T) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(row.id)) {
      newSelection.delete(row.id);
    } else {
      if (!selectable) return; 
      newSelection.add(row.id);
    }
    setSelectedRows(newSelection);
    onRowSelect?.(data.filter((d) => newSelection.has(d.id)));
  };

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.dataIndex) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.dataIndex as string);
      setSortOrder("asc");
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      {loading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : sortedData.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No data available</div>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {selectable && <th className="p-2"></th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-2 text-left cursor-pointer"
                  onClick={() => toggleSort(col)}
                >
                  {col.title}
                  {col.sortable && sortKey === col.dataIndex && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={row.id}
                className={`border-b hover:bg-gray-50 ${
                  selectedRows.has(row.id) ? "bg-blue-100" : ""
                }`}
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRowSelect(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
