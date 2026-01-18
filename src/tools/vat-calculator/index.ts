import { Calculator } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de TVA',
  path: '/vat-calculator',
  description: 'Calculez rapidement le montant HT, TTC et la TVA. Convertissez entre prix hors taxes et toutes taxes comprises avec différents taux de TVA.',
  keywords: ['tva', 'vat', 'tax', 'ht', 'ttc', 'taxes', 'prix', 'calcul', 'montant', 'taux'],
  component: () => import('./vat-calculator.vue'),
  icon: Calculator,
  createdAt: new Date('2026-01-17'),
});
