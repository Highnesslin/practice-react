import React, { useContext, useRef, useState } from 'react';

type themeKeyState = 'light' | 'dark';
type themeState = {
  [key: string]: string;
};
type contextState = {
  theme: themeState;
  setTheme: React.Dispatch<React.SetStateAction<themeKeyState>>;
};
// @ts-ignore
const ThemeContext = React.createContext<contextState>({});

function App() {
  const themeMap = useRef({
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  });
  const [theme, setTheme] = useState<themeKeyState>('light');

  return (
    <div>
      <p>- 传统方式</p>
      <ThemeContext.Provider value={{ theme: themeMap.current[theme], setTheme }}>
        <Toolbar />
        <ThemedButton />
      </ThemeContext.Provider>
      <p>- 读写分离</p>
      <div>...</div>
    </div>
  );
}

function Toolbar() {
  console.log('读-组件 render');
  const { setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => {
        setTheme('dark');
      }}
    >
      change
    </button>
  );
}

function ThemedButton() {
  console.log('写-组件 render');
  const { theme } = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

export default App;
