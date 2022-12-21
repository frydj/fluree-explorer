import React, { useEffect } from 'react';
import { BookmarkIcon } from '@heroicons/react/20/solid';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import './Button.css';

const Button = ({ tooltip, title, id, onClick, disabled, icon, children }) => {
  useEffect(() => {
    // add tooltip on mount
    if (id && tooltip) {
      tippy(`#${id}`, {
        content: tooltip,
        delay: [500, null],
      });
    }
  }, []);

  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 max-w-xs fluree-button"
      id={id}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {icon !== false && (
        <BookmarkIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default Button;
