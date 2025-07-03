import React from "react";
import {
  Home,
  Phone,
  Package,
  Eye,
  Heart,
  LogIn,
  LogOut,
  X,
  UserPlus,
} from "lucide-react";
import isLoggedIn from "../sections/Navbar";

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l z-50 p-4 
          transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button onClick={onClose} className="absolute top-7 right-4">
          <X className="w-6 h-6 text-gray-600 hover:text-black" />
        </button>

        <ul className="space-y-4 text-gray-700 font-medium mt-10">
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <Home className="w-5 h-5" />
            <a href="/">Home</a>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <Phone className="w-5 h-5" />
            <a href="/contact">Contact</a>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <Package className="w-5 h-5" />
            <a href="/all">All Products</a>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <Eye className="w-5 h-5" />
            <a href="/like">Watchlist Items</a>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <Heart className="w-5 h-5" />
            <a href="/like">Liked Items</a>
          </li>

          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <UserPlus className="w-5 h-5" />
            <a href="/signup">Signup</a>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <LogIn className="w-5 h-5" />
            <a href="/login">Login</a>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-600 transition">
            <LogOut className="w-5 h-5" />
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export function SidebarToggleButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <img
        src={isLoggedIn ? "user-active.png" : "user-icon.png"}
        alt="User Icon"
        className={
          isLoggedIn
            ? " rounded-full bg-[#DB4444] cursor-pointer"
            : " cursor-pointer"
        }
      />
    </button>
  );
}
