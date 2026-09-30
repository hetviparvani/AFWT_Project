import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import BarberLayout from "../layouts/BarberLayout";
import ReceptionistLayout from "../layouts/ReceptionistLayout";
import AdminLayout from "../layouts/AdminLayout";

import PrivateRoute from "../components/PrivateRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Services from "../pages/public/Services";
import Products from "../pages/public/Products";

import CustomerDashboard from "../pages/customer/Dashboard";
import Profile from "../pages/customer/Profile";
import Bookings from "../pages/customer/Bookings";
import Orders from "../pages/customer/Orders";
import CustomerServices from "../pages/customer/Services";

import BarberDashboard from "../pages/barber/Dashboard";
import Appointments from "../pages/barber/Appointments";
import Availability from "../pages/barber/Availability";

import ReceptionistDashboard from "../pages/receptionist/Dashboard";
import ManageBookings from "../pages/receptionist/ManageBookings";
import Customers from "../pages/receptionist/Customers";
import Schedule from "../pages/receptionist/Schedule";

import AdminDashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
import Pricing from "../pages/admin/Pricing";
import Reports from "../pages/admin/Reports";

function AlreadyLoggedIn({ children }) {
  const { user } = useAuth();
  if (!user) return children;
  const roleRoutes = {
    Customer: "/customer/dashboard",
    Barber: "/barber/dashboard",
    Receptionist: "/receptionist/dashboard",
    Admin: "/admin/dashboard",
  };
  return <Navigate to={roleRoutes[user.role] || "/"} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<AlreadyLoggedIn><Login /></AlreadyLoggedIn>} />
        <Route path="/register" element={<AlreadyLoggedIn><Register /></AlreadyLoggedIn>} />
      </Route>

      <Route path="/customer" element={<PrivateRoute allowedRoles={["Customer"]}><CustomerLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="services" element={<CustomerServices />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="/barber" element={<PrivateRoute allowedRoles={["Barber"]}><BarberLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<BarberDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="availability" element={<Availability />} />
      </Route>

      <Route path="/receptionist" element={<PrivateRoute allowedRoles={["Receptionist"]}><ReceptionistLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<ReceptionistDashboard />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="schedule" element={<Schedule />} />
      </Route>

      <Route path="/admin" element={<PrivateRoute allowedRoles={["Admin"]}><AdminLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;