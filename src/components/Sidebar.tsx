"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import { FiHome } from "react-icons/fi";

const menuItems = [
  { name: "Portfolio", icon: <FiHome /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);


  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-zinc-950 p-4 border-b border-zinc-800 w-[10%]"
      >
        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-400 focus:outline-none"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col
        `}
      >

        <nav className="flex-1 px-4 space-y-2 mt-6 md:block">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href="#"  
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-zinc-800 text-zinc-100"
            >
              {item.icon} {item.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
