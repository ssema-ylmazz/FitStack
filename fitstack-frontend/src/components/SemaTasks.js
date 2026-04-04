import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SemaTasks = () => {
    const [streak, setStreak] = useState(0);

    // 15. GEREKSİNİM: Günlük Seri Görüntüleme
    useEffect(() => {
        api.get('/streak')
           .then(res => setStreak(res.data.count))
           .catch(err => console.log("Seri bilgisi alınamadı."));
    }, []);

    const handleAction = async (label, request) => {
        try {
            await request;
            alert(`${label} başarıyla tamamlandı!`);
        } catch (err) {
            alert(`${label} başarısız! API bağlantısını kontrol et.`);
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            <h1 style={{ color: '#2c3e50' }}>FitStack - Sema'nın Geliştirme Paneli</h1>
            
            <div style={{ background: '#ecf0f1', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '20px' }}>🔥 <strong>Günlük Seriniz (G-15):</strong> {streak}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1 backup 1fr', gap: '15px' }}>
                <button onClick={() => handleAction("G-1: Kayıt", api.post('/users/register', {name: "Sema"}))}>G-1: Kayıt Ol</button>
                <button onClick={() => handleAction("G-3: Profil", api.get('/users/profile'))}>G-3: Profil Bilgisi Al</button>
                <button onClick={() => handleAction("G-5: Hesap Sil", api.delete('/users/profile'))} style={{backgroundColor: '#e74c3c', color: 'white'}}>G-5: Hesabı Kalıcı Sil</button>
                <button onClick={() => handleAction("G-7: Filtreleme", api.get('/programs?level=zor'))}>G-7: Zor Programları Getir</button>
                <button onClick={() => handleAction("G-9: Antrenman", api.post('/workouts', {type: 'Kardiyo'}))}>G-9: Antrenman Kaydı Oluştur</button>
                <button onClick={() => handleAction("G-11: Puan", api.put('/workouts/1/points'))}>G-11: Tamamlanan Antrenmandan Puan Al</button>
                <button onClick={() => handleAction("G-13: Rozet", api.post('/badges', {name: 'Azimli'}))}>G-13: Rozet Kazan</button>
                <button onClick={() => handleAction("G-17: Silme", api.delete('/workouts/1'))}>G-17: Antrenman Kaydını Sil</button>
            </div>
        </div>
    );
};

export default SemaTasks;