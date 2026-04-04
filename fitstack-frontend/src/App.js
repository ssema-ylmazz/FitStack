import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SemaTasks from './components/SemaTasks';
import HuseyinTasks from './components/HuseyinTasks';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. ANA SAYFA: Sitenin asıl girişi burası olacak */}
        <Route path="/" element={
          <div style={{ 
            backgroundColor: '#0f172a', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'white' 
          }}>
            <h1 style={{ color: '#adff2f', fontSize: '3rem' }}>FitStack</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Geleceğin Fitness Takip Platformu</p>
            
            {/* Hocanın panele kolayca gitmesi için bir buton ekleyelim */}
            <Link to="/test" style={{
              padding: '12px 24px',
              backgroundColor: '#adff2f',
              color: '#0f172a',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Mühendislik Paneline Git (Gereksinim Testleri)
            </Link>
          </div>
        } />

        {/* 2. TEST PANELİ: Eski panelin artık bu linkte */}
        <Route path="/test" element={
          <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ color: '#adff2f' }}>FITSTACK ENGINEERING PANEL</h1>
              <p>Sema & Hüseyin: 1-17 Arası Tüm Gereksinimler Test Paneli</p>
              <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Ana Sayfaya Dön</Link>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <section style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px' }}>
                <h2 style={{ borderBottom: '2px solid #adff2f', paddingBottom: '10px' }}>SEMA YILMAZ PANELİ</h2>
                <SemaTasks />
              </section>

              <section style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px' }}>
                <h2 style={{ borderBottom: '2px solid #adff2f', paddingBottom: '10px' }}>HÜSEYİN GİRİŞ PANELİ</h2>
                <HuseyinTasks />
              </section>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;