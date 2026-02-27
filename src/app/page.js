'use client';

import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { FaSearch, FaFilter, FaRegClock } from "react-icons/fa";
import { useEffect, useState } from 'react';

function getSavedTrees() {
  return Object.keys(localStorage)
    .filter((k) => k.startsWith("Linea_")) // solo claves que comienzan en 
    .map((k) => JSON.parse(localStorage.getItem(k)));
}

export default function DashboardPage() {
  const [busqueda, setBusqueda] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getSavedTrees());
  }, []);

  const manejarCambio = (e) => setBusqueda(e.target.value);

  // Filtro aplicado
  const proyectosFiltrados = projects
    .filter((project) => {
      const texto = busqueda.toLowerCase();
      return (
        project.name?.toLowerCase().includes(texto) ||
        project.id?.toLowerCase().includes(texto)
      );
    })
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));



  return (
    <div className="min-h-screen bg-white overflow-y-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full  bg-white px-6 py-1 flex items-center justify-between">
        <ul className="flex items-center space-x-6">
          <li className="text-gray-400 font-extralight tracking-[3px] hover:text-blue-600 cursor-pointer text-[14px]">SISTEMAS GYG</li>
        </ul>

        <button className="flex items-center px-4 py-0.5 ml-[920px] text-sm font-extralight text-gray-700 rounded-md cursor-pointer hover:text-blue-700 transition-all">
           Documentación
        </button>
        <Link href="/canvas">
          <button className="flex items-center gap-2 px-4 py-0.5 my-2 text-sm font-semibold text-blue-100 bg-gray-700 rounded-md hover:bg-blue-800 hover:text-blue-50 transition-all shadow-sm">
            <span className="text-lg">+</span> Nuevo
          </button>
        </Link>
      </nav>

      {/* HERO */}
      <header className="mt-14 mx-5 pt-20 pb-16 z-50 rounded-t-[50px] bg-gradient-to-b from-blue-200 to-white text-center">

        <h1 className="text-[80px] font-bold text-blue-950 tracking-tight leading-15 mt-4">Constructor <span className='text-blue-800'>visual</span> de flujos de procesos</h1>
        <p className="text-lg md:text-xl text-gray-700 mt-2">Módulo de iniciación de clientes</p>

        {/* Buscador */}
        <div className="relative max-w-md mx-auto mt-8">
          <input
            type="text"
            value={busqueda}
            onChange={manejarCambio}
            placeholder="Buscar flujo o línea"
            className="w-full py-3 pl-5 pr-12 text-base rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white placeholder-gray-400 transition"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition"
            onClick={() => console.log('Buscar:', busqueda)}
          >
            <FaSearch />
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Filtros */}
        <div className="flex items-center justify-between text-gray-600 mb-4 mx-1">
          <div className="flex items-center gap-2">
            <FaRegClock />
            <p className="text-sm font-medium">Recientes</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800">
            <FaFilter />
            <p className="text-sm font-medium">Filtrar</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3">
          {proyectosFiltrados
            .slice()
            .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
            .map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                project={project}
                title={project.name || project.id}
              />
            ))}
        </div>
      </main>
    </div>
  );
}