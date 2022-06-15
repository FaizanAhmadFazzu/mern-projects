import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import "./index.css";

ReactDom.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
    document.getElementById("root")
);

