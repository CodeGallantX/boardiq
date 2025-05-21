"use client";
import { useDarkMode } from '@/context/DarkModeContext';
import { Switch } from '@mui/material';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <SunIcon className="h-5 w-5 text-gray-400" />
        <Switch checked={false} disabled />
        <MoonIcon className="h-5 w-5 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        color="default"
        inputProps={{ 'aria-label': 'toggle dark mode' }}
      />
      <MoonIcon className={`h-5 w-5 ${darkMode ? 'text-blue-500' : 'text-gray-400'}`} />
    </div>
  );
}