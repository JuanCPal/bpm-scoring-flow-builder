'use client';

import Link from 'next/link';
import ProjectCard from '@/components/features/ProjectCard';
import { FaSearch, FaFilter, FaRegClock } from "react-icons/fa";
import { useState } from 'react';
import { useData } from "@/hooks/useData";
import { getProjects } from "@/lib/api-client";
import Image from "next/image";
import ThemeToggle from "@/components/ui/theme/theme-toggle";

export default function DashboardPage() {
  const [busqueda, setBusqueda] = useState('');
  const { data: projects = [], loading } = useData(getProjects, [], []);

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
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 w-full h-15 px-12 z-50 flex items-center justify-between"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/logo/Logo_SIIF_blanco.svg"
            alt="Logo dark"
            width={72}
            height={20}
            priority
            className="hidden dark:block"
          />
          <Image
            src="/logo/logogyg1.png"
            alt="Logo light"
            width={72}
            height={20}
            priority
            className="block dark:hidden"
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/canvas">
            <button
              className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-md transition-all cursor-pointer"
              style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              <span>+</span> Nuevo
            </button>
          </Link>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 pt-20">
        {/* Título de página */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            Flujos de procesos
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Módulo de iniciación de clientes
          </p>
        </div>

        {/* Buscador + filtros en una sola fila */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              value={busqueda}
              onChange={manejarCambio}
              placeholder="Buscar flujo o línea"
              className="w-full py-1.5 pl-4 pr-9 text-sm rounded-md focus:outline-none focus:ring-1 transition"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            />
            <FaSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
              style={{ color: 'var(--muted)' }}
            />
          </div>

          <div className="flex items-center gap-4" style={{ color: 'var(--muted)' }}>
            <div className="flex items-center gap-1.5">
              <FaRegClock className="text-xs" />
              <span className="text-sm">Recientes</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <FaFilter className="text-xs" />
              <span className="text-sm">Filtrar</span>
            </div>
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