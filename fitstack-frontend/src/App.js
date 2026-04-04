import React, { useState, useEffect } from 'react';
import api from './services/api';

const FitStackApp = () => {
  const [view, setView] = useState('landing'); 
  const [profile, setProfile] = useState({ username: '', points: 0, streak: 0 });
  const [authData, setAuthData] = useState({ email: '', password: '', username: '' });
  
  // G-6, 7, 8, 9 İçin State'ler
  const [programs, setPrograms] = useState([]); 
  const [selectedProgram, setSelectedProgram] = useState(null); 
  const [isTraining, setIsTraining] = useState(false); // Antrenman yapma modu
  const [difficulty, setDifficulty] = useState('');

  // --- 1. KULLANICI İŞLEMLERİ ---
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { username: authData.username, email: authData.email, password: authData.password });
      alert("Kayıt Başarılı! (G-1)");
      setView('landing');
    } catch (e) { alert("Kayıt hatası!"); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/login', { email: authData.email, password: authData.password });
      fetchProfile();
      setView('dashboard');
    } catch (e) { alert("Giriş başarısız! (G-2)"); }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setProfile(res.data);
    } catch (e) { console.error("Profil yüklenemedi"); }
  };

  // --- 2. ANTRENMAN & GÖRSEL SİSTEMİ (G-6, 7, 8, 9, 11, 13) ---
  const fetchPrograms = async (level = '') => {
    try {
      setDifficulty(level);
      const url = level ? `/programs?level=${level}` : '/programs';
      const res = await api.get(url); 
      setPrograms(res.data); 
      setView('workouts');
    } catch (e) { alert("Programlar yüklenemedi!"); }
  };

  // G-8: Programı Seç ve Antrenman Sayfasına Hazırla
  const handleStartTraining = (prog) => {
    setSelectedProgram(prog); 
    setIsTraining(true); // Antrenman yapma ekranını açar
  };

  // G-9, G-11, G-13: Bitirince Puan ve Kayıt Ekleme
  const handleFinishWorkout = async () => {
    try {
      await api.post('/workouts', { programId: selectedProgram.id }); // G-9
      await api.put(`/workouts/${selectedProgram.id}/points`); // G-11: Puan Ekle
      await api.post('/badges'); // G-13: Rozet Ekle
      
      alert(`TEBRİKLER! ${selectedProgram.name} bitti. +50 Puan ve Rozet Kazandın! 🏆`);
      
      setIsTraining(false);
      setSelectedProgram(null);
      fetchProfile(); // Ana sayfadaki puanı anında günceller
      setView('dashboard');
    } catch (e) { alert("Kayıt oluşturulamadı."); }
  };

  // --- ARAYÜZLER ---

  // GİRİŞ & KAYIT
  if (view === 'landing' || view === 'register') {
    return (
      <div style={fullPage}>
        <div style={loginCard}>
          <h1 style={{color: '#adff2f'}}>FITSTACK</h1>
          <h2>{view === 'landing' ? 'Giriş' : 'Kayıt'}</h2>
          <form onSubmit={view === 'landing' ? handleLogin : handleRegister}>
            {view === 'register' && <input type="text" placeholder="Kullanıcı Adı" style={inputS} onChange={e => setAuthData({...authData, username: e.target.value})} />}
            <input type="email" placeholder="E-posta" style={inputS} onChange={e => setAuthData({...authData, email: e.target.value})} />
            <input type="password" placeholder="Şifre" style={inputS} onChange={e => setAuthData({...authData, password: e.target.value})} />
            <button type="submit" style={mainBtn}>{view === 'landing' ? 'Giriş Yap' : 'Kayıt Ol'}</button>
          </form>
          <p onClick={() => setView(view === 'landing' ? 'register' : 'landing')} style={{cursor:'pointer', marginTop:'15px', fontSize:'14px'}}>
            {view === 'landing' ? "Üye değil misin? Kayıt Ol" : "Zaten üyen misin? Giriş Yap"}
          </p>
        </div>
      </div>
    );
  }

  // ANTRENMAN YAPILIYOR EKRANI (RESİMLİ / GÖRSEL MODU)
  if (isTraining && selectedProgram) {
    return (
      <div style={trainingOverlay}>
        <div style={trainingContent}>
          <h2 style={{color: '#adff2f'}}>{selectedProgram.name} Başladı!</h2>
          <div style={imageContainer}>
             {/* Burası senin istediğin antrenman görseli alanı */}
             <img 
               src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXZueXpueXpueXpueXpueXpueXpueXpueXpueXpueXpueXpueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKu5fS05J7XW74c/giphy.gif" 
               alt="Antrenman Rehberi" 
               style={{width:'100%', height:'100%', objectFit:'cover'}} 
             />
          </div>
          <div style={{margin:'20px 0', backgroundColor:'#1e293b', padding:'15px', borderRadius:'10px'}}>
             <p>🔥 <b>Hedef:</b> 12 Tekrar x 3 Set</p>
             <small>Doğru nefes almayı ve formunuzu korumayı unutmayın!</small>
          </div>
          <button onClick={handleFinishWorkout} style={finishBtn}>Antrenmanı Bitir & Puanı Al (G-9, 11, 13)</button>
          <button onClick={() => setIsTraining(false)} style={{color:'gray', background:'none', border:'none', marginTop:'15px', cursor:'pointer'}}>Egzersizi Durdur</button>
        </div>
      </div>
    );
  }

  // ANTRENMAN LİSTESİ (G-6, 7, 8)
  if (view === 'workouts') {
    return (
      <div style={dashboardBg}>
        <nav style={navS}><button onClick={() => setView('dashboard')} style={logoutBtn}>← Geri</button><h2>Antrenman Seç</h2></nav>
        <div style={content}>
          <div style={{display:'flex', gap:'10px', marginBottom:'20px', justifyContent:'center'}}>
            <button onClick={() => fetchPrograms('beginner')} style={difficulty === 'beginner' ? activeTab : filterBtn}>Başlangıç</button>
            <button onClick={() => fetchPrograms('advanced')} style={difficulty === 'advanced' ? activeTab : filterBtn}>İleri</button>
            <button onClick={() => fetchPrograms('')} style={filterBtn}>Tümü</button>
          </div>
          <div style={{display:'grid', gap:'15px'}}>
            {programs.map(prog => (
              <div key={prog.id} style={progCard}>
                <div>
                  <h4 style={{margin:0}}>{prog.name} (G-6)</h4>
                  <small>{prog.level} | {prog.duration} dk</small>
                </div>
                <button onClick={() => handleStartTraining(prog)} style={selectBtn}>Antrenmana Başla (G-8)</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ANA DASHBOARD
  return (
    <div style={dashboardBg}>
      <nav style={navS}><h2 style={{color:'#adff2f'}}>FITSTACK</h2><button onClick={() => setView('landing')} style={logoutBtn}>Çıkış</button></nav>
      <div style={content}>
        <div style={welcomeBox}>
          <h1>Hoş geldin, {profile.username || 'Sporcu'}! 👋</h1>
        </div>
        <div style={statsGrid}>
          <div style={statCard}><h3>{profile.points || 0} XP</h3><p>Puan (G-12)</p></div>
          <div style={statCard}><h3>{profile.streak || 0} Gün</h3><p>Seri (G-15)</p></div>
          <div style={statCard}><h3>🏆</h3><p>Rozetler (G-14)</p></div>
        </div>
        <button onClick={() => fetchPrograms('')} style={bigBtn}>Antrenmanlara Göz At (G-6)</button>
        <button onClick={() => api.delete('/users/profile').then(() => setView('landing'))} style={deleteBtn}>Hesabı Kapat (G-5)</button>
      </div>
    </div>
  );
};

// --- STİLLER ---
const fullPage = { backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' };
const loginCard = { backgroundColor: '#1e293b', padding: '40px', borderRadius: '20px', width: '350px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' };
const inputS = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' };
const mainBtn = { width: '107%', padding: '12px', backgroundColor: '#adff2f', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const dashboardBg = { backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' };
const navS = { padding: '20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b' };
const logoutBtn = { background: 'none', border: '1px solid #adff2f', color: '#adff2f', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' };
const content = { maxWidth: '800px', margin: '0 auto', padding: '40px' };
const welcomeBox = { marginBottom: '30px', textAlign: 'center' };
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' };
const statCard = { backgroundColor: '#1e293b', padding: '20px', borderRadius: '20px', textAlign: 'center', border: '1px solid #334155' };
const bigBtn = { width: '100%', padding: '20px', backgroundColor: '#adff2f', color: '#0f172a', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' };
const progCard = { backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' };
const selectBtn = { backgroundColor: '#adff2f', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const filterBtn = { padding: '8px 15px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #adff2f', borderRadius: '5px', cursor: 'pointer' };
const activeTab = { padding: '8px 15px', backgroundColor: '#adff2f', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' };
const deleteBtn = { marginTop: '40px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', width: '100%' };
const trainingOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.98)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const trainingContent = { textAlign: 'center', maxWidth: '500px', padding: '20px' };
const imageContainer = { width: '100%', height: '300px', backgroundColor: '#000', borderRadius: '20px', overflow: 'hidden', marginTop: '20px' };
const finishBtn = { width: '100%', padding: '18px', backgroundColor: '#adff2f', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' };

export default FitStackApp;