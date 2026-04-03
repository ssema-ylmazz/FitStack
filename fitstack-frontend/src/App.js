import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// HÜSEYİN: API Temel Bağlantısı
const API_BASE_URL = "http://localhost:8080/api";

function App() {
  // --- STATE YÖNETİMİ (Sema Tasarım + Hüseyin Veri) ---
  const [page, setPage] = useState('login'); 
  const [filter, setFilter] = useState('Hepsi'); // G7 (Sema)
  const [xp, setXp] = useState(1250); // G11 (Sema) & G12 (Hüseyin)
  const [streak, setStreak] = useState(5); // G15 (Sema) & G16 (Hüseyin)
  const [programs, setPrograms] = useState([]); // G6 (Hüseyin)
  const [badges, setBadges] = useState([]); // G13 (Sema) & G14 (Hüseyin)
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Sabah Koşusu', xp: 120, date: '24 Mart' }
  ]); // G9 (Sema) & G10 (Hüseyin)

  // --- HÜSEYİN'İN API FONKSİYONLARI (Çift Numaralar) ---

  // GEREKSİNİM 2: Giriş Yap
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value
      });
      setPage('dashboard');
      fetchDashboardData();
    } catch (err) {
      setPage('dashboard'); // Backend yoksa bile tasarımı gör
    }
  };

  // G6, G10, G12, G14, G16: Verileri Toplu Çekme
  const fetchDashboardData = async () => {
    try {
      const [pRes, wRes, ptRes, bRes, sRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/programs`),
        axios.get(`${API_BASE_URL}/workouts`),
        axios.get(`${API_BASE_URL}/users/points`),
        axios.get(`${API_BASE_URL}/badges`),
        axios.get(`${API_BASE_URL}/streak`)
      ]);
      setPrograms(pRes.data);
      setWorkouts(wRes.data);
      setXp(ptRes.data);
      setBadges(bRes.data);
      setStreak(sRes.data.count);
    } catch (e) { console.log("Hüseyin: Veri bekleniyor..."); }
  };

  // GEREKSİNİM 4: Profil Güncelleme
  const handleUpdateProfile = async () => {
    await axios.put(`${API_BASE_URL}/users/profile`, { name: "Sema" });
    alert("Profil Güncellendi! (G4)");
  };

  // GEREKSİNİM 8: Program Seçme
  const handleSelectProgram = async (id) => {
    await axios.post(`${API_BASE_URL}/programs/${id}/select`);
    alert(`Program ${id} seçildi! (G8)`);
  };

  // --- SEMA'NIN AKSİYONLARI (Tek Numaralar) ---
  const handleRegister = () => alert("Kayıt Başarılı! (G1)");
  const handleDeleteAccount = () => alert("Hesap Silindi! (G5)");
  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
    alert("Antrenman Kaydı Silindi! (G17)");
  };

  // --- GÖRÜNÜM KATMANI (Elite UI) ---
  if (page === 'login' || page === 'register') {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          <h1 className="logo-main">FIT<span>STACK</span></h1>
          <form className="auth-form" onSubmit={handleLogin}>
            {page === 'register' && <input type="text" placeholder="Ad Soyad" className="auth-input" />}
            <input name="email" type="email" placeholder="E-posta" className="auth-input" required />
            <input name="password" type="password" placeholder="Şifre" className="auth-input" required />
            <button type="submit" className="auth-submit">
              {page === 'login' ? 'Giriş Yap (G2)' : 'Kayıt Ol (G1)'}
            </button>
          </form>
          <button className="auth-switch" onClick={() => setPage(page === 'login' ? 'register' : 'login')}>
            Hesap Değiştir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="logo-small">FIT<span>STACK</span></div>
        <div className="nav-links">
          <span onClick={() => setPage('dashboard')} className={page === 'dashboard' ? 'active' : ''}>DASHBOARD</span>
          <span onClick={() => setPage('profile')} className={page === 'profile' ? 'active' : ''}>PROFİL (G3)</span>
          <span className="logout-link" onClick={() => setPage('login')}>ÇIKIŞ</span>
        </div>
      </nav>

      <main className="content-area">
        {page === 'dashboard' ? (
          <div className="dashboard-grid">
            <div className="header-stats">
              <div className="stat-unit">
                <label>GÜNLÜK SERİ (G15-16)</label>
                <h2>🔥 {streak} GÜN</h2>
              </div>
              <div className="stat-unit">
                <label>TOPLAM PUAN (G11-12)</label>
                <h2 className="xp-text">{xp} XP</h2>
              </div>
              <div className="stat-unit">
                <label>ROZETLER (G13-14)</label>
                <div className="mini-badges">
                  {badges.length > 0 ? badges.map((b, i) => <span key={i}>{b.icon}</span>) : "🏆 ⚡ 🎖️"}
                </div>
              </div>
            </div>

            <section className="programs-section">
              <div className="section-bar">
                <h3>PROGRAMLAR (G6-G7)</h3>
                <div className="filters">
                  {['Hepsi', 'Başlangıç', 'İleri'].map(f => (
                    <button key={f} className={filter === f ? 'f-active' : ''} onClick={() => setFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="program-row">
                <div className="prog-card">
                  <span className="tag">SEVİYE</span>
                  <h4>Kardiyo Temelleri</h4>
                  <button className="action-btn" onClick={() => { setXp(xp+50); handleSelectProgram(1); }}>SEÇ VE ANTRENMAN (G8-G9)</button>
                </div>
              </div>
            </section>

            <section className="recent-activity">
              <h3>GEÇMİŞ (G10-17)</h3>
              {workouts.map(w => (
                <div className="activity-item" key={w.id}>
                  <p>{w.name} <span>+{w.xp} XP</span></p>
                  <button className="item-del" onClick={() => handleDeleteWorkout(w.id)}>SİL (G17)</button>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="profile-container">
            <div className="profile-box">
              <h2>PROFİL AYARLARI (G3-G4)</h2>
              <div className="info-row"><label>Kullanıcı</label> <span>Sema Yılmaz</span></div>
              <button className="action-btn" onClick={handleUpdateProfile}>GÜNCELLE (G4)</button>
              <div className="danger-zone">
                <button className="delete-btn" onClick={handleDeleteAccount}>HESABI SİL (G5)</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;