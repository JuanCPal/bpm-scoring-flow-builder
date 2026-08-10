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
  const { data: projects = [] } = useData(getProjects, [], []);

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

      {/* CONTENIDO */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <section
          className="rounded-3xl p-5 md:p-8 mb-7 min-h-[42vh] flex flex-col justify-between"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/Logo_SIIF_blanco.svg"
                alt="Logo dark"
                width={88}
                height={24}
                priority
                className="hidden dark:block"
              />
              <Image
                src="/logo/logogyg1.png"
                alt="Logo light"
                width={88}
                height={24}
                priority
                className="block dark:hidden"
              />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/canvas">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-all cursor-pointer"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  <span>+</span> Nuevo
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>
              Flujos de procesos
            </h1>
            <p className="text-sm md:text-base mt-2" style={{ color: 'var(--muted)' }}>
              Módulo de iniciación de clientes
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 mt-8">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={busqueda}
                onChange={manejarCambio}
                placeholder="Buscar flujo o línea"
                className="w-full py-2 pl-4 pr-9 text-sm rounded-md focus:outline-none focus:ring-1 transition"
                style={{
                  background: 'var(--surface-muted)',
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
        </section>

        {/* Cards */}
        <div className="w-4x1 max-w-[900px] mx-auto grid grid-cols-1 gap-3 mb-15">
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