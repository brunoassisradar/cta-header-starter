import React from 'react';
import { Select, Button, Progress } from 'antd';

interface FinanceiroFilterBarProps {
  onSearch?: () => void;
  onClear?: () => void;
}

export const FinanceiroFilterBar: React.FC<FinanceiroFilterBarProps> = ({ onSearch, onClear }) => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Ano</label>
          <Select
            defaultValue="2026"
            style={{ width: '100%' }}
            options={[
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Bimestre</label>
          <Select
            defaultValue="2"
            style={{ width: '100%' }}
            options={[
              { value: '1', label: '1° Bimestre' },
              { value: '2', label: '2° Bimestre' },
              { value: '3', label: '3° Bimestre' },
              { value: '4', label: '4° Bimestre' },
              { value: '5', label: '5° Bimestre' },
              { value: '6', label: '6° Bimestre' },
            ]}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Progress
            percent={33}
            steps={6}
            size="small"
            showInfo={false}
            strokeColor="hsl(var(--primary))"
            trailColor="hsl(var(--muted))"
            className="[&_.ant-progress-steps-item]:!w-3 [&_.ant-progress-steps-item]:!h-1.5"
          />
          <span className="text-sm text-muted-foreground">Faltam 30 dias para o fim do bimestre</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onClear}>Limpar filtros</Button>
          <Button type="primary" onClick={onSearch}>Buscar</Button>
        </div>
      </div>
    </div>
  );
};
