import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TransactionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '', amount: 0, currency: 'RUB', date: '', 
    cardNumber: '', riskLevel: 'средний', description: '', status: 'на проверке'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/transactions/${id}`)
        .then(res => res.json())
        .then(setFormData);
    }
  }, [id]);

  const validate = () => {
    if (!formData.clientName.trim()) return setError('Имя клиента обязательно');
    if (formData.amount <= 0) return setError('Сумма должна быть больше 0');
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const url = id ? `http://localhost:3001/transactions/${id}` : 'http://localhost:3001/transactions';
    
    try {
      await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      navigate('/');
    } catch (err) {
      setError('Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '2rem'}}>
        {id ? '✏️ Редактировать' : '➕ Добавить'} транзакцию
      </h1>
      
      {error && (
        <div style={{marginBottom: '2rem', padding: '1rem', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626'}}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>👤 ФИО клиента</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={e => setFormData({...formData, clientName: e.target.value})}
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '16px'}}
              required
            />
          </div>
          
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>💰 Сумма</label>
            <input
              type="number"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '16px'}}
              required
            />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>📅 Дата</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>💳 Карта</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={e => setFormData({...formData, cardNumber: e.target.value})}
              placeholder="****1234"
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px'}}
            />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>💱 Валюта</label>
            <select
              value={formData.currency}
              onChange={e => setFormData({...formData, currency: e.target.value})}
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px'}}
            >
              <option>RUB</option><option>USD</option><option>EUR</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>⚠️ Риск</label>
            <select
              value={formData.riskLevel}
              onChange={e => setFormData({...formData, riskLevel: e.target.value})}
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px'}}
            >
              <option>низкий</option><option>средний</option><option>высокий</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>📊 Статус</label>
            <select
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px'}}
            >
              <option>на проверке</option>
              <option>подтверждено мошенничество</option>
              <option>ложное срабатывание</option>
            </select>
          </div>
        </div>

        <div style={{marginBottom: '2rem'}}>
          <label style={{display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem'}}>📝 Описание</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            rows={5}
            style={{width: '100%', padding: '12px', border: '2px solid #d1d5db', borderRadius: '8px', resize: 'vertical'}}
            placeholder="Причина срабатывания антифрод-системы..."
          />
        </div>

        <div style={{display: 'flex', gap: '1rem'}}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '16px 32px', background: '#3b82f6', color: 'white', 
              fontSize: '18px', fontWeight: 'bold', border: 'none', 
              borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? '💾 Сохранение...' : '💾 Сохранить'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              padding: '16px 32px', background: '#6b7280', color: 'white', 
              fontSize: '18px', fontWeight: 'bold', border: 'none', 
              borderRadius: '8px', cursor: 'pointer'
            }}
          >
            ❌ Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
