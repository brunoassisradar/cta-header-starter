import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
// TEMPORARIAMENTE DESABILITADO - Reativar quando necessário
// import { AuthProvider } from "./contexts/AuthContext";
// import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
// import Login from "./pages/Login";
import FinanciamentoAPS from "./pages/FinanciamentoAPS";
import LinhasDeCuidado from "./pages/LinhasDeCuidado";
import GestantesVisaoGeral from "./pages/linhas-de-cuidado/GestantesVisaoGeral";
import GestantesRelatorio from "./pages/linhas-de-cuidado/GestantesRelatorio";
import GestantesIndividualizado from "./pages/linhas-de-cuidado/GestantesIndividualizado";
import QualidadeVisaoGeral from "./pages/QualidadeVisaoGeral";
import QualidadeRelatorio from "./pages/QualidadeRelatorio";
import QualidadeIndividualizado from "./pages/QualidadeIndividualizado";
import Financeiro from "./pages/Financeiro";
import FinanceiroVisaoGeral from "./pages/financeiro/FinanceiroVisaoGeral";
import FinanceiroRelatorio from "./pages/financeiro/FinanceiroRelatorio";
import Comunicacao from "./pages/Comunicacao";
import MinhasComunicacoes from "./pages/comunicacao/MinhasComunicacoes";
import CampanhaDetalhe from "./pages/comunicacao/CampanhaDetalhe";
import NotFound from "./pages/NotFound";
import SalaDeSituacao from "./pages/SalaDeSituacao";

const queryClient = new QueryClient();

const antTheme = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 6,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={ptBR} theme={antTheme}>
      <TooltipProvider>
        {/* TEMPORARIAMENTE DESABILITADO - Reativar AuthProvider quando necessário */}
        {/* <AuthProvider> */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* TEMPORARIAMENTE DESABILITADO - Rota de login */}
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/" element={<Navigate to="/sala-de-situacao" replace />} />
              <Route element={<AppLayout />}>
                <Route path="/sala-de-situacao" element={<SalaDeSituacao />} />
                <Route path="/financiamento-aps" element={<FinanciamentoAPS />} />
                <Route path="/financiamento-aps/qualidade-esf-eap" element={<QualidadeVisaoGeral />} />
                <Route path="/financiamento-aps/qualidade-esf-eap/relatorio" element={<QualidadeRelatorio />} />
                <Route path="/financiamento-aps/qualidade-esf-eap/individualizado" element={<QualidadeIndividualizado />} />
                <Route path="/linhas-de-cuidado" element={<LinhasDeCuidado />} />
                <Route path="/linhas-de-cuidado/gestantes" element={<GestantesVisaoGeral />} />
                <Route path="/linhas-de-cuidado/gestantes/relatorio" element={<GestantesRelatorio />} />
                <Route path="/linhas-de-cuidado/gestantes/individualizado" element={<GestantesIndividualizado />} />
                <Route path="/financeiro" element={<Financeiro />} />
                <Route path="/financeiro/visao-geral" element={<FinanceiroVisaoGeral />} />
                <Route path="/financeiro/relatorio" element={<FinanceiroRelatorio />} />
                <Route path="/comunicacao" element={<Comunicacao />} />
                <Route path="/comunicacao/minhas-comunicacoes" element={<MinhasComunicacoes />} />
                <Route path="/comunicacao/campanha/:id" element={<CampanhaDetalhe />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        {/* </AuthProvider> */}
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
