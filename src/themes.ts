import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2563eb', // Bleu Royal
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1d4ed8',
    primaryColorSuppl: '#3b82f6',
  },
  Menu: {
    itemHeight: '32px',
  },
  Layout: { color: '#ffffff' }, // Fond Blanc
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6', // Bleu plus clair pour le mode sombre
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#2563eb',
    primaryColorSuppl: '#60a5fa',
  },
  Notification: {
    color: '#1e293b',
  },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#0f172a' },
    },
  },
  Menu: {
    itemHeight: '32px',
  },
  Layout: {
    color: '#0f172a', // Bleu très sombre
    siderColor: '#1e293b',
    siderBorderColor: 'transparent',
  },
  Card: {
    color: '#1e293b',
    borderColor: '#334155',
  },
  Table: {
    tdColor: '#1e293b',
    thColor: '#334155',
  },
};
