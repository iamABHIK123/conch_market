import React, { useState } from "react";
import OrderBarGraph from "./adminPages/OrderBarGraph";
import Orders from "./adminPages/Orders";
import Products from "./adminPages/Products";
import Users from "./adminPages/Users";
import Categories from "./adminPages/Categories";
import Reports from "./adminPages/Reports";
import Settings from "./adminPages/Settings";
import { Link } from "react-router-dom";
import "../cssBase/Dashboard.css";
import DashboardHeader from "./DashBoardHeader";
import { X } from "@mui/icons-material";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("orderBarGraph"); // Default is OrderBarGraph

  return (
    <div>
      {/* Sticky Header */}
      <DashboardHeader />

      <div className="dashboard-container">
        {/* Sticky Sidebar */}
        <aside className="leftSideBar">
          <nav>
            <ul>
              <li>
                <Link
                  to="#"
                  onClick={() => setSelectedMenu("orderBarGraph")}
                  className={selectedMenu === "orderBarGraph" ? "active" : ""}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setSelectedMenu("products")}
                  className={selectedMenu === "products" ? "active" : ""}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setSelectedMenu("users")}
                  className={selectedMenu === "users" ? "active" : ""}
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setSelectedMenu("categories")}
                  className={selectedMenu === "categories" ? "active" : ""}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setSelectedMenu("reports")}
                  className={selectedMenu === "reports" ? "active" : ""}
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setSelectedMenu("settings")}
                  className={selectedMenu === "settings" ? "active" : ""}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Scrollable Main Content */}
        <main className="dashboard-content">
          {/* Dynamic Content Section */}
          <div className="content-container">
            <div className={`content ${selectedMenu === "orderBarGraph" ? "active" : "hidden"}`}>
              <OrderBarGraph />
            </div>
            <div className={`content ${selectedMenu === "orders" ? "active" : "hidden"}`}>
              <Orders />
            </div>
            <div className={`content ${selectedMenu === "products" ? "active" : "hidden"}`}>
              <Products />
            </div>
            <div className={`content ${selectedMenu === "users" ? "active" : "hidden"}`}>
              <Users />
            </div>
            <div className={`content ${selectedMenu === "categories" ? "active" : "hidden"}`}>
              <Categories />
            </div>
            <div className={`content ${selectedMenu === "reports" ? "active" : "hidden"}`}>
              <Reports />
            </div>
            <div className={`content ${selectedMenu === "settings" ? "active" : "hidden"}`}>
              <Settings />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;