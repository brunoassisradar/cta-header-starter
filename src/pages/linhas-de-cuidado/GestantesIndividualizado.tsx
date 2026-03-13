import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

const GestantesIndividualizado: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Individualizado de Gestantes e Puérperas"
        breadcrumbs={[
          { label: 'Linhas de cuidado', path: '/linhas-de-cuidado' },
          { label: 'Gestantes e Puérperas', path: '/linhas-de-cuidado/gestantes' },
          { label: 'Individualizado' },
        ]}
      />
      <div className="rounded-lg bg-card p-8 shadow-sm text-center text-muted-foreground">
        <p>Conteúdo do individualizado em construção.</p>
      </div>
    </div>
  );
};

export default GestantesIndividualizado;
