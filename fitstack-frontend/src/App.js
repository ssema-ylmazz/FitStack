import React from 'react';
import SemaTasks from './components/SemaTasks';
import HuseyinTasks from './components/HuseyinTasks';

function App() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#adff2f' }}>FITSTACK ENGINEERING PANEL</h1>
        <p>Sema & Hüseyin: 1-17 Arası Tüm Gereksinimler Test Paneli</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* SOL TARAF - SEMA (TEK SAYILAR) */}
        <section style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px' }}>
          <h2 style={{ borderBottom: '2px solid #adff2f', paddingBottom: '10px' }}>SEMA YILMAZ PANELİ</h2>
          <SemaTasks />
        </section>

        {/* SAĞ TARAF - HÜSEYİN (ÇİFT SAYILAR) */}
        <section style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px' }}>
          <h2 style={{ borderBottom: '2px solid #adff2f', paddingBottom: '10px' }}>HÜSEYİN GİRİŞ PANELİ</h2>
          <HuseyinTasks />
        </section>
      </div>
    </div>
  );
}

export default App;