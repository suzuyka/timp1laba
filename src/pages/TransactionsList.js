import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/transactions')
      .then(res => res.json())
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  const deleteTransaction = async (id) => {
    await fetch(`http://localhost:3001/transactions/${id}`, { method: 'DELETE' });
    setTransactions(t => t.filter(t => t.id !== id));
  };

  if (loading) return <div style={{fontSize: '24px', textAlign: 'center', padding: '50px'}}>🔄 Загрузка...</div>;

  return (
    <div>
      <h1 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937'}}>
        📊 Подозрительные транзакции
      </h1>
      <div style={{background: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)', color: 'white'}}>
              <th style={{padding: '16px', textAlign: 'left', fontWeight: 'bold'}}>Клиент</th>
              <th style={{padding: '16px', textAlign: 'left', fontWeight: 'bold'}}>Сумма</th>
              <th style={{padding: '16px', textAlign: 'left', fontWeight: 'bold'}}>Дата</th>
              <th style={{padding: '16px', textAlign: 'left', fontWeight: 'bold'}}>Риск</th>
              <th style={{padding: '16px', textAlign: 'left', fontWeight: 'bold'}}>Статус</th>
              <th style={{padding: '16px', textAlign: 'left', fontWeight: 'bold'}}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} style={{borderTop: '1px solid #e5e7eb', cursor: 'pointer'}}>
                <td style={{padding: '16px', fontWeight: '500'}}>{t.clientName}</td>
                <td style={{padding: '16px'}}>{t.amount.toLocaleString()} {t.currency}</td>
                <td style={{padding: '16px'}}>{t.date}</td>
                <td style={{padding: '16px', fontWeight: 'bold', color: t.riskLevel === 'высокий' ? '#dc2626' : t.riskLevel === 'средний' ? '#d97706' : '#059669'}}>
                  {t.riskLevel}
                </td>
                <td style={{padding: '16px'}}>{t.status}</td>
                <td style={{padding: '16px'}}>
                  <Link to={`/detail/${t.id}`} style={{color: '#3b82f6', marginRight: '10px', fontSize: '20px'}}>👁️</Link>
                  <Link to={`/edit/${t.id}`} style={{color: '#10b981', marginRight: '10px', fontSize: '20px'}}>✏️</Link>
                  <button 
                    onClick={() => deleteTransaction(t.id)}
                    style={{color: '#ef4444', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsList;
