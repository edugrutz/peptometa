import { PeptidesTabs } from "@/app/(home)/PeptidesTabs";

export default async function Home() {

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12">
          <div className="max-w-full mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-3">
              PeptoMeta
            </h1>
            <p className="text-base md:text-lg text-slate-600 font-medium">
              Plataforma para visualização de peptídeos extraídos a partir da pipeline PeptoMiner
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 md:px-12 lg:px-16 py-8 md:py-4">
        <div className="max-w-full mx-auto">
          <PeptidesTabs />
        </div>
      </div>
    </main>
  );
}
