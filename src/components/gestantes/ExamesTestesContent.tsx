import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

const trimestres = [
  { value: '1', label: '1 trimestre' },
  { value: '2', label: '2 trimestre' },
  { value: '3', label: '3 trimestre' },
];

const testesData = [
  { nome: 'Teste rápido de gravidez', resultado: '0 (0%)' },
  { nome: 'Teste rápido para hepatite B', resultado: '70 (82,43%)' },
  { nome: 'Teste rápido para hepatite C', resultado: '16 (18,92%)' },
  { nome: 'Teste rápido para HIV', resultado: '50 (64,86%)' },
  { nome: 'Teste rápido para sífilis', resultado: '47 (63,51%)' },
];

const examesData = [
  { nome: 'Beta HCG qualitativo', solicitacao: '0 (0%)', avaliacao: '0 (0%)' },
  { nome: 'Coleta de material do colo de útero para exame citopatológico', solicitacao: '0 (0%)', avaliacao: '0 (0%)' },
  { nome: 'Coombs indireto', solicitacao: '53 (71,62%)', avaliacao: '0 (0%)' },
  { nome: 'Cultura de urina (urocultura)', solicitacao: '64 (86,49%)', avaliacao: '0 (0%)' },
  { nome: 'Eletroforese de hemoglobina', solicitacao: '0 (0%)', avaliacao: '0 (0%)' },
  { nome: 'EQU (Exame qualitativo de urina)', solicitacao: '74 (100%)', avaliacao: '0 (0%)' },
  { nome: 'Fator Rh', solicitacao: '66 (89,19%)', avaliacao: '0 (0%)' },
  { nome: 'Glicemia de jejum', solicitacao: '70 (94,59%)', avaliacao: '0 (0%)' },
  { nome: 'Hemograma completo', solicitacao: '72 (97,3%)', avaliacao: '0 (0%)' },
  { nome: 'Parasitológico de fezes', solicitacao: '1 (1,35%)', avaliacao: '0 (0%)' },
  { nome: 'Pesquisa para hormônio tireoestimulante – TSH***', solicitacao: '27 (35,14%)', avaliacao: '1 (1,35%)' },
  { nome: 'Sorologia hepatite B (HBsAg)', solicitacao: '37 (50%)', avaliacao: '0 (0%)' },
  { nome: 'Sorologia para hepatite C', solicitacao: '2 (2,7%)', avaliacao: '0 (0%)' },
  { nome: 'Sorologia para HIV', solicitacao: '65 (87,84%)', avaliacao: '0 (0%)' },
  { nome: 'Teste de avidez de IgG para toxoplasmose**', solicitacao: '0 (0%)', avaliacao: '0 (0%)' },
  { nome: 'Teste não treponêmico para a sífilis', solicitacao: '63 (85,14%)', avaliacao: '0 (0%)' },
  { nome: 'Tipo sanguíneo', solicitacao: '65 (87,84%)', avaliacao: '0 (0%)' },
  { nome: 'Toxoplasmose IgG', solicitacao: '68 (91,89%)', avaliacao: '0 (0%)' },
  { nome: 'Toxoplasmose IgM', solicitacao: '68 (91,89%)', avaliacao: '0 (0%)' },
  { nome: 'Ultrassonografia obstétrica', solicitacao: '68 (89,19%)', avaliacao: '2 (2,7%)' },
];

export const ExamesTestesContent: React.FC = () => {
  const [testesTrimestre, setTestesTrimestre] = useState('1');
  const [examesTrimestre, setExamesTrimestre] = useState('1');

  return (
    <div className="space-y-6">
      {/* Testes rápidos */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gestantes com testes realizados por trimestre de gestação
            </CardTitle>
            <div className="flex gap-1">
              {trimestres.map(t => (
                <Button
                  key={t.value}
                  variant={testesTrimestre === t.value ? 'default' : 'outline'}
                  size="sm"
                  className={cn("text-xs h-7 px-3", testesTrimestre !== t.value && "text-muted-foreground")}
                  onClick={() => setTestesTrimestre(t.value)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Testes</TableHead>
                <TableHead className="text-right pr-6">Gestantes testadas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testesData.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6 text-sm">{t.nome}</TableCell>
                  <TableCell className="text-right pr-6 text-sm tabular-nums">{t.resultado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Exames */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gestantes com exames realizados por trimestre de gestação
            </CardTitle>
            <div className="flex gap-1">
              {trimestres.map(t => (
                <Button
                  key={t.value}
                  variant={examesTrimestre === t.value ? 'default' : 'outline'}
                  size="sm"
                  className={cn("text-xs h-7 px-3", examesTrimestre !== t.value && "text-muted-foreground")}
                  onClick={() => setExamesTrimestre(t.value)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Exames</TableHead>
                <TableHead className="text-right">Com solicitação</TableHead>
                <TableHead className="text-right pr-6">Com avaliação (no trimestre de solicitação)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examesData.map((e, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6 text-sm">{e.nome}</TableCell>
                  <TableCell className="text-right text-sm tabular-nums">{e.solicitacao}</TableCell>
                  <TableCell className="text-right pr-6 text-sm tabular-nums">{e.avaliacao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-6 py-3 text-xs text-muted-foreground space-y-0.5 border-t">
            <p>**se IgG e IgM positivos</p>
            <p>***se TSH alterado fazer acompanhamento</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
