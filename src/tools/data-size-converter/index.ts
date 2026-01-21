import { Database } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Convertisseur de Taille de Données',
  path: '/data-size-converter',
  description: 'Convertissez facilement entre octets, Ko, Mo, Go, To et Po. Calculez la taille de fichiers, bande passante et stockage avec précision pour vos projets informatiques.',
  keywords: ['octets', 'bytes', 'ko', 'mo', 'go', 'to', 'kb', 'mb', 'gb', 'tb', 'stockage', 'taille', 'données', 'fichier', 'conversion'],
  component: () => import('./data-size-converter.vue'),
  icon: Database,
  createdAt: new Date('2026-01-17'),
});
