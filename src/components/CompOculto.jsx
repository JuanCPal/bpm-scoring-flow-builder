import React, { useState } from "react";
import { FaArrowUp, FaEllipsisH, FaMap, FaProjectDiagram, FaTag, FaTools } from "react-icons/fa";
import { LuActivity, LuArrowBigDown, LuArrowBigDownDash, LuArrowDown, LuArrowDown01, LuArrowLeft, LuArrowRight, LuArrowUp, LuFile, LuFileBox, LuFilter, LuFilterX, LuGitBranch, LuGitCommitVertical, LuGitGraph, LuGitMerge, LuGitPullRequest, LuGroup, LuHouse, LuInfo, LuLayoutTemplate, LuListOrdered, LuMerge, LuPlus, LuProjector, LuSearch, LuTimer, LuWorkflow } from "react-icons/lu";
import Image from "next/image";
import logogyg1 from "../../public/logo/logogyg1.png"; 

export default function OneOc() {
    const [Hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen  bg-blue-200 dark:bg-slate-700 overflow-y-hidden">
            <div className="bg-blue-200 dark:bg-slate-700 w-full h-[45px] flex">
                {/*<Image
                    src={logogyg1}
                    alt="Logo"
                    priority
                    className="ml-12 my-0.5 w-15 h-12"  
                />*/}
                <div className="absolute right-9 flex">
                    <button className="w-auto h-auto py-.0.5 px-2 flex mt-2 border-1 border-blue-500 rounded-md text-blue-600 mr-5 hover:bg-blue-200  transition-all cursor-pointer"> <LuPlus className="mr-1 mt-1" /> Nuevo canvas
                    </button>
                    <div className="h-[31px] w-[31px] hover:bg-blue-400 cursor-pointer transition-all mt-1.5 rounded-full py-1.5 px-2.5 bg-blue-300 text-blue-800 font-bold ">P</div>
                </div>
            </div>

            <div className="flex">
                <div className={`bg-blue-200 dark:bg-slate-700 h-[92vh] transition-all ${isOpen ? "w-[46px]" : "w-[200px]"}`}>
                    <nav className="block ml-[15px] mt-[50px]">
                        <button className="text-gray-700 dark:text-zinc-50 text-[14px] mb-2 flex justify-items-start bg-zinc-100 dark:bg-slate-600 w-[170px] py-0.5 border-none rounded-md transition-all">
                            <div className="text-[14px] ml-2 mt-1 text-gray-900 dark:text-zinc-100 font-bold mr-2">
                                <LuHouse /> 
                            </div>
                            <div className="pt-1">
                                <h2>Principal</h2>
                            </div>
                        </button>
                        <button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-zinc-100 w-[170px] py-0.5 border-none rounded-md transition-all" onClick={() => setHidden(!Hidden)}>
                            <div className="text-[14px] ml-2 mt-1.5 text-zinc-900 font-sans font-bold mr-2">
                                <LuGroup />
                            </div>
                            <div className="pt-1 flex text-[14px]">
                                <h2 className="mr-[80px]">Grupos</h2><p>{Hidden ? <LuArrowUp /> : <LuArrowDown />}</p>
                            </div>
                        </button>
                        {/*COMPONENTE OCULTO */}
                        {Hidden && (
                            <>
                                <button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-zinc-100 w-[170px] py-0.5 border-none rounded-md transition-all">

                                    <div className="pt-1 ml-2 font-light">
                                        <h2>SubItem 1</h2>
                                    </div>
                                </button>
                                <button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-gray-300 w-[170px] py-0.5 border-none rounded-md transition-all">

                                    <div className="pt-1 ml-2 font-light">
                                        <h2>SubItem 1</h2>
                                    </div>
                                </button><button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-gray-300 w-[170px] py-0.5 border-none rounded-md transition-all">

                                    <div className="pt-1 ml-2 font-light">
                                        <h2>SubItem 1</h2>
                                    </div>
                                </button>

                            </>
                        )}

                        <button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-zinc-100 w-[170px] py-0.5 border-none rounded-md transition-all">
                            <div className="text-[14px] mt-1.5 ml-2 text-gray-900 font-bold mr-2">
                                <LuLayoutTemplate />
                            </div>
                            <div className="pt-1">
                                <h2>Plantillas</h2>
                            </div>
                        </button>
                        <button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-gray-300 w-[170px] py-0.5 border-none rounded-md transition-all">
                            <div className="text-[14px] mt-1.5 ml-2 text-gray-900 font-bold mr-2">
                                <LuFileBox />
                            </div>
                            <div className="pt-1">
                                <h2>Proyectos</h2>
                            </div>
                        </button>
                        <button className="text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-gray-300 w-[170px] py-0.5 border-none rounded-md transition-all">
                            <div className="text-[14px] mt-1.5 ml-2 text-gray-900 font-bold mr-2">
                                <LuInfo />
                            </div>
                            <div className="pt-1">
                                <h2>Información</h2>
                            </div>
                        </button>
                        <button className={`text-gray-700 text-[14px] mb-2 flex justify-items-start hover:bg-zinc-100  py-0.5 border-none rounded-md transition-all absolute bottom-6 ${isOpen ? "w-[30px]" : "w-[170px]"}`} onClick={() => setIsOpen(!isOpen)}>
                            <div className="text-[14px] mt-1.5 ml-2 text-gray-900 font-bold mr-2">
                                {isOpen ? <LuArrowRight /> : <LuArrowLeft />}
                            </div>
                            <div className="pt-1">
                               {isOpen ? "" : <h2 className="w-[135px]">Contraer barra lateral</h2>}
                            </div>
                        </button>
                    </nav>

                </div>
                <div className={`bg-white dark:bg-slate-900 h-[92vh] border-gray-300 dark:border-zinc-600 rounded-tl-xl transition-all text-white overflow-y-scroll 
                ${isOpen ? "w-[95vw]" : "w-[85vw]"} `} >
                    <div className="w-full h-[35px] rounded-tl-xl border-b-gray-300 border-b-1 py-2 px-5 bg-white/70 backdrop-blur-md dark:bg-slate-900/70 dark:backdrop-blur-md fixed"><p className="text-gray-500 dark:text-zinc-300 font-extralight text-[15px]"> <span className="hover:underline transition-all cursor-pointer">Home</span> / <span className="hover:underline transition-all cursor-pointer">usuario01</span></p> <FaEllipsisH className="absolute right-5 top-13 rounded-full p-1 text-[24px] hover:bg-gray-100 text-gray-800" /></div>
                    <div className="mt-15 mx-9 leading-[62px] h-[180px] border-b-1 border-b-gray-400 text-[60px] text-gray-700 font-bold">TITULO O ENCABEZADO DE LA SECCION EN MAYUSCULA</div>

                    <div className="flex mx-9 px-1 mt-12 text-gray-700  justify-between"><div className="flex mt-3 cursor-pointer hover:text-gray-500" title="Ordenar por"><LuListOrdered className="mr-1 mt-0.5" /><h6>reciente</h6></div>
                        <div className="flex"><LuSearch className="translate-x-6 mt-2"/><input className="w-[35vw] border border-gray-600 rounded-xl h-auto py-1 pl-8 pr-3 text-[16px] text-gray-500 bg-gray-100 focus:outline-none focus:ring-1 transition-all"
                            type="text"
                            placeholder="Busca una tarjeta ..."
                        /></div>
                        <div className="cursor pointer hover:text-gray-500 mt-3 flex" title="filtrar por"><LuFilter className="cursor-pointer mr-1" /><h6 className="cursor-pointer">Filtrar</h6></div> </div>

                    <div className="mx-9 mt-5 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xl rounded-xl border-1 border-gray-300 pt-1 px-1 pb-1 bg-gray-200">
                        <div className="flex text-gray-800 px-5 py-2 cursor-pointer"><div className="mr-3"><FaProjectDiagram /></div><div><h3>Titulo de la tarjeta</h3></div></div>
                        <div className="bg-white rounded-xl px-5 py-2">
                            <p className="text-gray-700 text-[15px] pb-6">Descripcion de la seccion </p>
                            <p className="text-[12px] text-gray-600">Caracteristicas de la seccion, fecha actualizacion, estado</p>
                        </div>
                    </div>

                    <div className="mx-9 mt-5 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xl rounded-xl border-1 border-gray-400 pt-1 bg-gray-200">
                        <div className="flex text-gray-800 px-5 py-2 cursor-pointer"><div className="mr-3"><FaProjectDiagram /></div><div><h3>Linea de iniciacion cliente Banco Union</h3></div></div>
                        <div className="bg-white rounded-xl px-5 py-2">
                            <p className="text-gray-700 text-[15px] pb-1.5">Descripcion detallada de la linea de iniciacion para el cliente Banco Union, en donde se encuentran procesos y variables que juntos forman una linea de procesos o diagrama de flujo para un producto financiero especifico </p>
                            <p className="text-[12px] text-gray-600">Ultima actualizacion: 20 de Octubre de 2025 a las 4:45 p.m | En proceso
                            </p>
                            <p className="text-[12px] text-gray-600">Autores(s): User1, User2 </p>
                        </div>
                    </div>
                    <div className="mx-9 mt-5 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xs rounded-xl border-1 border-gray-400 pt-1 px-1 hover:pb-3 pb-1 bg-gray-200">
                        <div className="flex text-gray-800 px-5 py-2 cursor-pointer"><div className="mr-3"><FaProjectDiagram /></div><div><h3 className="hover:underline" >Linea de iniciacion cliente Banco Union</h3></div></div>
                        <div className="bg-white rounded-xl px-5 py-2">
                            <p className="text-gray-700 text-[15px] pb-1.5"> </p>
                            <p className="text-[12px] text-gray-600">Ultima actualizacion: 20 de Octubre de 2025 a las 4:45 p.m | En proceso</p>
                            <p className="text-[12px] text-gray-600">Autores(s): User1, User2, </p>
                        </div>
                    </div>
                    <div className="mx-9 mt-5 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xs rounded-xl border-1 border-gray-400 pt-1 px-1 hover:pb-3 pb-1 bg-gray-200">
                        <div className="flex text-gray-800 px-5 py-2 cursor-pointer"><div className="mr-3"><FaProjectDiagram /></div><div><h3 className="hover:underline" >Linea de iniciacion cliente Banco Union</h3></div></div>
                        <div className="bg-white rounded-xl px-5 py-2">
                            <p className="text-gray-700 text-[15px] pb-1.5"> </p>
                            <p className="text-[12px] text-gray-600">Ultima actualizacion: 20 de Octubre de 2025 a las 4:45 p.m | En proceso</p>
                            <p className="text-[12px] text-gray-600">Autores(s): User1, User2, </p>
                        </div>
                    </div>
                    <div className="mx-9 mt-5 w-auto h-auto transition-all hover:shadow-2xs rounded-xl border-1 border-gray-400 pt-1 px-1 hover:bg-gray-300 pb-1 bg-gray-200">
                        <div className="flex text-gray-800 px-5 py-2 cursor-pointer"><div className="mr-3"><FaProjectDiagram /></div><div><h3 className="hover:underline" >Linea de iniciacion cliente Banco Union</h3></div></div>
                        <div className="bg-white rounded-xl px-5 py-2">
                            <p className="text-gray-700 text-[15px] pb-1.5"> </p>
                            <p className="text-[12px] text-gray-600">Ultima actualizacion: 20 de Octubre de 2025 a las 4:45 p.m | En proceso</p>
                            <p className="text-[12px] text-gray-600">Autores(s): User1, User2</p>
                        </div>
                    </div>
                    <div className="mx-9 mt-5 mb-14 w-auto h-auto hover:shadow-gray-300 transition-all hover:shadow-2xl rounded-xl border-1 border-gray-400 pt-1 bg-gray-200">
                        <div className="flex text-gray-800 px-5 py-2 cursor-pointer"><div className="mr-3"><FaProjectDiagram /></div><div><h3>Titulo de la tarjeta</h3></div></div>
                        <div className="bg-white rounded-xl px-5 py-2">
                            <p className="text-gray-700 text-[15px] pb-6">Descripcion de la seccion</p>
                            <p className="text-[12px] text-gray-600">Caracteristicas de la seccion, fecha actualizacion, estado</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}