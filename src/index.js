import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import TransactionsList from './pages/TransactionsList';
import TransactionDetail from './pages/TransactionDetail';
import TransactionForm from './pages/TransactionForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<TransactionsList />} />
          <Route path="detail/:id" element={<TransactionDetail />} />
          <Route path="add" element={<TransactionForm />} />
          <Route path="edit/:id" element={<TransactionForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
