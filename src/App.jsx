import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Application from "./Pages/Application";

import Package from "./Pages/Package";
import Drivers from "./Pages/Drivers";
import Earnings from "./Pages/Earnings";
import CustomerInstantQuote from "./Pages/CustomerInstantQuote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/package" element={<Package />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/customer-instant-quote" element={<CustomerInstantQuote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
