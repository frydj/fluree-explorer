import React from 'react';
import { createRoot } from 'react-dom/client';
import Drawer from '../src/Drawer';

const body = document.querySelector('body');
const drawer = document.createElement('div');

drawer.id = 'react-root';

if (body) {
  body.prepend(drawer);
}

const container = document.getElementById('react-root');
const root = createRoot(container);

root.render(<Drawer />); // Render react component
