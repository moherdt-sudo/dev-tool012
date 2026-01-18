import { Discount } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de Remise',
  path: '/discount-calculator',
  description: 'Calculez rapidement les remises et réductions. Trouvez le prix final après remise, le pourcentage de réduction ou le montant économisé.',
  keywords: ['remise', 'discount', 'réduction', 'promo', 'solde', 'prix', 'économie', 'pourcentage'],
  component: () => import('./discount-calculator.vue'),
  icon: Discount,
  createdAt: new Date('2026-01-17'),
});
