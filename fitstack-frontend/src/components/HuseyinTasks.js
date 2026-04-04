import React from 'react';

const HuseyinTasks = () => {
  const huseyinGereksinimler = [
    { id: 2, desc: "Kullanıcı Girişi (POST /users/login)" },
    { id: 4, desc: "Profil Güncelleme (PUT /users/profile)" },
    { id: 6, desc: "Program Listeleme (GET /programs)" },
    { id: 8, desc: "Program Seçme (POST /programs/{id}/select)" },
    { id: 10, desc: "Geçmiş Antrenmanlar (GET /workouts)" },
    { id: 12, desc: "Toplam Puan (GET /users/points)" },
    { id: 14, desc: "Rozetleri Görüntüleme (GET /badges)" },
    { id: 16, desc: "Seri Bilgisi Güncelleme (PUT /streak)" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {huseyinGereksinimler.map((task) => (
        <button 
          key={task.id}
          style={{ padding: '10px', backgroundColor: '#334155', color: '#adff2f', border: '1px solid #adff2f', borderRadius: '5px', cursor: 'pointer', textAlign: 'left' }}
          onClick={() => alert(`Hüseyin Görev G-${task.id} Test Ediliyor...`)}
        >
          G-{task.id}: {task.desc}
        </button>
      ))}
    </div>
  );
};

export default HuseyinTasks;