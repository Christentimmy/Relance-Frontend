// src/App.jsx (updated with messaging AND settings routes)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import { 
  Home, 
  Explore, 
  GigDetails, 
  SellerProfile,
  Login,
  Register,
  Verify,
  BuyerDashboard,
  SellerDashboard,
  CreateGig,
  MyGigs,
  Orders,
  OrderDetails,
  Messages,
  Chat,
  Settings // Add this import
} from './pages';

function App() {
  // Get userRole dynamically from localStorage on each render
  const getUserRole = () => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
      return stored || 'buyer';
    } catch (e) {
      return 'buyer';
    }
  };

const [userRole, setUserRole] = useState(getUserRole());

useEffect(() => {
  const syncRole = () => setUserRole(getUserRole());
  window.addEventListener("storage", syncRole);
  syncRole();
  return () => window.removeEventListener("storage", syncRole);
}, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        
        <Route path="/explore" element={
          <PublicLayout>
            <Explore />
          </PublicLayout>
        } />
        
        <Route path="/gig/:id" element={
          <PublicLayout>
            <GigDetails />
          </PublicLayout>
        } />
        
        <Route path="/seller/:username" element={
          <PublicLayout>
            <SellerProfile />
          </PublicLayout>
        } />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          userRole === 'buyer' ? (
            <BuyerDashboard />
          ) : userRole === 'seller' ? (
            <SellerDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        
        {/* Messaging Routes */}
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route path="/dashboard/messages/:chatId" element={<Chat />} />
        
        {/* Settings Route - ADD THIS */}
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/settings/:tab" element={<Settings />} />
        
        {/* Gig Management Routes */}
     <Route 
  path="/dashboard/gigs" 
  element={userRole === "seller" ? <MyGigs /> : <Navigate to="/dashboard" replace />} 
/>

<Route 
  path="/dashboard/gigs/create" 
  element={userRole === "seller" ? <CreateGig /> : <Navigate to="/dashboard" replace />} 
/>
        
        {/* Order Management Routes */}
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/orders/:id" element={<OrderDetails />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
