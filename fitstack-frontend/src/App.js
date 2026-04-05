import React, { useState } from 'react';

// --- MODERN UI STYLES ---
const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, sans-serif' },
  nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', borderBottom: '1px solid #1e293b', alignItems: 'center', backgroundColor: '#111827', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#a3e635' },
  card: { backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #334155', height: '100%' },
  button: { backgroundColor: '#a3e635', color: '#000', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', fontWeight: '700', border: 'none', cursor: 'pointer' },
  input: { backgroundColor: '#334155', border: '1px solid #475569', color: '#fff', padding: '0.6rem', borderRadius: '0.4rem', width: '100%', marginBottom: '1rem' },
  badge: { backgroundColor: '#3b82f6', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '99px', fontSize: '0.7rem', marginRight: '5px' },
  deleteBtn: { color: '#ef4444', background: 'none', border: '1px solid #ef4444', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }
};

function App() {
  const [view, setView] = useState('landing'); 
  const [searchTerm, setSearchTerm] = useState(''); // G-14
  const [filter, setFilter] = useState('Hepsi'); // G-15
  const [notifications, setNotifications] = useState(['Hoş geldin Sema!', 'Yeni hedefler seni bekliyor.']); // G-17
  
  const [user, setUser] = useState({
    name: "Sema Yılmaz",
    points: 120,
    badges: ["Yeni Başlayan"],
    calories: 1850 // G-7
  });

  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Pushup (Şınav)", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3/3o7TKSj0S7W8D09Gak/giphy.gif", desc: "Göğüs ve kol kaslarını çalıştırır. Sırtını düz tut.", level: "Orta", liked: false },
    { id: 2, name: "Squat (Çömelme)", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3/l2QZO0Ythp36V98CQ/giphy.gif", desc: "Bacak ve kalça odaklıdır. Dizlerin parmak ucunu geçmesin.", level: "Kolay", liked: true },
    { id: 3, name: "Yoga Akışı", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3/3o7TKSj0S7W8D09Gak/giphy.gif", desc: "Esneklik ve denge sağlar.", level: "Kolay", liked: false }
  ]);

  const [activeWorkout, setActiveWorkout] = useState(null);
  const [history, setHistory] = useState([{ id: 101, name: "Sabah Yürüyüşü", date: "Dün" }]);

  // --- FONKSİYONLAR ---

  const handleAuth = (e) => {
    e.preventDefault();
    setView('dashboard');
    alert("Başarıyla giriş yapıldı! (G-2)");
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, name: e.target.name.value });
    alert("G-10: Profil güncellendi!");
    setView('dashboard');
  };

  const completeWorkout = () => {
    const newPoints = user.points + 40;
    let newBadges = [...user.badges];
    if (newPoints >= 150 && !newBadges.includes("Fit Master")) {
      newBadges.push("Fit Master");
      setNotifications([...notifications, "🏆 G-13: Fit Master Rozeti Kazandın!"]);
    }
    setUser({ ...user, points: newPoints, badges: newBadges });
    setHistory([{ id: Date.now(), name: activeWorkout.name, date: "Bugün" }, ...history]);
    alert("G-11: Antrenman Verisi Kaydedildi!");
    setActiveWorkout(null);
    setView('dashboard');
  };

  const toggleLike = (id) => { // G-16
    setWorkouts(workouts.map(w => w.id === id ? { ...w, liked: !w.liked } : w));
  };

  const filteredWorkouts = workouts.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'Hepsi' || w.level === filter)
  );

  return (
    <div style={styles.container}>
      {/* NAVBAR & G-17 */}
      <nav style={styles.nav}>
        <div style={styles.logo}>FITSTACK</div>
        {view !== 'landing' && view !== 'login' && view !== 'register' && (
          <div>
            <span title="Bildirimler" style={{marginRight:'15px', cursor:'pointer'}}>🔔({notifications.length})</span>
            <button onClick={() => setView('dashboard')} style={{background:'none', color:'#fff', border:'none', cursor:'pointer', marginRight:'15px'}}>Panel</button>
            <button onClick={() => setView('profile')} style={{background:'none', color:'#fff', border:'none', cursor:'pointer'}}>Profil (G-9)</button>
            <button onClick={() => setView('landing')} style={{marginLeft:'15px', color:'#ef4444', background:'none', border:'none', cursor:'pointer'}}>Çıkış</button>
          </div>
        )}
      </nav>

      <main style={{ padding: '2rem 5%' }}>
        
        {/* LANDING PAGE (G-1) */}
        {view === 'landing' && (
          <div style={{ textAlign: 'center', marginTop: '10%' }}>
            <h1 style={{fontSize:'3.5rem'}}>Hedeflerine <span style={{color:'#a3e635'}}>Ulaş.</span></h1>
            <p style={{color:'#94a3b8', marginBottom:'2rem'}}>G-1'den G-17'ye tüm teknik altyapı hazır.</p>
            <button onClick={() => setView('register')} style={styles.button}>Hemen Kayıt Ol (G-1)</button>
            <p onClick={() => setView('login')} style={{marginTop:'1rem', cursor:'pointer', color:'#94a3b8'}}>Zaten hesabın var mı? Giriş Yap (G-2)</p>
          </div>
        )}

        {/* KAYIT & GİRİŞ (G-1 & G-2) */}
        {(view === 'register' || view === 'login') && (
          <div style={{maxWidth:'400px', margin:'0 auto', ...styles.card}}>
            <h2>{view === 'register' ? 'Kayıt Ol (G-1)' : 'Giriş Yap (G-2)'}</h2>
            <form onSubmit={handleAuth}>
              {view === 'register' && <input placeholder="Ad Soyad" style={styles.input} required />}
              <input type="email" placeholder="E-posta" style={styles.input} required />
              <input type="password" placeholder="Şifre" style={styles.input} required />
              <button type="submit" style={{...styles.button, width:'100%'}}>{view === 'register' ? 'Hesap Oluştur' : 'Giriş Yap'}</button>
            </form>
            <p onClick={() => setView('landing')} style={{textAlign:'center', marginTop:'1rem', cursor:'pointer', color:'#94a3b8'}}>Geri Dön</p>
          </div>
        )}

        {/* DASHBOARD (G-5, G-6, G-7, G-9, G-14, G-15, G-16, G-17) */}
        {view === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom:'2rem' }}>
              <div style={styles.card}>
                <h4>Profil (G-9)</h4>
                <h2>{user.name}</h2>
                <p style={{color:'#a3e635', fontWeight:'bold'}}>{user.points} XP</p>
                {user.badges.map(b => <span key={b} style={styles.badge}>{b}</span>)}
              </div>
              <div style={styles.card}>
                <h4>Kalori Takibi (G-7)</h4>
                <div style={{fontSize:'1.5rem'}}>{user.calories} kcal</div>
                <div style={{width:'100%', height:'10px', background:'#0f172a', borderRadius:'5px', marginTop:'10px'}}>
                  <div style={{width:'70%', height:'100%', background:'#a3e635', borderRadius:'5px'}}></div>
                </div>
              </div>
            </div>

            {/* ARAMA & LİSTELEME (G-14, G-15, G-16) */}
            <div style={{...styles.card, marginBottom:'2rem'}}>
              <h3>Antrenman Bul (G-14/15)</h3>
              <div style={{display:'flex', gap:'10px', marginBottom:'1rem'}}>
                <input placeholder="Ara..." style={{...styles.input, marginBottom:0}} onChange={(e) => setSearchTerm(e.target.value)} />
                <select style={{...styles.input, marginBottom:0, width:'150px'}} onChange={(e) => setFilter(e.target.value)}>
                  <option value="Hepsi">Tümü</option>
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                </select>
              </div>
              {filteredWorkouts.map(w => (
                <div key={w.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #334155'}}>
                  <span>{w.name} ({w.level})</span>
                  <div>
                    <button onClick={() => toggleLike(w.id)} style={{background:'none', border:'none', cursor:'pointer'}}>{w.liked ? '❤️' : '🤍'}</button>
                    <button onClick={() => {setActiveWorkout(w); setView('workout_detail')}} style={{...styles.button, padding:'0.3rem 0.6rem', marginLeft:'10px'}}>Görüntüle</button>
                  </div>
                </div>
              ))}
            </div>

            {/* GEÇMİŞ (G-12) */}
            <div style={styles.card}>
              <h3>Geçmiş (G-12 DELETE)</h3>
              {history.map(h => (
                <div key={h.id} style={{display:'flex', justifyContent:'space-between', padding:'5px 0'}}>
                  <span>{h.name} - {h.date}</span>
                  <button onClick={() => setHistory(history.filter(i => i.id !== h.id))} style={styles.deleteBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GÖRSEL REHBER & ANTRENMAN (G-11 & G-13) */}
        {view === 'workout_detail' && activeWorkout && (
          <div style={{...styles.card, textAlign:'center'}}>
            <button onClick={() => setView('dashboard')} style={{float:'left', background:'none', border:'none', color:'#94a3b8', cursor:'pointer'}}>← Geri</button>
            <h2 style={{color:'#a3e635'}}>{activeWorkout.name}</h2>
            <img src={activeWorkout.gif} alt="rehber" style={{width:'300px', borderRadius:'1rem', margin:'1.5rem 0'}} />
            <p style={{maxWidth:'500px', margin:'0 auto 1.5rem'}}>{activeWorkout.desc}</p>
            <button onClick={completeWorkout} style={{...styles.button, width:'100%'}}>Antrenmanı Tamamla (G-11 POST)</button>
          </div>
        )}

        {/* PROFİL DÜZENLE (G-10 PUT) */}
        {view === 'profile' && (
          <div style={{maxWidth:'400px', margin:'0 auto', ...styles.card}}>
            <h3>Profil Düzenle (G-10)</h3>
            <form onSubmit={handleUpdateProfile}>
              <input name="name" defaultValue={user.name} style={styles.input} />
              <button type="submit" style={styles.button}>Güncelle (PUT)</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;