import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('login'); // login, dashboard, profile
  const [filter, setFilter] = useState('Hepsi');
  const [xp, setXp] = useState(1250);

  // Gereksinim 1 & 1.5: Giriş ve Kayıt Paneli
  if (page === 'login' || page === 'register') {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="logo-main">FIT<span>STACK</span></h1>
            <p>{page === 'login' ? 'Yolculuğa devam et.' : 'Yeni bir başlangıç yap.'}</p>
          </div>
          <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setPage('dashboard'); }}>
            {page === 'register' && <input type="text" placeholder="Ad Soyad" className="auth-input" />}
            <input type="email" placeholder="E-posta" className="auth-input" required />
            <input type="password" placeholder="Şifre" className="auth-input" required />
            <button type="submit" className="auth-submit">
              {page === 'login' ? 'Giriş Yap' : 'Kayıt Ol (Gereksinim 1)'}
            </button>
          </form>
          <button className="auth-switch" onClick={() => setPage(page === 'login' ? 'register' : 'login')}>
            {page === 'login' ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten üye misin? Giriş Yap'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Üst Menü - Profesyonel Çizgi */}
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
            {/* Gereksinim 15: Günlük Seri & Gereksinim 11: Puan */}
            <div className="header-stats">
              <div className="stat-unit">
                <label>GÜNLÜK SERİ (G15)</label>
                <h2>🔥 5 GÜN</h2>
              </div>
              <div className="stat-unit">
                <label>TOPLAM PUAN (G11)</label>
                <h2 className="xp-text">{xp} XP</h2>
              </div>
              <div className="stat-unit">
                <label>ROZETLER (G13)</label>
                <div className="mini-badges">🏆 ⚡ 🎖️</div>
              </div>
            </div>

            {/* Gereksinim 7: Filtreleme */}
            <section className="programs-section">
              <div className="section-bar">
                <h3>PROGRAMLAR (G7)</h3>
                <div className="filters">
                  {['Hepsi', 'Başlangıç', 'İleri'].map(f => (
                    <button key={f} className={filter === f ? 'f-active' : ''} onClick={() => setFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="program-row">
                <div className="prog-card">
                  <span className="tag">BAŞLANGIÇ</span>
                  <h4>Kardiyo Temelleri</h4>
                  <button className="action-btn" onClick={() => setXp(xp + 50)}>Antrenman Kaydet (G9)</button>
                </div>
              </div>
            </section>

            {/* Gereksinim 17: Kayıt Silme */}
            <section className="recent-activity">
              <h3>AKTİVİTE GEÇMİŞİ</h3>
              <div className="activity-item">
                <p>Sabah Koşusu <span>+120 XP</span></p>
                <button className="item-del" onClick={() => alert('Kayıt Silindi (G17)')}>KAYDI SİL</button>
              </div>
            </section>
          </div>
        ) : (
          /* Gereksinim 3 & 5: Profil ve Hesap Silme */
          <div className="profile-container">
            <div className="profile-box">
              <h2>PROFİL AYARLARI (G3)</h2>
              <div className="info-row"><label>E-posta</label> <span>sema@fitstack.com</span></div>
              <div className="info-row"><label>Hesap Tipi</label> <span>Premium</span></div>
              <div className="danger-zone">
                <p>Dikkat: Hesabınızı sildiğinizde tüm XP ve rozetleriniz sıfırlanır.</p>
                <button className="delete-btn" onClick={() => alert('Hesap Silindi (G5)')}>HESABI SİL (G5)</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;