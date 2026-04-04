import React, { useState } from 'react';
import api from '../services/api';

const SemaTasks = () => {
  // G-1: Kayıt Ol
  const handleRegister = async () => {
    try {
      await api.post('/users/register', { username: 'sema', email: 'sema@test.com', password: '123' });
      alert("Kayıt Başarılı! (G-1)");
    } catch (err) { alert("Kayıt Hatası!"); }
  };

  // G-3, 5: Profil Gör ve Sil
  const manageProfile = async (type) => {
    try {
      if (type === 'get') {
        const res = await api.get('/users/profile'); // G-3
        alert(`Profil: ${res.data.username} (G-3)`);
      } else {
        await api.delete('/users/profile'); // G-5
        alert("Hesap Silindi! (G-5)");
      }
    } catch (err) { alert("Profil işlemi hatası."); }
  };

  // G-7, 9, 11, 13, 15, 17: Antrenman ve Puan Süreçleri
  const handleWorkouts = async (action) => {
    try {
      if (action === 'filter') await api.get('/programs?level=beginner'); // G-7
      if (action === 'add') {
        await api.post('/workouts', { type: 'Fitness' }); // G-9
        await api.put('/workouts/1/points'); // G-11
        await api.post('/badges'); // G-13
      }
      if (action === 'streak') await api.get('/streak'); // G-15
      if (action === 'delete') await api.delete('/workouts/1'); // G-17
      alert(`${action} işlemi başarıyla tamamlandı!`);
    } catch (err) { alert("İşlem sırasında hata oluştu."); }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px' }}>
      <h2>Sema'nın Yönetim Paneli</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <button onClick={handleRegister} style={btnStyle}>Yeni Kullanıcı Kaydı (G-1)</button>
        <button onClick={() => manageProfile('get')} style={btnStyle}>Profilimi Görüntüle (G-3)</button>
        <button onClick={() => handleWorkouts('add')} style={btnStyle}>Antrenman Yap ve Puan Kazan (G-9, 11, 13)</button>
        <button onClick={() => handleWorkouts('filter')} style={btnStyle}>Zorluk Filtrele (G-7)</button>
        <button onClick={() => handleWorkouts('streak')} style={btnStyle}>Günlük Serimi Gör (G-15)</button>
        <button onClick={() => handleWorkouts('delete')} style={{...btnStyle, backgroundColor: 'red'}}>Son Antrenmanı Sil (G-17)</button>
        <button onClick={() => manageProfile('delete')} style={{gridColumn: 'span 2', background: 'none', color: 'gray'}}>Hesabı Tamamen Sil (G-5)</button>
      </div>
    </div>
  );
};
const btnStyle = { padding: '15px', backgroundColor: '#1e293b', color: '#adff2f', border: '1px solid #adff2f', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };
export default SemaTasks;