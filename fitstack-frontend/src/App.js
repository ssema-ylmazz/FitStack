import React, { useState } from 'react';

// --- MODERN UI STYLES ---
const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, sans-serif' },
  nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', borderBottom: '1px solid #1e293b', alignItems: 'center', backgroundColor: '#111827', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#a3e635' },
  card: { backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #334155', height: '100%' },
  button: { backgroundColor: '#a3e635', color: '#000', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', fontWeight: '700', border: 'none', cursor: 'pointer' },
  input: { backgroundColor: '#334155', border: '1px solid #475569', color: '#fff', padding: '0.8rem', borderRadius: '0.5rem', width: '100%', marginBottom: '1rem' },
  // ROZET TASARIMI GÜNCELLENDİ (Daha belirgin)
  badge: { backgroundColor: '#1e293b', color: '#a3e635', border: '1px solid #a3e635', padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', marginRight: '8px', marginTop: '8px', display: 'inline-block', boxShadow: '0 0 10px rgba(163, 230, 53, 0.2)' },
  deleteBtn: { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }
};

function App() {
  const [view, setView] = useState('landing'); 
  const [filter, setFilter] = useState('Hepsi'); 
  const [notifications, setNotifications] = useState(['Hoş geldin Sema!', 'İlk antrenmanını tamamla ve rozet kazan!']);
  
  // G-9, G-13: Rozet Listesi (GET) - Başlangıca 2 rozet ekledim ki boş görünmesin
  const [user, setUser] = useState({
    name: "Sema Yılmaz",
    points: 120,
    badges: ["Yeni Başlayan", "Kararlı Sporcu"], // Rozetleri Görüntüler (GET)
    streak: 3 
  });

  const [workouts] = useState([
    { id: 1, name: "Başlangıç Kardiyo", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3/3o7TKSj0S7W8D09Gak/giphy.gif", desc: "Yağ yakımı odaklı başlangıç.", level: "Kolay" },
    { id: 2, name: "Zorlu Şınav", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3/3o7TKSj0S7W8D09Gak/giphy.gif", desc: "Üst vücut parçalama.", level: "Zor" },
    { id: 3, name: "Squat Master", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ3bmZ3bmZ3bmZ3/l2QZO0Ythp36V98CQ/giphy.gif", desc: "Bacak ve kalça gelişimi.", level: "Orta" }
  ]);

  const [activeWorkout, setActiveWorkout] = useState(null);
  const [history, setHistory] = useState([{ id: 101, name: "Geçen Haftaki Koşu", date: "01.04.2026" }]);

  // --- FONKSİYONLAR ---

  const handleAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('userName');
    if (view === 'register' && name) setUser({ ...user, name: name });
    setView('dashboard');
  };

  const completeWorkout = () => {
    // G-11 (POST) & G-13 (POST)
    const earnedXp = 40;
    const newPoints = user.points + earnedXp;
    let newBadges = [...user.badges];
    
    // G-13: 150 puanda Fit Master Rozeti Kazanma (POST)
    if (newPoints >= 150 && !newBadges.includes("Fit Master")) {
      newBadges.push("Fit Master");
      setNotifications([...notifications, "🏆 G-13: 'Fit Master' Rozeti Eklendi!"]);
    }
    
    setUser({ ...user, points: newPoints, badges: newBadges, streak: user.streak + 1 });
    setHistory([{ id: Date.now(), name: activeWorkout.name, date: "Bugün" }, ...history]);
    alert(`${earnedXp} XP kazanıldı! Puanın ${newPoints} oldu. (Rozetler Güncellendi)`);
    setActiveWorkout(null);
    setView('dashboard');
  };

  const filteredWorkouts = workouts.filter(w => filter === 'Hepsi' || w.level === filter);

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.logo}>FITSTACK</div>
        {['dashboard', 'profile', 'workout_detail'].includes(view) && (
          <div>
            <span style={{marginRight:'15px', color: '#fb923c', fontWeight:'bold'}}>🔥 {user.streak} Gün</span>
            <button onClick={() => setView('dashboard')} style={{background:'none', color:'#fff', border:'none', cursor:'pointer', marginRight:'15px'}}>Panel</button>
            <button onClick={() => setView('profile')} style={{background:'none', color:'#fff', border:'none', cursor:'pointer'}}>Profil</button>
            <button onClick={() => setView('landing')} style={{marginLeft:'15px', color:'#ef4444', background:'none', border:'none', cursor:'pointer'}}>Çıkış</button>
          </div>
        )}
      </nav>

      <main style={{ padding: '2rem 5%' }}>
        
        {view === 'landing' && (
          <div style={{ textAlign: 'center', marginTop: '10%' }}>
            <h1 style={{fontSize:'3.5rem'}}>Hedeflerine <span style={{color:'#a3e635'}}>Ulaş.</span></h1>
            <button onClick={() => setView('register')} style={styles.button}>Hemen Kayıt Ol (G-1)</button>
            <p onClick={() => setView('login')} style={{marginTop:'1rem', cursor:'pointer', color:'#94a3b8'}}>Giriş Yap (G-2)</p>
          </div>
        )}

        {(view === 'register' || view === 'login') && (
          <div style={{maxWidth:'400px', margin:'0 auto', ...styles.card}}>
            <h2>{view === 'register' ? 'Kayıt Ol (G-1)' : 'Giriş Yap (G-2)'}</h2>
            <form onSubmit={handleAuth}>
              {view === 'register' && <input name="userName" placeholder="Ad Soyad" style={styles.input} required />}
              <input type="email" placeholder="E-posta" style={styles.input} required />
              <input type="password" placeholder="Şifre" style={styles.input} required />
              <button type="submit" style={{...styles.button, width:'100%'}}>
                {view === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}
              </button>
            </form>
          </div>
        )}

        {view === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom:'2rem' }}>
              <div style={styles.card}>
                <h4>G-13: Kazandığın Rozetler (GET)</h4>
                <h2 style={{marginBottom:'10px'}}>{user.name}</h2>
                <div style={{fontSize:'1.2rem', color:'#a3e635', marginBottom:'15px'}}>{user.points} XP</div>
                
                {/* ROZETLER BURADA LİSTELENİYOR */}
                <div style={{display:'flex', flexWrap:'wrap'}}>
                  {user.badges.map(b => <span key={b} style={styles.badge}>🏅 {b}</span>)}
                </div>
              </div>
              <div style={styles.card}>
                <h4>Bildirimler</h4>
                <ul style={{fontSize:'0.85rem', paddingLeft:15, marginTop:10}}>
                  {notifications.map((n, i) => <li key={i} style={{marginBottom:5}}>{n}</li>)}
                </ul>
              </div>
            </div>

            {/* G-14 & G-15: HAZIR PROGRAMLAR */}
            <div style={{...styles.card, marginBottom:'2rem'}}>
              <h3>Hazır Egzersiz Programları (G-14 GET)</h3>
              <select style={{backgroundColor:'#334155', color:'#fff', padding:'8px', borderRadius:'5px', marginTop:'15px', border:'1px solid #475569'}} onChange={(e) => setFilter(e.target.value)}>
                <option value="Hepsi">Tüm Zorluklar (G-15 Filtre)</option>
                <option value="Kolay">Kolay</option>
                <option value="Orta">Orta</option>
                <option value="Zor">Zor</option>
              </select>
              <div style={{marginTop:'20px'}}>
                {filteredWorkouts.map(w => (
                  <div key={w.id} style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #334155', alignItems:'center'}}>
                    <span>{w.name} <b style={{fontSize:'0.7rem', color:'#a3e635'}}>[{w.level}]</b></span>
                    <button onClick={() => {setActiveWorkout(w); setView('workout_detail')}} style={styles.button}>Görüntüle</button>
                  </div>
                ))}
              </div>
            </div>

            {/* G-12: KAYIT SİLME */}
            <div style={styles.card}>
              <h3>Geçmiş (G-12 DELETE)</h3>
              {history.map(h => (
                <div key={h.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #1e293b'}}>
                  <span>{h.name} - {h.date}</span>
                  <button onClick={() => setHistory(history.filter(i => i.id !== h.id))} style={styles.deleteBtn}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'workout_detail' && activeWorkout && (
          <div style={{...styles.card, textAlign:'center'}}>
            <button onClick={() => setView('dashboard')} style={{float:'left', background:'none', border:'none', color:'#94a3b8', cursor:'pointer'}}>← Geri</button>
            <h2 style={{color:'#a3e635'}}>{activeWorkout.name}</h2>
            <img src={activeWorkout.gif} alt="rehber" style={{width:'300px', borderRadius:'1rem', margin:'1.5rem 0'}} />
            <p>{activeWorkout.desc}</p>
            <button onClick={completeWorkout} style={{...styles.button, width:'100%', marginTop:'1rem'}}>Antrenmanı Bitir ve Rozet Kazan!</button>
          </div>
        )}

        {view === 'profile' && (
          <div style={{maxWidth:'400px', margin:'0 auto', ...styles.card}}>
            <h3>Profil Düzenle (PUT)</h3>
            <form onSubmit={(e) => { e.preventDefault(); setUser({...user, name: e.target.name.value}); setView('dashboard'); }}>
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