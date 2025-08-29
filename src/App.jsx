import React from "react";
import Hero from "./components/custom/Hero";
import Header from "./components/custom/Header";

function App() {
  return (
    <div className="relative min-h-screen text-white">
      {/* === Global Background Layer (covers header + hero) === */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/Background.jpg')" }} // ✅ file goes in /public
      />
      <div className="fixed inset-0 -z-10 bg-black/50" /> {/* overlay for readability */}

      {/* === Content === */}
      {/* <Header /> */}
      <main className="pt-20">
        <Hero />
      </main>
    </div>
  );
}

export default App;
