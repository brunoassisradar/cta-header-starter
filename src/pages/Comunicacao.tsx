import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { InfoCard } from '@/components/financiamento/InfoCard';
import { FAQAccordion } from '@/components/financiamento/FAQAccordion';
import { MessageSquare, Send, BarChart3 } from 'lucide-react';

const faqItems = [
  {
    question: 'O que é o módulo de Comunicação?',
    answer: 'O módulo de Comunicação permite criar e gerenciar campanhas de acompanhamento de pacientes via WhatsApp e outros canais, facilitando a comunicação ativa com o público da Atenção Primária à Saúde.',
  },
  {
    question: 'Como funciona uma campanha de comunicação?',
    answer: 'Você define o público-alvo com base em critérios clínicos (linha de cuidado, faixa etária, condição de saúde), cria a mensagem e agenda o disparo. O sistema acompanha entregas, leituras e interações em tempo real.',
  },
  {
    question: 'Quais canais estão disponíveis?',
    answer: 'Atualmente o canal principal é o WhatsApp. Novos canais como SMS e e-mail poderão ser adicionados futuramente.',
  },
  {
    question: 'Como acompanho os resultados de uma campanha?',
    answer: 'Cada campanha possui um funil de conversão detalhado mostrando total de destinatários, mensagens enviadas, entregues, lidas e interações, além da taxa de engajamento.',
  },
];

const Comunicacao: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Comunicação"
        breadcrumbs={[{ label: 'Comunicação' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          icon={<MessageSquare className="h-6 w-6 text-white" />}
          title="Campanhas de Comunicação"
          description="Crie e gerencie campanhas de acompanhamento de pacientes via WhatsApp. Defina o público-alvo, personalize mensagens e acompanhe os resultados em tempo real."
          links={[]}
        />
        <InfoCard
          icon={<Send className="h-6 w-6 text-white" />}
          title="Disparos Automatizados"
          description="Agende disparos de mensagens para grupos específicos de pacientes com base em critérios clínicos, linhas de cuidado e condições de saúde."
          links={[]}
        />
        <InfoCard
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          title="Acompanhamento e Métricas"
          description="Monitore o funil de conversão das suas campanhas: envios, entregas, leituras e interações. Acompanhe a taxa de engajamento do seu público."
          links={[]}
        />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
};

export default Comunicacao;
