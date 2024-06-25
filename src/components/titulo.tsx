"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Titulo: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <h2 className="text-2xl font-bold my-4">PRODUTOS EM DESTAQUE</h2>
      )}
    </>
  );
};

export default Titulo;
