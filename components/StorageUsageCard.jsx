"use client";

import { useEffect, useState } from "react";
import { getStorageUsage } from "@/services/storageService";

export default function StorageUsageCard({ expanded = false }) {
  const [storage, setStorage] = useState({
    usedGB: 2,
    limitGB: 5,
    documentCount: 0,
    folderCount: 0,
  });
  const [isLoading, setLoading] = useState(true);
  const percent = Math.round((storage.usedGB / storage.limitGB) * 100);

  useEffect(() => {
    let isMounted = true;

    getStorageUsage()
      .then((usage) => {
        if (isMounted) setStorage(usage);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <aside
      className={`rounded-[28px] border border-apple-hairline bg-white p-6 shadow-sm ${
        expanded ? "xl:col-span-3" : ""
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-apple-text">Lưu trữ đám mây</h2>
          <p className="text-sm text-apple-muted">
            {isLoading
              ? "Đang tải dung lượng..."
              : `Đã dùng ${storage.usedGB}GB / ${storage.limitGB}GB`}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EAF4FF] text-sm font-bold text-apple-primary">
          GB
        </div>
      </div>

      <div className="mb-3 flex justify-between text-sm">
        <span className="text-apple-muted">Dung lượng đã dùng</span>
        <span className="font-bold text-apple-text">{percent}%</span>
      </div>

      <div
        className="h-4 w-full overflow-hidden rounded-full bg-apple-secondary"
        role="progressbar"
        aria-label="Mức sử dụng lưu trữ đám mây"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full rounded-full bg-apple-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className={`mt-6 grid gap-3 ${expanded ? "sm:grid-cols-4" : "grid-cols-2"}`}>
        <StatCard label="Tài liệu" value={storage.documentCount} tone="sky" />
        <StatCard label="Thư mục" value={storage.folderCount} tone="indigo" />
        {expanded && (
          <>
            <StatCard label="Đã dùng" value={`${storage.usedGB}GB`} tone="slate" />
            <StatCard label="Còn trống" value={`${storage.limitGB - storage.usedGB}GB`} tone="emerald" />
          </>
        )}
      </div>

      <div className="mt-6 rounded-[28px] border border-dashed border-apple-hairline bg-apple-secondary p-5">
        <p className="text-sm font-bold text-apple-text">Công cụ lưu trữ sắp tới</p>
        <p className="mt-2 text-sm leading-6 text-apple-muted">
          Chi tiết sử dụng, dọn dẹp tệp, nâng cấp hạn mức và thống kê theo thư mục có
          thể được kết nối tại đây qua GET /api/storage/usage.
        </p>
      </div>
    </aside>
  );
}

function StatCard({ label, value, tone }) {
  const tones = {
    sky: "bg-[#EAF4FF] text-apple-primary",
    indigo: "bg-apple-secondary text-apple-text",
    slate: "bg-apple-secondary text-apple-text",
    emerald: "bg-[#EAF7EA] text-apple-success",
  };

  return (
    <div className={`rounded-2xl p-4 ${tones[tone]}`}>
      <p className="text-xs font-semibold opacity-75">{label}</p>
      <p className="mt-1 text-xl font-bold text-apple-text">{value}</p>
    </div>
  );
}
