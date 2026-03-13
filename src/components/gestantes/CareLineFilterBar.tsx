import React from 'react';
import { Select, Button } from 'antd';

interface CareLineFilterBarProps {
  onSearch?: () => void;
  onClear?: () => void;
}

const regionais = [
  { value: '1', label: '1ª RS Paranaguá - PR' },
  { value: '2', label: '2ª RS Metropolitana - PR' },
  { value: '3', label: '3ª RS Ponta Grossa - PR' },
  { value: '4', label: '4ª RS Irati - PR' },
  { value: '5', label: '5ª RS Guarapuava - PR' },
  { value: '6', label: '6ª RS União da Vitória - PR' },
  { value: '7', label: '7ª RS Pato Branco - PR' },
  { value: '8', label: '8ª RS Francisco Beltrão - PR' },
  { value: '9', label: '9ª RS Foz do Iguaçu - PR' },
  { value: '10', label: '10ª RS Cascavel - PR' },
  { value: '11', label: '11ª RS Campo Mourão - PR' },
  { value: '12', label: '12ª RS Umuarama - PR' },
  { value: '13', label: '13ª RS Cianorte - PR' },
  { value: '14', label: '14ª RS Paranavaí - PR' },
  { value: '15', label: '15ª RS Maringá - PR' },
  { value: '16', label: '16ª RS Apucarana - PR' },
  { value: '17', label: '17ª RS Londrina - PR' },
  { value: '18', label: '18ª RS Cornélio Procópio - PR' },
  { value: '19', label: '19ª RS Jacarezinho - PR' },
  { value: '20', label: '20ª RS Toledo - PR' },
  { value: '21', label: '21ª RS Telêmaco Borba - PR' },
  { value: '22', label: '22ª RS Ivaiporã - PR' },
];

export const CareLineFilterBar: React.FC<CareLineFilterBarProps> = ({
  onSearch,
  onClear,
}) => {
  return (
     <div className="rounded-lg bg-card p-4 shadow-sm space-y-4">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
         <div className="flex flex-col gap-1.5">
           <label className="text-sm font-medium text-foreground">Regional de saúde</label>
           <Select
             placeholder="Selecione a regional"
             style={{ width: '100%' }}
             allowClear
             showSearch
             optionFilterProp="label"
             options={regionais}
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
