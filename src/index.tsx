import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// @ts-ignore
const container = document.getElementById('app');
// @ts-ignore
const root = createRoot(container);
// @ts-ignore
root.render(<App tab="home" />);
