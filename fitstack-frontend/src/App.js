import React, { useState } from 'react';

/**
 * FITSTACK - HÜSEYİN'İN ULTRA-GÜVENLİ PANELİ (Aşama 4)
 * Bu sürüm dış kütüphane bağımlılığı olmadan (SVG kullanarak) çalışır.
 * Beyaz ekran hatasını önlemek için tasarlanmıştır.
 * Hüseyin'in Gereksinimleri: 2, 4, 6, 8, 10, 12, 14, 16
 */

// --- İKONLAR (SVG olarak gömülü - Dış paket gerektirmez) ---
const IconLogin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>;
const IconUser = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLayout = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const IconEdit = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
const IconInfo = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>;

const App = () => {
  // --- STATE YÖNETİMİ ---
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Reg 2
  const [activeTab, setActiveTab] = useState('programs'); // Reg 6 & 10
  const [isEditing, setIsEditing] = useState(false); // Reg 4
  const [selectedProgram, setSelectedProgram] = useState(null); // Reg 8
  const [user, setUser] = useState({ name: 'Hüseyin Ak', email: 'huseyin@fitstack.ai' });
  const points = 3840; // Reg 12
  const streak = 21; // Reg 14
  
  const [programs] = useState([
    { id: 1, title: 'Iron Strength', level: 'İleri', duration: '12 Hafta', desc: 'Maksimum güç artışı ve kas gelişimi için tasarlanmış ağır direnç programı.' },
    { id: 2, title: 'Yoga Flow', level: 'Başlangıç', duration: '4 Hafta', desc: 'Esneklik, denge ve zihinsel rahatlama sağlayan başlangıç seviye program.' },
    { id: 3, title: 'HIIT Cardio', level: 'Orta', duration: '6 Hafta', desc: 'Yüksek yoğunluklu interval antrenmanları ile hızlı yağ yakımı sağlar.' }
  ]);

  // --- AKSİYONLAR ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  // --- GİRİŞ EKRANI (Reg 2) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-slate-100 font-sans">
        <div className="bg-[#0f172a] border border-[#1e293b] p-10 rounded-[3rem] w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-[#d9f99d] p-4 rounded-2xl text-[#020617]"><IconLogin /></div>
          </div>
          <h2 className="text-3xl font-black text-[#d9f99d] italic mb-2 text-center tracking-tighter uppercase">FITSTACK LOGIN.</h2>
          <p className="text-slate-500 text-center mb-8 text-[10px] font-bold uppercase tracking-widest">Hüseyin Giriş Paneli</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="E-posta" className="w-full bg-[#1e293b] border-none p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-[#d9f99d]" required />
            <input type="password" placeholder="Şifre" className="w-full bg-[#1e293b] border-none p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-[#d9f99d]" required />
            <button type="submit" className="w-full bg-[#d9f99d] text-[#020617] font-black py-4 rounded-2xl hover:bg-[#c4e68c] uppercase tracking-widest shadow-xl">Giriş Yap (Reg 2)</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 lg:p-12 font-sans selection:bg-[#d9f99d] selection:text-[#020617]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: Reg 12 & 14 */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-[#1e293b] pb-10 gap-8">
          <div>
            <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">FITSTACK<span className="text-[#d9f99d]">.</span></h1>
            <p className="text-slate-500 uppercase tracking-widest text-[10px] mt-2 font-bold italic underline decoration-[#d9f99d] decoration-2 underline-offset-8">Hüseyin Engineering Dashboard</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-3xl flex items-center gap-4">
               <div className="text-[#d9f99d]"><IconLayout /></div>
               <div><p className="text-[10px] text-slate-500 font-bold uppercase">Puan (Reg 12)</p><p className="font-black text-2xl text-white">{points} XP</p></div>
             </div>
             <div className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-3xl flex items-center gap-4">
               <div className="text-orange-500">🔥</div>
               <div><p className="text-[10px] text-slate-500 font-bold uppercase">Seri (Reg 14)</p><p className="font-black text-2xl text-white">{streak} GÜN</p></div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* SOL PANEL: Reg 4 & 16 */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-[#0f172a] border border-[#1e293b] p-8 rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold flex items-center gap-3 text-white"><IconUser /> Profil (Reg 4)</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="text-slate-500 hover:text-[#d9f99d]"><IconEdit /></button>
              </div>
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="w-full bg-[#1e293b] p-4 rounded-xl text-white border border-[#1e293b] outline-none" />
                  <button type="submit" className="w-full bg-[#d9f99d] text-slate-950 font-black py-4 rounded-xl uppercase text-[10px] tracking-widest">GÜNCELLE</button>
                </form>
              ) : (
                <div className="bg-[#1e293b]/50 p-6 rounded-3xl border border-[#1e293b]">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Sporcu</p>
                  <p className="text-xl font-black text-white uppercase mb-4">{user.name}</p>
                  <p className="text-sm text-slate-400 italic">{user.email}</p>
                </div>
              )}
            </section>

            <section className="bg-[#0f172a] border border-[#1e293b] p-8 rounded-[2.5rem]">
              <h2 className="text-lg font-bold mb-6 text-white">Rozetler (Reg 16)</h2>
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-[#1e293b] rounded-2xl flex items-center justify-center text-3xl">🔱</div>
                <div className="w-14 h-14 bg-[#1e293b] rounded-2xl flex items-center justify-center text-3xl opacity-20">🛡️</div>
              </div>
            </section>
          </div>

          {/* SAĞ PANEL: Reg 6, 8, 10 */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-[#0f172a] border border-[#1e293b] p-10 rounded-[3rem]">
              <div className="flex bg-[#1e293b] p-1.5 rounded-2xl mb-10 inline-flex">
                <button onClick={() => setActiveTab('programs')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'programs' ? 'bg-[#d9f99d] text-[#020617]' : 'text-slate-500 hover:text-white'}`}>Programlar (Reg 6)</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map(p => (
                  <div key={p.id} className="group bg-[#020617]/50 border border-[#1e293b] p-8 rounded-[2.5rem] hover:border-[#d9f99d]/40 transition-all cursor-pointer" onClick={() => setSelectedProgram(p)}>
                    <div className="bg-[#1e293b] w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-slate-500 group-hover:text-[#d9f99d]"><IconLayout /></div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase italic">{p.title}</h3>
                    <p className="text-[10px] font-black uppercase text-[#d9f99d] tracking-widest">{p.level} • {p.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* MODAL: Reg 8 */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-6 z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] p-12 rounded-[4rem] max-w-xl w-full shadow-2xl">
             <div className="flex justify-between items-start mb-10 text-[#d9f99d]">
               <IconInfo />
               <button onClick={() => setSelectedProgram(null)} className="text-slate-500 hover:text-white text-3xl">✕</button>
             </div>
             <h3 className="text-4xl font-black text-white mb-2 italic uppercase tracking-tighter">{selectedProgram.title}</h3>
             <p className="text-[#d9f99d] text-[10px] font-black uppercase mb-8 border-b border-[#1e293b] pb-4 tracking-[0.2em]">Program Detayları (Reg 8)</p>
             <p className="text-slate-400 text-base leading-relaxed italic mb-12 border-l-4 border-[#d9f99d]/20 pl-6">"{selectedProgram.desc}"</p>
             <button onClick={() => {alert("Program başarıyla seçildi!"); setSelectedProgram(null);}} className="w-full py-6 bg-[#d9f99d] text-[#020617] font-black rounded-[2rem] uppercase tracking-widest shadow-2xl">PROGRAMA BAŞLA</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;