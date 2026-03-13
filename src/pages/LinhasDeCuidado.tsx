import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { InfoCard } from '@/components/financiamento/InfoCard';
import { FAQAccordion } from '@/components/financiamento/FAQAccordion';
import { Heart, Activity, Baby, UserRound, Brain } from 'lucide-react';

const faqItems = [
  {
    question: 'O que são as Linhas de Cuidado?',
    answer: 'As Linhas de Cuidado são estratégias de organização da atenção à saúde que visam garantir o cuidado integral e contínuo aos usuários, articulando ações de promoção, prevenção, tratamento e reabilitação em todos os níveis de atenção.',
  },
  {
    question: 'Como são definidos os grupos prioritários?',
    answer: 'Os grupos prioritários são definidos com base em critérios epidemiológicos, prevalência de condições crônicas e vulnerabilidade, seguindo as diretrizes do Ministério da Saúde e as necessidades locais de cada município.',
  },
  {
    question: 'Qual a relação entre Linhas de Cuidado e o financiamento da APS?',
    answer: 'O desempenho nos indicadores das Linhas de Cuidado pode impactar os repasses financeiros da APS, uma vez que a qualidade do acompanhamento das condições crônicas é avaliada nos componentes de qualidade do financiamento.',
  },
  {
    question: 'Como acompanhar os indicadores de cada linha de cuidado?',
    answer: 'Acesse cada submenu específico (Hipertensão, Diabetes, etc.) para visualizar os indicadores detalhados, relatórios e dados individualizados de cada linha de cuidado.',
  },
  {
    question: 'Quais profissionais podem acessar este módulo?',
    answer: 'Gestores municipais, coordenadores de Atenção Primária, médicos, enfermeiros e demais profissionais da equipe de saúde com perfil de acesso ao sistema.',
  },
];

const LinhasDeCuidado: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Linhas de Cuidado"
        breadcrumbs={[
          { label: 'Linhas de Cuidado' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          icon={<Activity className="h-6 w-6 text-white" />}
          title="Pessoas com Hipertensão"
          description="Acompanhamento de pessoas diagnosticadas com hipertensão arterial sistêmica (HAS), considerando indivíduos com registro ativo de CID/CIAP de hipertensão e aferições de pressão arterial nas consultas de rotina."
          links={[]}
        />
        <InfoCard
          icon={<Heart className="h-6 w-6 text-white" />}
          title="Pessoas com Diabetes"
          description="Monitoramento de pessoas com diagnóstico de diabetes mellitus (tipo 1 ou tipo 2), identificadas por registro de CID/CIAP correspondente, com acompanhamento de hemoglobina glicada e glicemia de jejum."
          links={[]}
        />
        <InfoCard
          icon={<Baby className="h-6 w-6 text-white" />}
          title="Gestantes e Puérperas"
          description="Acompanhamento de mulheres no período gestacional e puerperal (até 42 dias pós-parto), incluindo pré-natal, exames obrigatórios, vacinação e consultas de acompanhamento conforme protocolo ministerial."
          links={[]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          icon={<UserRound className="h-6 w-6 text-white" />}
          title="Idosos"
          description="Cuidado voltado a pessoas com 60 anos ou mais, contemplando avaliação multidimensional, rastreio de fragilidade, acompanhamento de condições crônicas e prevenção de agravos relacionados ao envelhecimento."
          links={[]}
        />
        <InfoCard
          icon={<Brain className="h-6 w-6 text-white" />}
          title="Saúde Mental"
          description="Atenção a pessoas com transtornos mentais ou sofrimento psíquico, incluindo diagnósticos de depressão, ansiedade, transtorno bipolar e esquizofrenia, com foco no cuidado integral e na articulação com a RAPS."
          links={[]}
        />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
};

export default LinhasDeCuidado;
