import React, { useState } from 'react';
import { Modal } from 'antd';
import { HelpCircle, Smile, Meh, Frown, ThumbsUp } from 'lucide-react';
type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';
interface ResultadoMunicipioProps {
  escoreCadastro: number;
  escoreAcompanhamento: number;
  notaFinal: number;
  classificacao: Classification;
}
const classificationConfig: Record<Classification, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  otimo: {
    label: 'ÓTIMO',
    color: '#3C8DBC',
    bgColor: 'bg-[#3C8DBC]/10'
  },
  bom: {
    label: 'BOM',
    color: '#00A65A',
    bgColor: 'bg-[#00A65A]/10'
  },
  suficiente: {
    label: 'SUFICIENTE',
    color: '#F0AD4E',
    bgColor: 'bg-[#F0AD4E]/10'
  },
  regular: {
    label: 'REGULAR',
    color: '#DD4B39',
    bgColor: 'bg-[#DD4B39]/10'
  }
};
const ClassificationIcon: React.FC<{
  classification: Classification;
  size?: number;
}> = ({
  classification,
  size = 32
}) => {
  const config = classificationConfig[classification];
  const iconProps = {
    size,
    color: config.color,
    strokeWidth: 1.5
  };
  switch (classification) {
    case 'otimo':
      return <ThumbsUp {...iconProps} />;
    case 'bom':
      return <Smile {...iconProps} />;
    case 'suficiente':
      return <Meh {...iconProps} />;
    case 'regular':
      return <Frown {...iconProps} />;
  }
};
export const ResultadoMunicipio: React.FC<ResultadoMunicipioProps> = ({
  escoreCadastro = 3,
  escoreAcompanhamento = 3.5,
  notaFinal = 6.5,
  classificacao = 'suficiente'
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const config = classificationConfig[classificacao];
  return <>
      <div className="bg-card rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-base font-semibold text-foreground">Resultado final (estimado) </h3>
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={() => setIsHelpOpen(true)} />
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Escore Cadastro */}
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{escoreCadastro}</div>
            <div className="text-sm text-muted-foreground">(Escore X - Dimensão Cadastro)</div>
          </div>

          {/* Plus sign */}
          <div className="text-2xl font-light text-muted-foreground">+</div>

          {/* Escore Acompanhamento */}
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{escoreAcompanhamento}</div>
            <div className="text-sm text-muted-foreground">(Escore Y - Dimensão Acompanhamento)</div>
          </div>

          {/* Equals sign */}
          <div className="text-2xl font-light text-muted-foreground">=</div>

          {/* Result */}
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{notaFinal}</div>
          </div>

          {/* Classification badge */}
          <div className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg ${config.bgColor}`}>
            <ClassificationIcon classification={classificacao} size={28} />
            <span className="text-xs font-semibold mt-1" style={{
            color: config.color
          }}>
              {config.label}
            </span>
          </div>
        </div>
      </div>

      <Modal title="Resultado Final do Município" open={isHelpOpen} onCancel={() => setIsHelpOpen(false)} footer={null}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            O resultado final do município é calculado pela soma dos escores das dimensões de Cadastro e Acompanhamento.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3C8DBC]" />
              <span className="text-sm"><strong>Ótimo:</strong> Nota ≥ 8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00A65A]" />
              <span className="text-sm"><strong>Bom:</strong> Nota ≥ 6 e &lt; 8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F0AD4E]" />
              <span className="text-sm"><strong>Suficiente:</strong> Nota ≥ 4 e &lt; 6</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DD4B39]" />
              <span className="text-sm"><strong>Regular:</strong> Nota &lt; 4</span>
            </div>
          </div>
        </div>
      </Modal>
    </>;
};