import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { HelpCircle, Smile, AlertCircle, FileText } from 'lucide-react';
import { Tooltip } from 'antd';
import { Button } from '@/components/ui/button';

interface AcompanhamentoResumoProps {
  totalPessoas?: number;
  pessoasAcompanhadas?: number;
  pessoasAcompanhadasPercent?: number;
  semAcompanhamento?: number;
  semAcompanhamentoPercent?: number;
  periodoInicio?: string;
  periodoFim?: string;
}

export const AcompanhamentoResumo: React.FC<AcompanhamentoResumoProps> = ({
  totalPessoas = 13358,
  pessoasAcompanhadas = 11369,
  pessoasAcompanhadasPercent = 85.1,
  semAcompanhamento = 1989,
  semAcompanhamentoPercent = 14.9,
  periodoInicio = '01/05/2025',
  periodoFim = '30/04/2026'
}) => {
  // Dados do resumo de detalhamento (pessoas sem acompanhamento)
  const detalheSemAcompanhamento = {
    semCriterios: 1488,
    idososOuCriancas: 501,
    beneficiariosBolsaFamilia: 0,
    idososCriancasBolsaFamilia: 0
  };

  // Dados da tabela de fator multiplicação
  const fatorMultiplicacao = [
    { criterio: 'Sem critérios', numeroPessoas: 7864, fator: 1.0 },
    { criterio: 'Apenas pessoas idosas ou crianças', numeroPessoas: 3505, fator: 1.2 },
    { criterio: 'Pessoas beneficiárias do Bolsa Família e/ou BPC', numeroPessoas: 0, fator: 1.3 },
    { criterio: 'Pessoas idosas ou crianças e beneficiárias do Bolsa Família e/ou BPC', numeroPessoas: 0, fator: 2.5 },
  ];

  const calcularTotal = (linha: typeof fatorMultiplicacao[0]) => {
    return Math.round(linha.numeroPessoas * linha.fator);
  };

  const somaTotal = fatorMultiplicacao.reduce((acc, linha) => acc + calcularTotal(linha), 0);
  const parametro = 19500;
  const classificacao = ((somaTotal / parametro) * 100).toFixed(1);

  // Dados do quantitativo de pessoas acompanhadas
  const quantitativoAcompanhamento = [
    { 
      label: 'pessoas sem critérios demográfico e de vulnerabilidade socioeconômica acompanhadas',
      acompanhadas: 7864,
      percent: 84.1,
      total: 9352,
      totalLabel: 'pessoas sem critérios demográfico e socioeconômico'
    },
    { 
      label: 'pessoas idosas ou crianças acompanhadas sem vulnerabilidade socioeconômica',
      acompanhadas: 3505,
      percent: 87.5,
      total: 4006,
      totalLabel: 'pessoas idosas ou crianças sem critério de vulnerabilidade socioeconômica'
    },
    { 
      label: 'pessoas sem critério demográfico beneficiárias do Bolsa Família e/ou BPC acompanhadas',
      acompanhadas: 0,
      percent: 0,
      total: 0,
      totalLabel: 'pessoas sem critério demográfico beneficiárias do Bolsa Família e/ou BPC'
    },
    { 
      label: 'pessoas idosas ou crianças e beneficiárias do Bolsa Família e/ou BPC acompanhadas',
      acompanhadas: 0,
      percent: 0,
      total: 0,
      totalLabel: 'pessoas idosas ou crianças e beneficiárias do Bolsa Família e/ou BPC'
    },
  ];

  const chartData = [{
    name: 'Acompanhadas',
    value: pessoasAcompanhadas,
    color: '#3C8DBC'
  }, {
    name: 'Sem acompanhamento',
    value: semAcompanhamento,
    color: '#E5E7EB'
  }];

  return (
    <div className="rounded-lg bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Resumo</h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Donut Chart */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={62} paddingAngle={0} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">
                  {totalPessoas.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-muted-foreground text-center leading-tight">
                  total de pessoas<br />com cadastro<br />atualizado
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Pessoas Acompanhadas */}
            <div className="gap-6 flex items-start justify-start">
              <div className="gap-3 flex-1 flex items-start justify-start">
                <div className="mt-1.5 w-3 h-3 rounded-full border-2 border-[#3C8DBC] shrink-0" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{pessoasAcompanhadas.toLocaleString('pt-BR')} ({pessoasAcompanhadasPercent.toLocaleString('pt-BR')}%)</span>{' '}
                    pessoas acompanhadas, ou seja, tiveram mais de 1 contato assistencial nos 12 meses anteriores à data de término do quadrimestre ({periodoInicio} - {periodoFim})
                  </p>
                </div>
              </div>
            </div>

            {/* Sem Acompanhamento */}
            <div className="gap-6 flex items-start justify-start">
              <div className="gap-3 flex-1 flex items-start justify-start">
                <div className="mt-1.5 w-3 h-3 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{semAcompanhamento.toLocaleString('pt-BR')} ({semAcompanhamentoPercent.toLocaleString('pt-BR')}%)</span>{' '}
                    pessoas que não tiveram mais de 1 contato assistencial nos 12 meses anteriores à data de término do quadrimestre ({periodoInicio} - {periodoFim})
                  </p>
                </div>
              </div>
              
              {/* Detalhamento */}
              <div className="shrink-0 border-l-2 border-muted pl-4 space-y-1">
                <p className="text-sm text-foreground">
                  • <span className="font-medium">{detalheSemAcompanhamento.semCriterios.toLocaleString('pt-BR')}</span> não apresentam critérios demográfico e de vulnerabilidade socioeconômica
                </p>
                <p className="text-sm text-foreground">
                  • <span className="font-medium">{detalheSemAcompanhamento.idososOuCriancas.toLocaleString('pt-BR')}</span> são pessoas idosas ou crianças sem vulnerabilidade socioeconômica
                </p>
                <p className="text-sm text-foreground">
                  • <span className="font-medium">{detalheSemAcompanhamento.beneficiariosBolsaFamilia.toLocaleString('pt-BR')}</span> são pessoas sem critério demográfico beneficiárias do Bolsa Família e/ou BPC
                </p>
                <p className="text-sm text-foreground">
                  • <span className="font-medium">{detalheSemAcompanhamento.idososCriancasBolsaFamilia.toLocaleString('pt-BR')}</span> são pessoas idosas ou crianças e beneficiárias do Bolsa Família e/ou BPC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela Fator Multiplicação */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">1. Fator multiplicação</h4>
        
        <div className="overflow-hidden rounded-lg border border-border">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_auto_1fr_auto_1fr] bg-muted/50 text-xs font-medium text-muted-foreground">
            <div className="px-4 py-3 text-center">Critérios</div>
            <div className="px-4 py-3 text-center">Número de pessoas</div>
            <div className="px-2 py-3 text-center"></div>
            <div className="px-4 py-3 text-center">Fator multiplicação</div>
            <div className="px-2 py-3 text-center"></div>
            <div className="px-4 py-3 text-center">Total</div>
          </div>

          {/* Rows */}
          {fatorMultiplicacao.map((linha, index) => (
            <div key={index} className="grid grid-cols-[2fr_1fr_auto_1fr_auto_1fr] border-t border-border items-center">
              <div className="px-4 py-4">
                <p className="text-sm text-foreground">{linha.criterio}</p>
              </div>
              <div className="px-4 py-4 text-center">
                <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                  {linha.numeroPessoas.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="px-2 py-4 text-center text-muted-foreground">×</div>
              <div className="px-4 py-4 text-center">
                <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                  {linha.fator.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
                </span>
              </div>
              <div className="px-2 py-4 text-center text-muted-foreground">=</div>
              <div className="px-4 py-4 text-center">
                <span className="inline-flex items-center justify-center px-4 py-2 bg-muted/50 rounded text-sm font-medium text-foreground min-w-[80px]">
                  {calcularTotal(linha).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção 2 - Cálculo e classificação do município */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-6">
          <h4 className="text-sm font-semibold text-foreground">2. Cálculo e classificação no município</h4>
          <Tooltip title="A classificação é calculada dividindo a soma dos acompanhamentos ponderados pelo parâmetro total das equipes, multiplicado por 100">
            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          {/* Fração */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-base font-medium text-foreground">
              {fatorMultiplicacao.map((linha, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-muted-foreground">+</span>}
                  <span>{calcularTotal(linha).toLocaleString('pt-BR')}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="w-full h-px bg-border my-2" />
            <div className="text-sm text-muted-foreground">
              {parametro.toLocaleString('pt-BR')} (Parâmetro calculado pelas equipes)
            </div>
          </div>

          {/* Multiplicação e resultado */}
          <div className="flex items-center gap-4 text-lg font-medium text-foreground">
            <span className="text-muted-foreground">×</span>
            <span>100</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-xl font-bold">{classificacao}</span>
          </div>

          {/* Badge de classificação */}
          <div className="flex flex-col items-center gap-1 px-6 py-3 bg-[#00A65A]/10 rounded-lg">
            <Smile className="w-8 h-8 text-[#00A65A]" />
            <span className="text-xs font-semibold text-[#00A65A] uppercase tracking-wide">BOM</span>
          </div>
        </div>
      </div>

      {/* Seção - Quantitativo de pessoas acompanhadas */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">
          Quantitativo de pessoas acompanhadas de acordo com os critérios demográfico e de vulnerabilidade socioeconômica
        </h4>
        
        <div className="space-y-4">
          {quantitativoAcompanhamento.map((item, index) => {
            const colors = ['#00A65A', '#00A65A', '#6B7280', '#6B7280'];
            const bgColors = ['#00A65A', '#00A65A', '#9CA3AF', '#9CA3AF'];
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-4">
                  {/* Barra de progresso */}
                  <div className="flex-1 relative">
                    <div className="h-6 bg-muted/30 rounded overflow-hidden">
                      <div 
                        className="h-full rounded-l flex items-center px-2"
                        style={{ 
                          width: item.total > 0 ? `${item.percent}%` : '2%',
                          backgroundColor: bgColors[index]
                        }}
                      >
                        {item.percent > 0 && (
                          <span className="text-xs font-medium text-white">{item.percent}%</span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.acompanhadas.toLocaleString('pt-BR')} ({item.percent > 0 ? `${item.percent}%` : 'undefined%'}) {item.label}
                    </p>
                  </div>
                  
                  {/* Total */}
                  <div className="shrink-0 text-right min-w-[200px]">
                    <p className="text-xs text-muted-foreground">
                      Total de {item.total.toLocaleString('pt-BR')} {item.totalLabel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seção Pontos de Atenção */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Pontos de atenção</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 - Sem identificação no CADSUS */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start gap-1 mb-4">
              <p className="text-sm text-foreground">
                Quantitativo de acompanhamentos, dos últimos 6 meses, com usuários que não possuem identificação no CADSUS
              </p>
              <Tooltip title="Acompanhamentos que não possuem CPF ou CNS válidos no sistema CADSUS">
                <HelpCircle className="w-4 h-4 text-muted-foreground shrink-0 cursor-help" />
              </Tooltip>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-[#F0AD4E]" />
              <span className="text-3xl font-bold text-foreground">187</span>
              <Button variant="outline" size="sm" className="mt-2 gap-2">
                <FileText className="w-4 h-4" />
                Ir para Inconsistências
              </Button>
            </div>
          </div>

          {/* Card 2 - Fichas com atendimentos sem cadastro */}
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm text-foreground mb-4">
              Quantitativo de fichas com atendimentos nos últimos 12 meses e sem cadastro individual
            </p>
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-[#F0AD4E]" />
              <span className="text-3xl font-bold text-foreground">0</span>
              <Button variant="outline" size="sm" className="mt-2 gap-2">
                <FileText className="w-4 h-4" />
                Ir para Críticas
              </Button>
            </div>
          </div>

          {/* Card 3 - Critério de acompanhamento incompleto */}
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm text-foreground mb-4">
              Quantitativo de pessoas com critério de acompanhamento incompleto
            </p>
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-[#F0AD4E]" />
              <span className="text-3xl font-bold text-foreground">209</span>
              <Button variant="outline" size="sm" className="mt-2 gap-2">
                <FileText className="w-4 h-4" />
                Ir para Individualizado
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé com informações de envio */}
      <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Último envio de Atendimentos individuais do município foi em <span className="font-medium text-foreground">15/01/2026</span>;
          </p>
          <p className="text-sm text-muted-foreground">
            Último envio de Atividade Coletiva do município foi em <span className="font-medium text-foreground">15/01/2026</span>;
          </p>
          <p className="text-sm text-muted-foreground">
            Último envio de Vacinação do município foi em <span className="font-medium text-foreground">15/01/2026</span>;
          </p>
          <p className="text-sm text-muted-foreground">
            Último envio de Procedimentos do município foi em <span className="font-medium text-foreground">15/01/2026</span>;
          </p>
          <p className="text-sm text-muted-foreground">
            Último envio de Visitas Domiciliares e Territoriais do município foi em <span className="font-medium text-foreground">15/01/2026</span>;
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 shrink-0">
          <FileText className="w-4 h-4" />
          Ir para Recebimento de dados
        </Button>
      </div>
    </div>
  );
};

export default AcompanhamentoResumo;
