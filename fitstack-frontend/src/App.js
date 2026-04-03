import React, { useState, useEffect } from 'react'; // 'useState' tanımlandı
import axios from 'axios'; // 'axios' tanımlandı
import './App.css';

// 'API_BASE_URL' tanımlandı
const API_BASE_URL = "http://localhost:8080/api";

function App() {
  // --- STATE TANIMLAMALARI ---
  const [page, setPage] = useState('login'); 
  const [filter, setFilter] = useState('Hepsi');
  const [xp, setXp] = useState(1250); 
  const [streak, setStreak] = useState(5); 
  const [programs, setPrograms] = useState([]); 
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Sabah Koşusu', xp: 120, date: '24 Mart' }
  ]);
  const [badges, setBadges] = useState([]);

  // --- HÜSEYİN'İN API FONKSİYONLARI ---

  // GEREKSİNİM 2: Kullanıcı Girişi
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

  // VERİLERİ ÇEKME (G6, G10, G12, G14, G16)
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
    } catch (e) {
      console.log("Hüseyin: Veriler henüz yüklenemedi.");
    }
  };

  // GEREKSİNİM 4: Profil Güncelleme
  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${API_BASE_URL}/users/profile`, { name: "Sema" });
      alert("Profil Güncellendi! (G4)");
    } catch (e) { console.error(e); }
  };

  // GEREKSİNİM 8: Program Seçme
  const handleSelectProgram = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/programs/${id}/select`);
      alert(`Program ${id} seçildi! (G8)`);
    } catch (e) { console.error(e); }
  };

  // --- TASARIM (SEMA'NIN ELITE UI) ---
  if (page === 'login' || page === 'register') {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          <h1 className="logo-main">FIT<span>STACK</span></h1>
          <form className="auth-form" onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="E-posta" className="auth-input" required />
            <input name="password" type="password" placeholder="Şifre" className="auth-input" required />
            <button type="submit" className="auth-submit">GİRİŞ YAP (G2)</button>
          </form>
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
          <span onClick={() => setPage('profile')} className={page === 'profile' ? 'active' : ''}>PROFİL (G4)</span>
          <span className="logout-link" onClick={() => setPage('login')}>ÇIKIŞ</span>
        </div>
      </nav>

      <main className="content-area">
        {page === 'dashboard' ? (
          <div className="dashboard-grid">
            <div className="header-stats">
              <div className="stat-unit">
                <label>GÜNLÜK SERİ (G16)</label>
                <h2>🔥 {streak} GÜN</h2>
              </div>
              <div className="stat-unit">
                <label>TOPLAM PUAN (G12)</label>
                <h2 className="xp-text">{xp} XP</h2>
              </div>
              <div className="stat-unit">
                <label>ROZETLER (G14)</label>
                <div className="mini-badges">🏆 ⚡ 🎖️</div>
              </div>
            </div>

            <section className="programs-section">
              <h3>PROGRAMLAR (G6)</h3>
              <div className="program-row">
                <div className="prog-card">
                  <span className="tag">SEVİYE</span>
                  <h4>Kardiyo Temelleri</h4>
                  <button className="action-btn" onClick={() => handleSelectProgram(1)}>SEÇ (G8)</button>
                </div>
              </div>
            </section>

            <section className="recent-activity">
              <h3>GEÇMİŞ (G10)</h3>
              {workouts.map(w => (
                <div className="activity-item" key={w.id}>
                  <p>{w.name} <span>+{w.xp} XP</span></p>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="profile-container">
            <button className="action-btn" onClick={handleUpdateProfile}>BİLGİLERİ GÜNCELLE (G4)</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;