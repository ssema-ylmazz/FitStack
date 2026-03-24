import React, { useState } from 'react';
import { 
  User, 
  Dumbbell, 
  Award, 
  Flame, 
  Trash2, 
  PlusCircle, 
  ShieldAlert 
} from 'lucide-react';

/**
 * FITSTACK - Sema'nın Geliştirici Paneli (Hatasız Sürüm)
 * Gereksinimler: 1, 3, 5, 7, 9, 11, 13, 15, 17
 */

const App = () => {
  // --- STATE YÖNETİMİ ---
  const [isRegistered, setIsRegistered] = useState(true); // Gereksinim 1
  const [points, setPoints] = useState(1850); // Gereksinim 11
  const [streak] = useState(15); // Gereksinim 15
  const [activeFilter, setActiveFilter] = useState('Hepsi'); // Gereksinim 7
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Gereksinim 5 için
  
  const [workouts, setWorkouts] = useState([
    { id: 101, name: 'Sema - Sabah Koşusu', level: 'Başlangıç', date: '25 Mart' },
    { id: 102, name: 'Sema - Kuvvet Antrenmanı', level: 'İleri', date: '26 Mart' },
  ]);

  // --- AKSİYONLAR ---

  // Gereksinim 1: Kayıt Olma
  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  // Gereksinim 5: Hesap Silme (HATANIN DÜZELTİLDİĞİ YER)
  const confirmDeleteAccount = () => {
    setIsRegistered(false); // Burada setIsLogged yazıyordu, setIsRegistered yaptık!
    setShowDeleteModal(false);
    alert("Hesabınız Sema tarafından sistemden silindi. (Reg 5)");
  };

  // Gereksinim 9 & 11: Antrenman Ekleme ve Puan
  const addNewWorkout = () => {
    const newW = { id: Date.now(), name: 'Sema - Yeni Antrenman', level: 'Orta', date: 'Yeni' };
    setWorkouts([newW, ...workouts]);
    setPoints(points + 75);
  };

  // Gereksinim 17: Antrenman Kaydı Silme
  const removeWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  // Kayıt Ekranı (Reg 1)
  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="bg-[#0f172a] border border-[#1e293b] p-10 rounded-[3rem] w-full max-w-md shadow-2xl shadow-lime-400/5">
          <h2 className="text-3xl font-black text-[#d9f99d] italic mb-8 text-center tracking-tighter">FITSTACK.</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" placeholder="Ad Soyad" className="w-full bg-[#1e293b] border-none p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-[#d9f99d]" required />
            <input type="email" placeholder="E-posta" className="w-full bg-[#1e293b] border-none p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-[#d9f99d]" required />
            <button type="submit" className="w-full bg-[#d9f99d] text-slate-950 font-black py-4 rounded-2xl hover:bg-[#c3e683] transition-all uppercase tracking-widest">
              Kayıt Ol (Reg 1)
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-8 font-sans selection:bg-[#d9f99d] selection:text-[#020617]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: Reg 11 & 15 */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-[#1e293b] pb-10">
          <div>
            <h1 className="text-5xl font-black text-white italic tracking-tighter">FITSTACK<span className="text-[#d9f99d]">.</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2 italic underline decoration-[#d9f99d]">Sema Engineering Dashboard</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-3xl flex items-center gap-4">
              <Flame size={24} className="text-orange-500" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Seri (Reg 15)</p>
                <p className="font-black text-xl text-white">{streak} GÜN</p>
              </div>
            </div>
            <div className="bg-[#d9f99d] p-5 rounded-3xl flex items-center gap-4 text-[#020617] shadow-xl shadow-[#d9f99d]/10">
              <Award size={24} />
              <div>
                <p className="text-[10px] opacity-70 font-bold uppercase">Puan (Reg 11)</p>
                <p className="font-black text-xl">{points}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* SOL PANEL: Reg 3, 5, 13 */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-[#0f172a] border border-[#1e293b] p-8 rounded-[2.5rem]">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3"><User className="text-[#d9f99d]" /> Profil (Reg 3)</h2>
              <div className="space-y-4 mb-8">
                <div className="bg-[#1e293b] p-4 rounded-2xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Kullanıcı</p>
                  <p className="font-bold">Sema Yılmaz</p>
                </div>
                <button onClick={() => setShowDeleteModal(true)} className="w-full py-4 text-xs font-black text-red-500 hover:bg-red-500/5 rounded-2xl border border-red-500/20 transition-all uppercase tracking-widest">
                  Hesabı Sil (Reg 5)
                </button>
              </div>
            </section>

            <section className="bg-[#0f172a] border border-[#1e293b] p-8 rounded-[2.5rem]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Award className="text-[#d9f99d]" /> Rozetler (Reg 13)</h2>
              <div className="flex gap-3">
                <div title="Puan Barajı" className="w-12 h-12 bg-[#1e293b] border border-[#d9f99d]/30 rounded-2xl flex items-center justify-center text-xl">🏆</div>
                <div title="Seri Ustası" className="w-12 h-12 bg-[#1e293b] border border-slate-700 rounded-2xl flex items-center justify-center text-xl opacity-30">🔥</div>
              </div>
            </section>
          </div>

          {/* SAĞ PANEL: Reg 7, 9, 17 */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-[#0f172a] border border-[#1e293b] p-10 rounded-[3rem]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Antrenmanlar</h2>
                <div className="flex bg-[#1e293b] p-1.5 rounded-2xl">
                  {['Hepsi', 'Başlangıç', 'Orta', 'İleri'].map(lvl => (
                    <button key={lvl} onClick={() => setActiveFilter(lvl)} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeFilter === lvl ? 'bg-[#d9f99d] text-[#020617]' : 'text-slate-500 hover:text-white'}`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {workouts.filter(w => activeFilter === 'Hepsi' || w.level === activeFilter).map(w => (
                  <div key={w.id} className="flex justify-between items-center p-6 bg-[#020617]/50 border border-[#1e293b] rounded-3xl hover:border-[#d9f99d]/30 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-[#1e293b] rounded-2xl flex items-center justify-center text-[#d9f99d]"><Dumbbell /></div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{w.name}</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{w.date} • <span className="text-[#d9f99d]">{w.level} (Reg 7)</span></p>
                      </div>
                    </div>
                    <button onClick={() => removeWorkout(w.id)} className="p-3 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>

              <button onClick={addNewWorkout} className="w-full mt-10 py-5 bg-white text-[#020617] font-black rounded-3xl hover:bg-[#d9f99d] transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl">
                <PlusCircle size={20} /> Yeni Antrenman Kaydet (Reg 9)
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* SİLME ONAY MODALI (Reg 5) */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-[#0f172a] border border-red-500/20 p-10 rounded-[3rem] max-w-sm w-full text-center">
             <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-white mb-2 italic">DİKKAT SEMA!</h3>
             <p className="text-slate-500 text-sm mb-8 leading-relaxed">Hesabını silmek tüm antrenman geçmişini ve kazandığın puanları kalıcı olarak yok eder.</p>
             <div className="flex flex-col gap-3">
               <button onClick={confirmDeleteAccount} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-xs">SİL VE İMHA ET (Reg 5)</button>
               <button onClick={() => setShowDeleteModal(false)} className="w-full py-4 bg-[#1e293b] text-slate-400 font-black rounded-2xl hover:text-white transition-all uppercase tracking-widest text-xs">VAZGEÇ</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;