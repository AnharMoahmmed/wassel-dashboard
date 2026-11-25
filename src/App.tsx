import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { OrdersPage } from './pages/OrdersPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}