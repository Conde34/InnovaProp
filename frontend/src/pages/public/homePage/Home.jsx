import { Sparkles, ArrowUpRight, ShieldCheck, Clock, CreditCard } from "lucide-react";
import {Link} from 'react-router-dom'

const Home = () => {

  return (
    <section
      aria-label="Hero InnovaProp 2026"
      className="fondo relative min-h-screen w-full bg-[#344e5e] text-white font-sans overflow-hidden flex flex-col justify-between selection:bg-[#ffa323] selection:text-[#344e5e]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
          alt="Arquitectura contemporánea InnovaProp Tucumán"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_18s_ease-in-out_infinite]"
        />

        {/* Gradiente principal de contraste usando exclusivamente #344e5e y #414345 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(112deg, rgba(52,78,94,0.96) 0%, rgba(52,78,94,0.84) 48%, rgba(65,67,69,0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(65,67,69,0.55) 0%, rgba(52,78,94,0) 35%, rgba(65,67,69,0.92) 100%)",
          }}
        />

        {/* Resplandor ambiental sutil en #ffa323 */}
        <div className="absolute -top-28 -left-28 w-[460px] h-[460px] rounded-full bg-[#ffa323]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full bg-[#ffa323]/10 blur-[110px]" />

        {/* Grilla arquitectónica sutil */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8">

      </header>

      
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-7">
           
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-[#ffa323] text-[#344e5e] shadow-xl shadow-[#ffa323]/25">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                COLECCIÓN EXCLUSIVA 2026 · TUCUMÁN
              </span>
            </div>

            
            <h1 className="text-4xl sm:text-6xl xl:text-[66px] font-black tracking-tight leading-[1.05] text-white">
              Viví la arquitectura que{" "}
              <span className="relative inline-block text-[#ffa323]">
                define tu futuro
                <span className="absolute -bottom-1.5 left-0 right-0 h-1.5 rounded-full bg-[#ffa323]/50" />
              </span>
              .
            </h1>

            
            <p className="text-base sm:text-xl text-white/85 max-w-2xl leading-relaxed font-normal">
              Residencias de autor, penthouses panorámicos y desarrollos de alta
              plusvalía curados por especialistas en el mercado inmobiliario de
              vanguardia.
            </p>

            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <Link
                to="/propiedades"
                className="inline-flex items-center justify-center gap-2 px-5 py-4.5 rounded-xl bg-[#ffa323] hover:bg-[#ffa323]/90   !text-[#344e5e] !no-underline hover:no-underline visited:!text-[#344e5e] active:!text-[#344e5e] font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#ffa323]/25 hover:scale-[1.02]"
              >
                <span className="text-black text-decoration-none">
                  Explorar Propiedades
                </span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
              <div className="group bg-[#414345]/80 hover:bg-[#414345] backdrop-blur-xl border border-white/15 hover:border-[#ffa323] rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#344e5e] border border-[#ffa323] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-[#ffa323]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#ffa323] block">
                    FINANCIACIÓN DIRECTA
                  </span>
                  <span className="text-xs text-white/80">
                    Planes flexibles en USD y pesos
                  </span>
                </div>
              </div>

              <div className="group bg-[#414345]/80 hover:bg-[#414345] backdrop-blur-xl border border-white/15 hover:border-[#ffa323] rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#344e5e] border border-[#ffa323] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#ffa323]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#ffa323] block">
                    TASACIÓN EN 24 HS
                  </span>
                  <span className="text-xs text-white/80">
                    Valuación profesional sin cargo
                  </span>
                </div>
              </div>

              <div className="group bg-[#414345]/80 hover:bg-[#414345] backdrop-blur-xl border border-white/15 hover:border-[#ffa323] rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#344e5e] border border-[#ffa323] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#ffa323]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#ffa323] block">
                    100% VERIFICADAS
                  </span>
                  <span className="text-xs text-white/80">
                    Respaldo jurídico y escritura
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

     
      <footer className="relative z-10 w-full border-t border-white/15 bg-[#414345]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-6 sm:gap-10">
            <div>
              <span className="font-black text-[#ffa323] text-base sm:text-lg mr-1.5">
                +120
              </span>
              <span className="text-white/80 font-medium">
                Propiedades Activas
              </span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div>
              <span className="font-black text-[#ffa323] text-base sm:text-lg mr-1.5">
                +15 Años
              </span>
              <span className="text-white/80 font-medium">
                Liderando en Tucumán
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/80 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ffa323]" />
            <span>Asesoramiento personalizado · Lunes a Sábados</span>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Home;