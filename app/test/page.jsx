"use client";

import React, { useRef } from "react";

export default function TestPage() {
    const containerRef = useRef(null)
  return (
    <div ref={containerRef} className="w-full h-screen bg-image">
        <img className="w-20 h-20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAABqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeElEQVR4nO2at4tUQRTGf2d3987unZ09Y07XmBvMaS6IuSAmzAnmggomzD9hQMGMGDAHMGYMKMaIKMaIAd0zZ+f07u6O74fX6mE9793Z8XhP9YOfun3v7Y9v69SpU6c6X9S5v3WAr9D97wK4+X8XwM0SgJsFALN7N8uY3S6D2Y0SgNktMma3SJvdImV2i5TZLSKzm0Rmt0id3SLNbpEyS8pYUhYps6QsUubO6X7vH1NmaRlbp8ySsqSMLSljS8pYUhYps6SMLSlLlCUps6QsSZn7N9X9Y8osSZn7N9W9vy5JmftP97v31yUpc/+pun9Suf9UKZPKpEySRMqkJEqkJMqkJMokSaRMaqpMypRJmZRMypRJmZRMmZRMypRJUjIpU8qkJEqkJEokSZJEkqSkJEokSUokSUpKokSSJEkkSUpKokSSJEkkKUmSJEkkJUmSJEkkSUpKokRKokRKkkRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkiRSkuRff9p/+AOTz0Gk5K/vAgAAAABJRU5ErkJggg==" alt="" />
      {/* <LiquidGlass
        mouseContainer={containerRef}
        elasticity={0.3}
        style={{ position: "fixed", top: "50%", left: "50%" }}
      > */}
        <div className="p-6">
          <h2>Glass responds to mouse anywhere in the container</h2>
        </div>
      {/* </LiquidGlass> */}
    </div>
  );
}
