import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gestantePerfilIcon from '@/assets/gestante-perfil-icon.png';
import iconeGestanteDefault from '@/assets/icone-gestante-default.svg';
import iconeGestanteActive from '@/assets/icone-gestante-active.svg';
import iconeDiabetesDefault from '@/assets/icone-diabetes-default.svg';
import iconeDiabetesActive from '@/assets/icone-diabetes-active.svg';
import iconeCriancaDefault from '@/assets/icone-crianca-default.svg';
import iconeCriancaActive from '@/assets/icone-crianca-active.svg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GaugeChart } from '@/components/gestantes/GaugeChart';
import { SectionHeader } from '@/components/gestantes/SectionHeader';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { Segmented } from 'antd';
import {
  DollarSign,
  CircleDollarSign,
  Users,
  Baby,
  AlertTriangle,
  HeartPulse,
  Info,
  Eye,
  Hospital,
  HelpCircle,
  Monitor,
  Wallet,
  Landmark,
  TrendingUp,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ── Mock data ──
const financeiro = {
  vinculo: { otimo: 0, bom: 20, suficiente: 20, regular: 5 },
  qualidade: { otimo: 0, bom: 20, suficiente: 20, regular: 5 },
  qualidadeIndicadores: [
    { label: 'C1 – Mais acesso', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
    { label: 'C2 – Cuidado infantil', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
    { label: 'C3 – Gestante e Puérpera', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
    { label: 'C4 – Pessoa com Diabetes', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
    { label: 'C5 – Pessoa com Hipertensão', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
    { label: 'C6 – Pessoa idosa', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
    { label: 'C7 – Cuidado da mulher', otimo: 3, bom: 7, suficiente: 0, regular: 2 },
  ],
  fns: [
    { mes: 'Fev/2025', valor: 1510000 },
    { mes: 'Mar/2025', valor: 1821000 },
    { mes: 'Abr/2025', valor: 1654000 },
  ],
};

const resumo = {
  totalGestantes: 85,
  parirProx30Dias: 12,
  riscoAlto: 8,
  riscoIntermediario: 15,
  percentMenores18: 3.5,
  percentMaiores40: 5.9,
};

const qualidade = {
  consultas: { feitas: 342, total: 510 },
  procedimentos: { feitas: 189, total: 255 },
  vacinas: { feitas: 156, total: 204 },
  visitas: { feitas: 198, total: 340 },
};

const metricas = {
  iegm: { nota: 'C+', iSaude: 'C+', geral: 'C+', ano: 2021 },
  icsaps: {
    municipio: 24.2,
    residentes: 16.8,
    ano: 2024,
  },
};

const hipertensos = {
  semConsulta: 1000,
  total: 4000,
  percentSemConsulta: 25,
};

const diabeticos = {
  semConsulta: 1000,
  total: 4000,
  percentSemConsulta: 25,
  totalDiabetes: 235535,
};

const vacinacaoCriancas = {
  'Menores de 1 ano': [
    { vacina: 'BCG', imunizadas: 14852, percImunizadas: 48.3, naoImunizadas: 15856, percNaoImunizadas: 51.7 },
    { vacina: 'Hepatite B', imunizadas: 1200, percImunizadas: 10.5, naoImunizadas: 10212, percNaoImunizadas: 89.5 },
    { vacina: 'Penta (3ª dose)', imunizadas: 1200, percImunizadas: 10.3, naoImunizadas: 11210, percNaoImunizadas: 89.7 },
    { vacina: 'Pneumocócica 10 (2ª dose)', imunizadas: 1200, percImunizadas: 46.8, naoImunizadas: 1359, percNaoImunizadas: 53.2 },
    { vacina: 'Vacina Inativada Poliomielite VIP (3ª dose)', imunizadas: 1200, percImunizadas: 16.9, naoImunizadas: 5874, percNaoImunizadas: 83.1 },
    { vacina: 'Vacina Rotavírus Humano (VRH) (2ª dose)', imunizadas: 1200, percImunizadas: 17.7, naoImunizadas: 5552, percNaoImunizadas: 82.3 },
    { vacina: 'Meningocócica C (2ª dose)', imunizadas: 800, percImunizadas: 15.8, naoImunizadas: 4255, percNaoImunizadas: 84.2 },
    { vacina: 'Febre amarela', imunizadas: 0, percImunizadas: 0, naoImunizadas: 0, percNaoImunizadas: 0 },
  ],
  'Entre 1 e 2 anos': [
    { vacina: 'BCG', imunizadas: 12000, percImunizadas: 55.0, naoImunizadas: 9818, percNaoImunizadas: 45.0 },
    { vacina: 'Hepatite B', imunizadas: 2400, percImunizadas: 22.1, naoImunizadas: 8460, percNaoImunizadas: 77.9 },
  ],
};

// ── Component ──
const SalaDeSituacao: React.FC = () => {
  const navigate = useNavigate();
  const [financeiroTab, setFinanceiroTab] = useState<string>('Financiamento');
  const [financeiroSubTab, setFinanceiroSubTab] = useState<string>('Vínculo e acompanhamento');
  const [perfilTab, setPerfilTab] = useState<string>('Gestantes e puérperas');
  const [criancaFaixaTab, setCriancaFaixaTab] = useState<string>('Menores de 1 ano');

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="text-[26px] font-medium text-foreground">Bem-vindo (a), nome do usuário</h1>

      {/* ═══════════ FINANCEIRO APS ═══════════ */}
      <section className="space-y-4">
        <SectionHeader
          title="Financeiro APS"
          icon={<DollarSign className="w-4 h-4 text-primary" />}
          linkTo="/financeiro/visao-geral"
          linkLabel="Financeiro"
        />

        <Segmented
          options={[
            { label: <span className="inline-flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Financiamento</span>, value: 'Financiamento' },
            { label: <span className="inline-flex items-center gap-1.5"><CircleDollarSign className="w-4 h-4" /> Fundo Nacional de Saúde</span>, value: 'Fundo Nacional de Saúde' },
          ]}
          value={financeiroTab}
          onChange={(val) => setFinanceiroTab(val as string)}
        />

        {financeiroTab === 'Financiamento' && (
          <Card>
            <CardContent className="p-5 space-y-4">
              {/* Sub-tabs */}
              <div className="flex gap-6 border-b border-border">
                {['Vínculo e acompanhamento', 'Qualidade eSF/eAP'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFinanceiroSubTab(tab)}
                    className={`pb-2.5 text-sm font-medium transition-colors border-b-2 ${
                      financeiroSubTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {financeiroSubTab === 'Vínculo e acompanhamento' && (
                <div className="rounded-md overflow-hidden border border-border grid grid-cols-5 text-center text-sm">
                  <div className="row-span-2 p-4 text-left text-[13px] font-medium text-muted-foreground border-r border-border flex items-center bg-card">
                    Classificação das equipes nesse componente
                  </div>
                  <div className="py-2 bg-[hsl(var(--status-otimo))] text-white text-xs font-bold tracking-wide">ÓTIMO</div>
                  <div className="py-2 bg-[hsl(var(--status-bom))] text-white text-xs font-bold tracking-wide">BOM</div>
                  <div className="py-2 bg-[hsl(var(--status-suficiente))] text-white text-xs font-bold tracking-wide">SUFICIENTE</div>
                  <div className="py-2 bg-[hsl(var(--status-regular))] text-white text-xs font-bold tracking-wide">REGULAR</div>
                  <div className="py-2 bg-[hsl(var(--status-otimo-bg))] text-[hsl(var(--status-otimo))] font-bold text-lg">{financeiro.vinculo.otimo}</div>
                  <div className="py-2 bg-[hsl(var(--status-bom-bg))] text-[hsl(var(--status-bom))] font-bold text-lg">{financeiro.vinculo.bom}</div>
                  <div className="py-2 bg-[hsl(var(--status-suficiente-bg))] text-[hsl(var(--status-suficiente))] font-bold text-lg">{financeiro.vinculo.suficiente}</div>
                  <div className="py-2 bg-[hsl(var(--status-regular-bg))] text-[hsl(var(--status-regular))] font-bold text-lg">{financeiro.vinculo.regular}</div>
                </div>
              )}

              {financeiroSubTab === 'Qualidade eSF/eAP' && (
                <div className="rounded-md overflow-hidden border border-border text-sm">
                  {/* Header */}
                  <div className="grid grid-cols-5 text-center">
                    <div className="p-3 text-left text-[13px] font-medium text-muted-foreground border-r border-border bg-card">
                      Classificação das equipes nos indicadores
                    </div>
                    <div className="py-2 bg-[hsl(var(--status-otimo))] text-white text-xs font-bold tracking-wide flex items-center justify-center">ÓTIMO</div>
                    <div className="py-2 bg-[hsl(var(--status-bom))] text-white text-xs font-bold tracking-wide flex items-center justify-center">BOM</div>
                    <div className="py-2 bg-[hsl(var(--status-suficiente))] text-white text-xs font-bold tracking-wide flex items-center justify-center">SUFICIENTE</div>
                    <div className="py-2 bg-[hsl(var(--status-regular))] text-white text-xs font-bold tracking-wide flex items-center justify-center">REGULAR</div>
                  </div>
                  {/* Rows */}
                  {financeiro.qualidadeIndicadores.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 text-center border-t border-border">
                      <div className="p-3 text-left text-[13px] text-foreground border-r border-border">{row.label}</div>
                      <div className="py-2.5 bg-[hsl(var(--status-otimo-bg))] text-[hsl(var(--status-otimo))] font-semibold">{row.otimo}</div>
                      <div className="py-2.5 bg-[hsl(var(--status-bom-bg))] text-[hsl(var(--status-bom))] font-semibold">{row.bom}</div>
                      <div className="py-2.5 bg-[hsl(var(--status-suficiente-bg))] text-[hsl(var(--status-suficiente))] font-semibold">{row.suficiente}</div>
                      <div className="py-2.5 bg-[hsl(var(--status-regular-bg))] text-[hsl(var(--status-regular))] font-semibold">{row.regular}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {financeiroTab === 'Fundo Nacional de Saúde' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Evolução dos recursos financeiros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financeiro.fns}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                      contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 5, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Fonte: FNS.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* ═══════════ PERFIL APS ═══════════ */}
      <section className="space-y-4">
        <SectionHeader
          title="Perfil APS"
          icon={<Users className="w-4 h-4 text-primary" />}
        />

        <Segmented
          options={[
            { label: <span className="inline-flex items-center gap-1.5"><img src={perfilTab === 'Gestantes e puérperas' ? iconeGestanteActive : iconeGestanteDefault} alt="Gestante" className="w-4 h-4" /> Gestantes e puérperas</span>, value: 'Gestantes e puérperas' },
            { label: <span className="inline-flex items-center gap-1.5"><HeartPulse className="w-4 h-4" /> Hipertensos</span>, value: 'Hipertensos' },
            { label: <span className="inline-flex items-center gap-1.5"><img src={perfilTab === 'Diabéticos' ? iconeDiabetesActive : iconeDiabetesDefault} alt="Diabéticos" className="w-4 h-4" /> Diabéticos</span>, value: 'Diabéticos' },
            { label: <span className="inline-flex items-center gap-1.5"><img src={perfilTab === 'Crianças' ? iconeCriancaActive : iconeCriancaDefault} alt="Crianças" className="w-4 h-4" /> Crianças</span>, value: 'Crianças' },
          ]}
          value={perfilTab}
          onChange={(val) => setPerfilTab(val as string)}
        />

        {/* Gestantes e puérperas */}
        {perfilTab === 'Gestantes e puérperas' && (
          <div className="space-y-4">
            {/* Quantidade de gestações card */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="px-6 py-5 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                      <img src={iconeGestanteActive} alt="Gestante" className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-foreground">Quantidade de gestações</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        No total existem{' '}
                        <span className="font-semibold text-foreground">{resumo.totalGestantes} gestantes ativas</span>,
                        sendo que{' '}
                        <span className="font-semibold text-primary">{resumo.parirProx30Dias}</span>{' '}
                        têm probabilidade de parir nos próximos 30 dias.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-[13px] px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground">
                          <span className="font-semibold text-foreground">{resumo.percentMenores18}%</span> com menos de 18 anos
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[13px] px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground">
                          <span className="font-semibold text-foreground">{resumo.percentMaiores40}%</span> com mais de 40 anos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border border-t border-border">
                  <div className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <p className="text-[13px] text-muted-foreground">Total gestantes</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{resumo.totalGestantes}</p>
                  </div>
                  <div className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Baby className="w-4 h-4 text-muted-foreground" />
                      <p className="text-[13px] text-muted-foreground">Parir em 30 dias</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">{resumo.parirProx30Dias}</p>
                  </div>
                  <div className="px-5 py-4 text-center bg-[hsl(var(--status-regular-bg))]">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-[hsl(var(--status-regular))]" />
                      <p className="text-[13px] text-muted-foreground">Risco alto</p>
                    </div>
                    <p className="text-2xl font-bold text-[hsl(var(--status-regular))]">{resumo.riscoAlto}</p>
                  </div>
                  <div className="px-5 py-4 text-center bg-[hsl(var(--status-suficiente-bg))]">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <HeartPulse className="w-4 h-4 text-[hsl(var(--status-suficiente))]" />
                      <p className="text-[13px] text-muted-foreground">Risco intermediário</p>
                    </div>
                    <p className="text-2xl font-bold text-[hsl(var(--status-suficiente))]">{resumo.riscoIntermediario}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progresso das ações de pré-natal */}
            <Card>
              <CardContent className="py-5">
                <p className="text-sm font-medium text-muted-foreground mb-4">Progresso das ações de pré-natal</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <GaugeChart label="Consultas" done={qualidade.consultas.feitas} total={qualidade.consultas.total} />
                  <GaugeChart label="Procedimentos" done={qualidade.procedimentos.feitas} total={qualidade.procedimentos.total} />
                  <GaugeChart label="Vacinas" done={qualidade.vacinas.feitas} total={qualidade.vacinas.total} />
                  <GaugeChart label="Visitas" done={qualidade.visitas.feitas} total={qualidade.visitas.total} />
                </div>
              </CardContent>
              <div className="px-5 py-3 bg-muted/40 border-t border-border flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Dados calculados com base nos indicadores de qualidade do módulo de{' '}
                  <span
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => navigate('/financeiro/visao-geral')}
                  >
                    Financiamento APS
                  </span>.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Hipertensos */}
        {perfilTab === 'Hipertensos' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[hsl(var(--status-regular))]" />
                Pessoas com hipertensão sem consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8 gap-4">
              <GaugeChart
                label=""
                done={hipertensos.semConsulta}
                total={hipertensos.total}
                color="hsl(var(--primary))"
              />
              <p className="text-sm text-muted-foreground text-center">
                {hipertensos.semConsulta.toLocaleString('pt-BR')} ({hipertensos.percentSemConsulta}%){' '}
                <span className="font-semibold text-foreground">pessoas com hipertensão</span> estão sem consulta há mais de 1 ano.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Diabéticos */}
        {perfilTab === 'Diabéticos' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <img src={iconeDiabetesActive} alt="Diabetes" className="w-4 h-4" />
                Pessoas com diabetes tipo II sem consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8 gap-4">
              <GaugeChart
                label=""
                done={diabeticos.semConsulta}
                total={diabeticos.total}
                color="hsl(var(--primary))"
              />
              <p className="text-sm text-muted-foreground text-center">
                {diabeticos.semConsulta.toLocaleString('pt-BR')} ({diabeticos.percentSemConsulta}%){' '}
                <span className="font-semibold text-foreground">pessoas com diabetes</span> estão sem consulta há mais de 1 ano.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Crianças */}
        {perfilTab === 'Crianças' && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <img src={iconeCriancaActive} alt="Crianças" className="w-4 h-4" />
                <CardTitle className="text-base font-medium">Cobertura vacinal em crianças</CardTitle>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Faixa etária tabs */}
              <div className="flex gap-6 border-b border-border">
                {['Menores de 1 ano', 'Entre 1 e 2 anos'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCriancaFaixaTab(tab)}
                    className={`pb-2.5 text-sm font-medium transition-colors border-b-2 ${
                      criancaFaixaTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Vaccination table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-normal text-muted-foreground"></th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground text-[13px]">Crianças imunizadas</th>
                      <th className="text-right py-3 pl-4 font-semibold text-foreground text-[13px]">Crianças não imunizadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(vacinacaoCriancas[criancaFaixaTab as keyof typeof vacinacaoCriancas] || []).map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-b-0">
                        <td className="py-3 pr-4 text-foreground">{row.vacina}</td>
                        <td className="py-3 px-4 text-right text-muted-foreground">
                          {row.imunizadas.toLocaleString('pt-BR')} ({row.percImunizadas}%)
                        </td>
                        <td className="py-3 pl-4 text-right text-muted-foreground">
                          {row.naoImunizadas.toLocaleString('pt-BR')} ({row.percNaoImunizadas}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <div className="px-5 py-3 bg-[hsl(45,100%,95%)] border-t border-[hsl(45,80%,80%)] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[hsl(45,80%,40%)] shrink-0" />
              <p className="text-xs text-[hsl(45,50%,30%)]">
                Os dados apresentados são exclusivamente registrados na APS e na RNDS.
              </p>
            </div>
          </Card>
        )}
      </section>

      {/* ═══════════ MÉTRICAS APS ═══════════ */}
      <section className="space-y-4">
        <SectionHeader
          title="Métricas APS"
          icon={<Users className="w-4 h-4 text-primary" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nota IEGM */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                Nota IEGM
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8 gap-2">
              <span className="text-5xl font-bold text-primary">{metricas.iegm.nota}</span>
              <p className="text-sm text-primary font-medium">nota no I-Saúde</p>
              <div className="mt-4 text-center text-sm text-muted-foreground space-y-1">
                <p>IEGM {metricas.iegm.geral}</p>
                <p>nota do IEGM geral</p>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Notas referentes ao ano de {metricas.iegm.ano}.</p>
            </CardContent>
            <div className="px-5 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Fonte: TCE-SC.</p>
            </div>
          </Card>

          {/* ICSAPS */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-muted-foreground" />
                  Internações por Condições Sensíveis à Atenção Primária (ICSAPS)
                </CardTitle>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <span className="text-2xl font-bold text-primary shrink-0">{metricas.icsaps.municipio}%</span>
                <p className="text-sm text-muted-foreground">
                  das internações no município foram por Condições Sensíveis à Atenção Primária em {metricas.icsaps.ano}.
                </p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <span className="text-2xl font-bold text-primary shrink-0">{metricas.icsaps.residentes}%</span>
                <p className="text-sm text-muted-foreground">
                  das internações de residentes do município foram por Condições Sensíveis à Atenção Primária em {metricas.icsaps.ano}.
                </p>
              </div>
            </CardContent>
            <div className="px-5 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Fonte: SIH.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SalaDeSituacao;
