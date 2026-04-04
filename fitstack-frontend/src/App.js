import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SemaTasks from './components/SemaTasks';
import HuseyinTasks from './components/HuseyinTasks';

// ANA SAYFA BİLEŞENİ (Senin istediğin o düzgün web sitesi)
const Home = () => (
  <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
    {/* NAVBAR */}
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 80px', alignItems: 'center', backgroundColor: '#1e293b' }}>
      <h2 style={{ color: '#adff2f', margin: 0 }}>FITSTACK</h2>
      <div style={{ display: 'flex', gap: '30px' }}>
        <span>Programlar</span>
        <span>Antrenmanlar</span>
        <span>Hakkımızda</span>
        <Link to="/test" style={{ color: '#adff2f', textDecoration: 'none', fontWeight: 'bold' }}>Test Paneli</Link>
      </div>
    </nav>

    {/* HERO SECTION */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center', padding: '0 20px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>Sınırlarını <span style={{ color: '#adff2f' }}>Zorla.</span></h1>
      <p style={{ fontSize: '1.5rem', color: '#94a3b8', maxWidth: '700px' }}>
        FitStack ile antrenmanlarını takip et, puanları topla ve hayalindeki vücuda kavuş. 
        Kişiselleştirilmiş programlar ve detaylı analizler cebinde.
      </p>
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
        <button style={{ padding: '15px 40px', fontSize: '1.1rem', backgroundColor: '#adff2f', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Hemen Başla</button>
        <button style={{ padding: '15px 40px', fontSize: '1.1rem', backgroundColor: 'transparent', border: '2px solid white', color: 'white', borderRadius: '50px', cursor: 'pointer' }}>Programları İncele</button>
      </div>
    </div>

    {/* ÖZELLİKLER */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', padding: '80px', backgroundColor: '#1e293b' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#adff2f' }}>Akıllı Takip</h3>
        <p>Her antrenmanını saniye saniye kaydet.</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#adff2f' }}>Rozet Sistemi</h3>
        <p>Hedeflerine ulaştıkça özel rozetler kazan.</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#adff2f' }}>Günlük Seri</h3>
        <p>Disiplinini bozma, serini devam ettir.</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* LİNKİ AÇINCA GELECEK OLAN DÜZGÜN SİTE */}
        <Route path="/" element={<Home />} />

        {/* VİDEO ÇEKECEĞİN TEST PANELİ (linkin sonuna /test ekleyeceksin) */}
        <Route path="/test" element={
          <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px' }}>
            <h1 style={{ textAlign: 'center', color: '#adff2f' }}>MÜHENDİSLİK TEST PANELİ</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
              <SemaTasks />
              <HuseyinTasks />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;