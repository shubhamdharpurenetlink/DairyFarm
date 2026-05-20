"use client";

import { useMemo, useState, type Key } from "react";
import { Card, Input, Table, type TableProps } from "antd";
import { Search } from "lucide-react";

interface Props<T> extends Omit<TableProps<T>, "dataSource" | "rowKey"> {
  data: T[];
  rowKey: keyof T & string;
  searchableFields?: (keyof T)[];
  searchPlaceholder?: string;
  toolbar?: React.ReactNode;
  empty?: React.ReactNode;
}

export default function DataTable<T extends object>({
  data,
  rowKey,
  searchableFields,
  searchPlaceholder = "Search...",
  toolbar,
  empty,
  ...rest
}: Props<T>) {
  const [q, setQ] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    if (!q.trim() || !searchableFields?.length) return data;
    const term = q.toLowerCase();
    return data.filter((row) =>
      searchableFields.some((field) => {
        const v = (row as Record<string, unknown>)[field as string];
        if (v == null) return false;
        if (typeof v === "string") return v.toLowerCase().includes(term);
        if (typeof v === "object") return JSON.stringify(v).toLowerCase().includes(term);
        return String(v).toLowerCase().includes(term);
      }),
    );
  }, [data, q, searchableFields]);

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <div style={{ padding: 16, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {searchableFields?.length ? (
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            prefix={<Search size={14} />}
            placeholder={searchPlaceholder}
            allowClear
            style={{ maxWidth: 320 }}
          />
        ) : null}
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>{toolbar}</div>
      </div>
      <Table<T>
        dataSource={filtered}
        rowKey={(row) => (row as Record<string, unknown>)[rowKey as string] as Key}
        pagination={{
          pageSize,
          showSizeChanger: true,
          onShowSizeChange: (_c, size) => setPageSize(size),
          showTotal: (total) => `${total} items`,
        }}
        scroll={{ x: "max-content" }}
        locale={{ emptyText: empty ?? "No data" }}
        {...rest}
      />
    </Card>
  );
}
