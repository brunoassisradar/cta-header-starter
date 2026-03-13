import React from 'react';
import { Select, Button } from 'antd';

interface FilterBarProps {
  onSearch?: () => void;
  onClear?: () => void;
  periods?: string[];
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearch, 
  onClear,
  periods = [],
  selectedPeriod = '',
  onPeriodChange,
}) => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm space-y-4">
      {/* Linha 1: Todos os filtros (Ano, Quadrimestre, Período, Tipo de equipe, Unidade) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <label className="text-sm font-medium text-foreground">Quadrimestre</label>
          <Select
            defaultValue="1"
            style={{ width: '100%' }}
            options={[
              { value: '1', label: '1° Quadrimestre' },
              { value: '2', label: '2° Quadrimestre', disabled: true },
              { value: '3', label: '3° Quadrimestre', disabled: true },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Tipo de equipe</label>
          <Select
            placeholder="Tipo de equipe"
            style={{ width: '100%' }}
            options={[
              { value: 'esf', label: 'eSF' },
              { value: 'eap', label: 'eAP' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Unidade</label>
          <Select
            mode="multiple"
            placeholder="Selecione uma ou mais unidade"
            style={{ width: '100%' }}
            maxTagCount={2}
            options={[
              { value: 'ubs1', label: 'UBS Centro' },
              { value: 'ubs2', label: 'UBS Norte' },
              { value: 'ubs3', label: 'UBS Sul' },
            ]}
          />
        </div>
      </div>

      {/* Linha 3: Botões */}
      <div className="flex items-center justify-end">

        <div className="flex items-center gap-2">
          <Button onClick={onClear}>
            Limpar filtros
          </Button>
          <Button type="primary" onClick={onSearch}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};
