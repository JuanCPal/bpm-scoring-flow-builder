'use client';

import Link from 'next/link';
import ProjectCard from '@/components/features/ProjectCard';
import { FaSearch, FaFilter, FaRegClock } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function getSavedTrees() {
  return Object.keys(localStorage)
    .filter((k) => k.startsWith("Linea_"))
    .map((k) => JSON.parse(localStorage.getItem(k)));
}

export default function DashboardPage() {
  const [busqueda, setBusqueda] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getSavedTrees());
  }, []);

  const manejarCambio = (e) => setBusqueda(e.target.value);

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
    <div className="relative min-h-screen bg-white dark:bg-slate-900 overflow-y-hidden">
      {/* Fondo con partículas */}
      <Particles
        className="absolute inset-0 -z-10"
        init={loadSlim}
        options={{
          particles: {
            number: { value: 50 },
            size: { value: 5 },
            opacity: { value: 0.8 },
            move: { speed: 0.3 },
            color: { value: ["#1e3a8a", "#64748b"] },
          },
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white dark:bg-slate-900 px-8 py-1 z-50 flex items-center justify-between">
        <ul className="flex items-center space-x-6">
          <li className="text-gray-400 font-extralight tracking-[3px] hover:text-blue-600 cursor-pointer text-[14px]">
            SISTEMAS GYG
            <img></img>
          </li>
        </ul>
        <div className='flex'>
          <button className="flex items-center px-4 py-0.5 text-sm font-extralight text-gray-700 dark:text-zinc-200 rounded-md cursor-pointer hover:text-blue-700 dark:hover:text-slate-400 transition-all">
            Procesos
          </button>
              <button className="flex items-center px-4 py-0.5 text-sm font-extralight text-gray-700 dark:text-zinc-200 rounded-md cursor-pointer hover:text-blue-700 dark:hover:text-slate-400 transition-all">
            Variables
          </button>
              <button className="flex items-center px-4 py-0.5 text-sm font-extralight text-gray-700 dark:text-zinc-200 rounded-md cursor-pointer hover:text-blue-700 dark:hover:text-slate-400 transition-all">
            Plantillas
          </button>
              <button className="flex items-center px-4 py-0.5 text-sm font-extralight text-gray-700 dark:text-zinc-200 rounded-md cursor-pointer hover:text-blue-700 dark:hover:text-slate-400 transition-all">
            Documentación
          </button>
          <Link href="/canvas">
            <button className="flex items-center gap-2 px-4 py-0.5 my-2 text-sm font-semibold text-blue-100 dark:text-slate-900 bg-gray-700 dark:bg-blue-400 rounded-md hover:bg-blue-800 dark:hover:bg-slate-400 hover:text-blue-50 dark:hover:text-slate-900 transition-all shadow-sm cursor-pointer">
              <span className="text-lg">+</span> Nuevo
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="mt-14 mx-8 pt-20 pb-16 z-50 rounded-t-[50px] bg-gradient-to-b from-blue-200 to-white dark:from-slate-500 dark:to-slate-900 text-center">
        <h1 className="text-[125px] font-bold text-blue-950 dark:text-blue-200 tracking-tight leading-24 mt-4 font-sans">
          Constructor <span className='text-blue-800 dark:text-blue-300 font-serif text-[115px] italic'>visual</span> <br /> de flujos de procesos
        </h1>
        <p className="text-[24px] text-gray-700 dark:text-zinc-300 mt-8 font-sans">
          Módulo de <span className='text-blue-800 dark:text-blue-300 italic font-serif font-bold'>iniciación</span> de clientes
        </p>

        {/* Buscador */}
        <div className="relative max-w-md mx-auto mt-8">
          <input
            type="text"
            value={busqueda}
            onChange={manejarCambio}
            placeholder="Buscar flujo o línea"
            className="w-full py-3 pl-5 pr-12 text-base rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white dark:bg-slate-900 placeholder-gray-400 font-extralight transition"
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
        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-300 mb-4 mx-1">
          <div className="flex items-center gap-2">
            <FaRegClock />
            <p className="text-sm font-medium">Recientes</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800 dark:text-zinc-300">
            <FaFilter />
            <p className="text-sm font-medium">Filtrar</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 mb-15">
          {proyectosFiltrados.map(project => (
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