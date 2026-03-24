import React, { useState } from 'react';
import { LogIn, User, Layout, Activity, ChevronRight, Edit3, Award, Info, Clock, CheckCircle, TrendingUp, Save, X, Trash2, UserPlus, Flame } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [user] = useState({ name: 'Sema & Hüseyin Team', email: 'dev@fitstack.ai' });
  
  const handleAuth = (e) => { e.preventDefault(); setIsLoggedIn(true); };
  const handleDeleteAccount = () => {
    if(window.confirm("Hesabınızı silmek istediğinize emin misiniz? (Reg 5)")) {
      setIsLoggedIn(false);
      alert("Hesap silindi.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-slate-100">
        <div className="bg-[#0f172a] border border-[#1e293b] p-10 rounded-[3rem] w-full max-w-md shadow-2xl text-center">
          <div className="bg-[#d9f99d] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><LogIn className="text-[#020617]" /></div>
          <h2 className="text-3xl font-black text-[#d9f99d] italic mb-8 uppercase italic">FITSTACK ACCESS.</h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="email" placeholder="E-posta" className="w-full bg-[#1e293b] p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#d9f99d]" required />
            <input type="password" placeholder="Şifre" className="w-full bg-[#1e293b] p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#d9f99d]" required />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-[#d9f99d] text-[#020617] font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest">Giriş (Reg 2)</button>
              <button type="button" onClick={() => alert("Kayıt (Reg 1)")} className="flex-1 border border-white/10 text-white font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest">Kayıt (Reg 1)</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 lg:p-12 font-sans selection:bg-[#d9f99d] selection:text-[#020617]">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-[#1e293b] pb-10 gap-8">
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">FITSTACK<span className="text-[#d9f99d]">.</span></h1>
          <div className="flex gap-4">
             <div className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-3xl flex items-center gap-4">
               <TrendingUp className="text-[#d9f99d]" />
               <div><p className="text-[10px] text-slate-500 font-bold uppercase">Tecrübe (Reg 11-12)</p><p className="font-black text-2xl text-white">5240 XP</p></div>
             </div>
             <div className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-3xl flex items-center gap-4">
               <Flame className="text-orange-500" />
               <div><p className="text-[10px] text-slate-500 font-bold uppercase">Seri (Reg 14-15)</p><p className="font-black text-2xl text-white">24 GÜN</p></div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-[#0f172a] border border-[#1e293b] p-8 rounded-[2.5rem]">
              <h2 className="text-lg font-bold flex items-center gap-3 text-white mb-6"><User className="text-[#d9f99d]" /> Profil (Reg 3-4)</h2>
              <div className="bg-[#1e293b]/50 p-6 rounded-3xl border border-[#1e293b] mb-6">
                <p className="text-xl font-black text-white uppercase">{user.name}</p>
                <p className="text-sm text-slate-400 italic">{user.email}</p>
              </div>
              <button onClick={handleDeleteAccount} className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Hesabı Sil (Reg 5)</button>
            </section>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <section className="bg-[#0f172a] border border-[#1e293b] p-10 rounded-[3rem]">
              <div className="flex bg-[#1e293b] p-1.5 rounded-2xl mb-10 inline-flex">
                <button onClick={() => setActiveTab('programs')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase ${activeTab === 'programs' ? 'bg-[#d9f99d] text-[#020617]' : 'text-slate-500'}`}>Programlar (Reg 6-7)</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{id:1, title:'Iron Strength', level:'İleri'}, {id:2, title:'Yoga Flow', level:'Başlangıç'}].map(p => (
                  <div key={p.id} className="bg-[#020617]/50 border border-[#1e293b] p-8 rounded-[2.5rem] hover:border-[#d9f99d]/40 transition-all cursor-pointer" onClick={() => setSelectedProgram(p)}>
                    <Layout className="mb-4 text-[#d9f99d]" />
                    <h3 className="text-2xl font-black text-white mb-2 uppercase italic">{p.title}</h3>
                    <span className="text-[10px] font-black uppercase text-[#d9f99d]">{p.level}</span>
                  </div>
                ))}
                <div onClick={() => alert("Yeni Kayıt (Reg 9)")} className="flex flex-col items-center justify-center border-2 border-dashed border-[#1e293b] rounded-[2.5rem] p-8 text-slate-600 hover:text-[#d9f99d] cursor-pointer">
                  <UserPlus size={40} className="mb-4" /><p className="text-[10px] font-black uppercase">Yeni Kayıt (Reg 9)</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {selectedProgram && (
        <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-6 z-50 text-center">
          <div className="bg-[#0f172a] border border-[#1e293b] p-12 rounded-[4rem] max-w-xl w-full relative">
             <button onClick={() => setSelectedProgram(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X /></button>
             <h3 className="text-4xl font-black text-white mb-4 italic uppercase">{selectedProgram.title} (Reg 8)</h3>
             <p className="text-slate-400 italic mb-12">Program detayları ve antrenman planı.</p>
             <div className="flex gap-4">
                <button onClick={() => setSelectedProgram(null)} className="flex-1 py-6 bg-[#d9f99d] text-[#020617] font-black rounded-[2rem] uppercase tracking-widest">BAŞLAT (Reg 8)</button>
                <button onClick={() => {alert("Silindi (Reg 17)"); setSelectedProgram(null);}} className="px-8 py-6 bg-red-500/10 text-red-500 border border-red-500/20 font-black rounded-[2rem] uppercase tracking-widest">SİL (Reg 17)</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;