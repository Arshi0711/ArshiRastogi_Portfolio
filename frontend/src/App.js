import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Homepage from "./components/Homepage";
import BlogPost from "./components/BlogPost";

function App() {
  return (
    <div className="App bg-gray-950 text-white min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;