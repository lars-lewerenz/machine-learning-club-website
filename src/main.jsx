import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import './i18n.jsx';
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster />
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
