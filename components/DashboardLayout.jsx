"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, activeSection, onSectionChange }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen bg-apple-secondary">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-apple-hairline bg-apple-nav/95 px-5 py-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-[#EAF4FF] font-bold text-apple-primary">
            CL
          </div>
          <span className="font-bold text-apple-text">CloudLearn</span>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen((value) => !value)}
          className="rounded-full border border-apple-hairline bg-white px-4 py-2 text-sm font-semibold text-apple-text transition hover:bg-apple-secondary focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2"
          aria-expanded={isSidebarOpen}
          aria-controls="account-sidebar"
        >
          Menu
        </button>
      </header>

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          activeSection={activeSection}
          onNavigate={(section) => {
            onSectionChange(section);
            setSidebarOpen(false);
          }}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-5 md:p-8">{children}</main>
      </div>
    </section>
  );
}
