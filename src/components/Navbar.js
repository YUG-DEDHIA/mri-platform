import React from 'react';
import { Bell, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left Side: Logo and App Name */}
        <div className="nav-left">
          <div className="logo-icon">🩺</div> {/* Logo Icon */}
          <span className="app-name">MRI Review Platform</span>
        </div>

        {/* Right Side: Icons and Profile */}
        <div className="nav-right">
          <button className="p-2 text-white">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-white">
            <Settings className="w-5 h-5" />
          </button>
          <div className="profile-info">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop"
              alt="Doctor profile"
            />
            <div className="profile-details">
              <p>Dr. Sarah Chen</p>
              <span>Orthopedic Surgeon</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
