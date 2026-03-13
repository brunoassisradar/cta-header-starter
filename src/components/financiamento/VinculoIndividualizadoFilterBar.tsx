import React from 'react';
import { Select, Input, Radio, Button } from 'antd';
import { Search, X } from 'lucide-react';

interface VinculoIndividualizadoFilterBarProps {
  onSearch?: () => void;
  onClear?: () => void;
}

export const VinculoIndividualizadoFilterBar: React.FC<VinculoIndividualizadoFilterBarProps> = ({
  onSearch,
  onClear,
}) => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm space-y-4">
      <p className="text-sm font-medium text-foreground">Filtros</p>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Buscar por nome, CPF ou CNS</label>
          <Input placeholder="Digite aqui" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Unidade de saúde</label>
          <Select
            mode="multiple"
            placeholder="Selecione uma ou mais unidades"
            style={{ width: '100%' }}
            maxTagCount={2}
            options={[
              { value: 'ubs1', label: 'UBS Centro' },
              { value: 'ubs2', label: 'UBS Norte' },
              { value: 'ubs3', label: 'UBS Sul' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Equipe</label>
          <Select
            mode="multiple"
            placeholder="Selecione uma ou mais equipes"
            style={{ width: '100%' }}
            maxTagCount={2}
            options={[
              { value: 'eq1', label: 'Equipe 001 - ESF' },
              { value: 'eq2', label: 'Equipe 002 - ESF' },
              { value: 'eq3', label: 'Equipe 003 - eAP' },
            ]}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Microárea (registrada na FCI)</label>
          <Select
            placeholder="Selecione uma microárea"
            style={{ width: '100%' }}
            options={[
              { value: '01', label: 'Microárea 01' },
              { value: '02', label: 'Microárea 02' },
              { value: '03', label: 'Microárea 03' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Critério demográfico</label>
          <Select
            placeholder="Selecione um critério"
            style={{ width: '100%' }}
            options={[
              { value: 'idoso', label: 'Idoso' },
              { value: 'crianca', label: 'Criança' },
              { value: 'gestante', label: 'Gestante' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Critério de vulnerabilidade socioeconômica</label>
          <Select
            placeholder="Selecione um critério"
            style={{ width: '100%' }}
            options={[
              { value: 'bolsa_familia', label: 'Bolsa Família' },
              { value: 'bpc', label: 'BPC' },
              { value: 'outro', label: 'Outro' },
            ]}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Cadastro</label>
          <Select
            mode="multiple"
            placeholder="Selecione um ou mais critérios"
            style={{ width: '100%' }}
            maxTagCount={2}
            options={[
              { value: 'domiciliar', label: 'Cadastro domiciliar' },
              { value: 'individual', label: 'Cadastro individual' },
              { value: 'completo', label: 'Cadastro completo' },
              { value: 'sem', label: 'Sem cadastro atualizado' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Acompanhamento</label>
          <Select
            mode="multiple"
            placeholder="Selecione um ou mais critérios"
            style={{ width: '100%' }}
            maxTagCount={2}
            options={[
              { value: 'acompanhada', label: 'Acompanhada' },
              { value: 'nao_acompanhada', label: 'Não acompanhada' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Sexo</label>
          <Radio.Group className="mt-1.5">
            <Radio value="feminino">Feminino</Radio>
            <Radio value="masculino">Masculino</Radio>
          </Radio.Group>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button onClick={onClear}>Limpar filtros</Button>
        <Button type="primary" onClick={onSearch}>Buscar</Button>
      </div>
    </div>
  );
};
