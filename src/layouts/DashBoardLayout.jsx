import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Dashboard Main Section */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md p-4 border-r">
          <h2 className="text-xl font-bold mb-6 text-gray-700">Dashboard</h2>
          <nav className="space-y-2">
            <NavLink
              to="/dashboard/add-marathon"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-blue-600 text-white rounded"
                  : "block px-4 py-2 hover:bg-blue-100 rounded"
              }
            >
              ➕ Add Marathon
            </NavLink>

            <NavLink
              to="/dashboard/my-marathons"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-blue-600 text-white rounded"
                  : "block px-4 py-2 hover:bg-blue-100 rounded"
              }
            >
              📋 My Marathon List
            </NavLink>

            <NavLink
              to="/dashboard/my-applies"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-blue-600 text-white rounded"
                  : "block px-4 py-2 hover:bg-blue-100 rounded"
              }
            >
              ✅ My Apply List
            </NavLink>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
