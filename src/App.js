import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px'}}>
      <nav style={{backgroundColor: '#2563eb', padding: '1rem', color: 'white', marginBottom: '2rem', borderRadius: '8px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem'}}>
          <Link to="/" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>
            📊 Список транзакций
          </Link>
          <Link to="/add" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold'}}>
            ➕ Добавить
          </Link>
        </div>
        <h1 style={{margin: '1rem 0 0 0', fontSize: '1.5rem'}}>
          Система мониторинга мошенничества в банке
        </h1>
      </nav>
      <main style={{maxWidth: '1200px', margin: '0 auto'}}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
