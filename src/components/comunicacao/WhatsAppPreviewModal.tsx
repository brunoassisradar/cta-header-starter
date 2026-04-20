import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GitBranch, Send, Link2, Check, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

export type PreviewMode = 'view' | 'iniciar';

interface MessageStep {
  id: string;
  type: 'message' | 'question' | 'condition';
  label?: string;
  content: string;
  options?: string[];
  conditionalNote?: string;
}

const messageFlow: MessageStep[] = [
  {
    id: 'msg-1',
    type: 'message',
    label: 'Mensagem inicial',
    content: 'Olá, {{nome}}! 👋 Aqui é da equipe de acompanhamento do *Hospital São Lucas*. Faz 90 dias desde a sua alta após o AVC. Podemos conversar rapidinho sobre como você está?',
  },
  {
    id: 'q-1',
    type: 'question',
    label: 'Pergunta 1 — Mobilidade',
    content: 'Como você avalia sua capacidade de se locomover hoje?',
    options: ['1 - Muito ruim', '2 - Ruim', '3 - Regular', '4 - Boa', '5 - Excelente'],
  },
  {
    id: 'cond-1',
    type: 'condition',
    content: 'Se resposta ≤ 2: encaminhar para próxima pergunta de suporte. Caso contrário, pular para Pergunta 3.',
    conditionalNote: 'Regra condicional automática',
  },
  {
    id: 'q-2',
    type: 'question',
    label: 'Pergunta 2 — Suporte (condicional)',
    content: 'Você tem recebido apoio de familiares ou cuidadores nas atividades diárias?',
    options: ['Sim, sempre', 'Às vezes', 'Raramente', 'Não'],
  },
  {
    id: 'q-3',
    type: 'question',
    label: 'Pergunta 3 — Bem-estar',
    content: 'Em uma escala de 0 a 10, como você avalia seu bem-estar geral nas últimas duas semanas?',
    options: ['0 - 3', '4 - 6', '7 - 10'],
  },
  {
    id: 'msg-final',
    type: 'message',
    label: 'Mensagem de encerramento',
    content: 'Muito obrigado pelas respostas, {{nome}}! 💙 Sua equipe foi notificada e entrará em contato caso seja necessário. Tenha um ótimo dia!',
  },
];

interface Props {
  open: boolean;
  mode: PreviewMode;
  patientName?: string;
  patientPhone?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const WhatsAppPreviewModal: React.FC<Props> = ({ open, mode, patientName, patientPhone, onClose, onConfirm }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado para a área de transferência');
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="flex items-center gap-2">
                {mode === 'iniciar' ? 'Iniciar disparo' : 'Preview da mensagem'}
                <Badge variant="secondary" className="text-xs">WhatsApp</Badge>
              </DialogTitle>
              <DialogDescription className="mt-1">
                {patientName ? (
                  <>Para <strong className="text-foreground">{patientName}</strong> · {patientPhone}</>
                ) : (
                  'Simulação completa do fluxo de mensagens com regras condicionais'
                )}
              </DialogDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1.5 shrink-0">
              <Link2 className="h-3.5 w-3.5" />
              Copiar link
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[#e5ddd5] dark:bg-muted px-4 py-6">
          <div className="space-y-3 max-w-md mx-auto">
            {messageFlow.map((step, idx) => (
              <React.Fragment key={step.id}>
                {step.type === 'condition' ? (
                  <div className="flex items-center gap-2 my-3 px-3">
                    <div className="flex-1 border-t border-dashed border-amber-500/50" />
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                      <GitBranch className="h-3 w-3" />
                      {step.conditionalNote}
                    </div>
                    <div className="flex-1 border-t border-dashed border-amber-500/50" />
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 italic px-2 text-center w-full mt-1">
                      {step.content}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {step.label && (
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground px-1">
                        {idx + 1}. {step.label}
                      </div>
                    )}
                    <div className="bg-white dark:bg-card rounded-lg rounded-tl-none px-3 py-2 shadow-sm max-w-[85%] relative">
                      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{step.content}</p>
                      {step.options && (
                        <div className="mt-2 pt-2 border-t border-border space-y-1">
                          {step.options.map((opt) => (
                            <div key={opt} className="text-xs text-primary py-1 px-2 rounded hover:bg-muted/50 cursor-default">
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] text-muted-foreground">10:32</span>
                        <CheckCheck className="h-3 w-3 text-blue-500" />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-background sm:justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            {messageFlow.filter((s) => s.type !== 'condition').length} mensagens · {messageFlow.filter((s) => s.type === 'condition').length} regra condicional
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {mode === 'iniciar' ? 'Cancelar' : 'Fechar'}
            </Button>
            {mode === 'iniciar' && (
              <Button onClick={onConfirm} className="gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Confirmar e iniciar disparo
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPreviewModal;
