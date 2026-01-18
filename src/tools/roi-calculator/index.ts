import { ChartLine } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de ROI',
  path: '/roi-calculator',
  description: 'Calculez le retour sur investissement (ROI) de vos projets. Mesurez la rentabilité d\'un investissement avec le gain, le coût et le pourcentage de retour.',
  keywords: ['roi', 'retour', 'investissement', 'rentabilité', 'gain', 'profit', 'rendement', 'performance'],
  component: () => import('./roi-calculator.vue'),
  icon: ChartLine,
  createdAt: new Date('2026-01-17'),
});
