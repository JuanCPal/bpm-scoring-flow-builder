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
          className="rounded-3xl p-5 md:p-8 mb-7 min-h-[42vh] grid grid-cols-2 items-center justify-between gap-10"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full gap-3">
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
            <div className="mt-3">
              <h1 className="text-2xl md:text-3xl font-semibold font-mono tracking-tight" style={{ color: 'var(--foreground)' }}>
                Herramienta de Construcción de Flujos de procesos
              </h1>
              <p className="text-sm md:text-base mt-2" style={{ color: 'var(--muted)' }}>
                Módulo de iniciación de clientes
              </p>
            </div>

            <div className="flex items-center gap-3 my-4">

              <Link href="/canvas">
                <button
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-all bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] cursor-pointer"
                >
                  <span>+</span> Crear nuevo flujo
                </button>
              </Link>
            </div>
            <div className='flex'>
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={busqueda}
                  onChange={manejarCambio}
                  placeholder="Buscar flujo o línea"
                  className="w-full py-2 pl-4 pr-9 text-sm rounded-xl focus:outline-none focus:ring-1 transition"
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
              <div className="flex items-center gap-2 ml-2.5" style={{ color: 'var(--muted)' }}>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-[var(--accent)] hover:bg-[var(--surface-muted)] border-none rounded-lg px-2.5 py-2">
                  <FaFilter className="text-md" />
                </div>
                <div className="flex items-center gap-1.5 cursor-pointer hover:bg-[var(--surface-muted)] hover:text-[var(--accent)] border-none rounded-lg px-2.5 py-2">
                  <FaRegClock className="text-md" />
                  <span className='text-sm'>Recientes</span>
                </div>
              </div>
            </div>

          </div>
          <div className="flex h-full flex-col">
            <div className="self-end flex items-center"><h4 className='color-[var(--surface-muted)] text-sm font-mono mr-1'>Tema </h4><ThemeToggle className="" /></div>
            <div
              className="mt-2 flex flex-1 items-center justify-center"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at center, black 62%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 60% 60% at center, black 62%, transparent 100%)',
              }}
            >
              <Image
                src="/assets/hero-image-dark.png"
                alt="Hero dark"
                width={680}
                height={460}
                priority
                className="hidden h-auto w-full max-w-[610px] object-contain dark:block"
              />
              <Image
                src="/assets/hero-image-light.png"
                alt="Hero light"
                width={680}
                height={460}
                priority
                className="block h-auto w-full max-w-[610px] object-cover dark:hidden"
              />
            </div>
          </div>
        </section>

        {/* Cards */}
        <div className="w-4x1 max-w-[1100px] mx-auto grid grid-cols-2 gap-5">
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