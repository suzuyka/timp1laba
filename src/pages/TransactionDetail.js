import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function TransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/transactions/${id}`)
      .then(res => res.json())
      .then(setTransaction)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{fontSize: '24px', textAlign: 'center', padding: '50px'}}>🔄 Загрузка...</div>;
  if (!transaction) return <div>Транзакция не найдена</div>;

  return (
    <div>
      <div style={{marginBottom: '2rem'}}>
        <Link to="/" style={{color: '#3b82f6', fontSize: '18px', textDecoration: 'none'}}>
          ← Назад к списку
        </Link>
        <Link to={`/edit/${id}`} style={{marginLeft: '20px', color: '#10b981', fontSize: '18px', textDecoration: 'none'}}>
          ✏️ Редактировать
        </Link>
      </div>
      
      <h1 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '2rem'}}>
        Транзакция #{transaction.id}
      </h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
        <div>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '1.5rem'}}>Основная информация</h2>
          <div style={{lineHeight: '1.8'}}>
            <p><strong>👤 Клиент:</strong> {transaction.clientName}</p>
            <p><strong>💰 Сумма:</strong> {transaction.amount.toLocaleString()} {transaction.currency}</p>
            <p><strong>💳 Карта:</strong> {transaction.cardNumber}</p>
            <p><strong>📅 Дата:</strong> {transaction.date}</p>
            <p><strong>⚠️ Риск:</strong> 
              <span style={{
                marginLeft: '10px', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold',
                backgroundColor: transaction.riskLevel === 'высокий' ? '#fee2e2' : transaction.riskLevel === 'средний' ? '#fef3c7' : '#d1fae5',
                color: transaction.riskLevel === 'высокий' ? '#dc2626' : transaction.riskLevel === 'средний' ? '#d97706' : '#059669'
              }}>
                {transaction.riskLevel}
              </span>
            </p>
            <p><strong>📊 Статус:</strong> {transaction.status}</p>
          </div>
        </div>
        
        <div>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '1.5rem'}}>Описание подозрения</h2>
          <div style={{background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', minHeight: '200px'}}>
            <p style={{whiteSpace: 'pre-wrap'}}>{transaction.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;
