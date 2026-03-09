import { useState, useEffect } from 'react';
import { SettingsContext } from './context';

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved
      ? JSON.parse(saved)
      : {
          signup: false,
          notifications: false,
        };
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    // localStorage.removeItem("settings")
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
