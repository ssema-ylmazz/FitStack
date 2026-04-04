import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const HuseyinTasks = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // G-2: Giriş Yap
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token); // Token varsa kaydet
      alert("Giriş Başarılı! (G-2)");
      navigate('/dashboard');
    } catch (err) { alert("Giriş Hatası!"); }
  };

  // G-6 & G-8: Program Listele ve Seç
  const handleProgram = async () => {
    try {
      const res = await api.get('/programs'); // G-6
      console.log(res.data);
      await api.post('/programs/1/select'); // G-8 (Örnek ID: 1)
      alert("Programlar listelendi ve 1 numaralı program seçildi! (G-6, G-8)");
    } catch (err) { alert("Program işlemi başarısız."); }
  };

  // G-10, 12, 14, 16: Diğer Hüseyin Görevleri
  const checkStats = async () => {
    try {
      await api.get('/workouts'); // G-10: Geçmiş
      await api.get('/users/points'); // G-12: Puan
      await api.get('/badges'); // G-14: Rozetler
      await api.put('/streak'); // G-16: Seri Güncelle
      alert("Geçmiş, Puan ve Rozet bilgileri güncellendi! (G-10, 12, 14, 16)");
    } catch (err) { alert("Bilgiler çekilemedi."); }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>FitStack Projesine Hoş Geldiniz</h1>
        <form onSubmit={handleLogin} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="email" placeholder="E-posta (G-2)" onChange={e => setEmail(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Şifre" onChange={e => setPassword(e.target.value)} style={inputStyle} />
          <button type="submit" style={btnStyle}>Giriş Yap (G-2)</button>
        </form>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={handleProgram} style={outlineBtn}>Programları Gör ve Seç (G-6, G-8)</button>
          <button onClick={checkStats} style={outlineBtn}>İstatistiklerimi Güncelle (G-10, 12, 14, 16)</button>
        </div>
      </div>
    </div>
  );
};
const inputStyle = { padding: '12px', borderRadius: '5px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155' };
const btnStyle = { padding: '12px', backgroundColor: '#adff2f', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px' };
const outlineBtn = { padding: '10px', backgroundColor: 'transparent', border: '1px solid #adff2f', color: '#adff2f', cursor: 'pointer' };
export default HuseyinTasks;