import React, { useState } from 'react';
import api from '../services/api';

const HuseyinTasks = () => {
    const [points, setPoints] = useState(0);

    const handleAction = async (label, request) => {
        try {
            const res = await request;
            if(label.includes("Puan")) setPoints(res.data.totalPoints || 0);
            alert(`${label} işlemi başarılı!`);
        } catch (err) {
            alert(`${label} başarısız! Backend bağlantısını kontrol et.`);
        }
    };

    return (
        <div style={{ padding: '20px', border: '2px solid #3498db', borderRadius: '10px', marginTop: '20px', backgroundColor: '#ebf5fb' }}>
            <h2 style={{ color: '#2980b9' }}>Hüseyin - Geliştirme Paneli (Çift Sayılar)</h2>
            <div style={{ marginBottom: '15px', fontSize: '18px' }}>
                🏆 <strong>Toplam Puan (G-12):</strong> {points}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => handleAction("G-2 Giriş", api.post('/users/login', {email: 'huseyin@sdu.edu.tr'}))}>G-2: Giriş Yap</button>
                <button onClick={() => handleAction("G-4 Güncelle", api.put('/users/profile', {bio: 'Fitness'}))}>G-4: Profil Güncelle</button>
                <button onClick={() => handleAction("G-6 Listeleme", api.get('/programs'))}>G-6: Program Listele</button>
                <button onClick={() => handleAction("G-8 Seçme", api.post('/programs/1/select'))}>G-8: Program Seç</button>
                <button onClick={() => handleAction("G-10 Geçmiş", api.get('/workouts'))}>G-10: Geçmiş Antrenmanlar</button>
                <button onClick={() => handleAction("G-12 Puan", api.get('/users/points'))}>G-12: Puan Görüntüle</button>
                <button onClick={() => handleAction("G-14 Rozetler", api.get('/badges'))}>G-14: Rozetleri Listele</button>
                <button onClick={() => handleAction("G-16 Seri Güncelle", api.put('/streak'))}>G-16: Seri Güncelle</button>
            </div>
        </div>
    );
};

export default HuseyinTasks;