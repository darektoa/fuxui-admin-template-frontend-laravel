import { BrowserRouter } from 'react-router-dom';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import React from 'react';

createInertiaApp({
    resolve: (path) => {
        const pages = import.meta.glob('./routes/**/*.jsx', { eager: true });
        return pages[`./routes/${path}.jsx`];
    },
    setup: ({ App, el: root, props }) => createRoot(root).render(
        <BrowserRouter>
            <App {...props} />
        </BrowserRouter>,
    ),
});
