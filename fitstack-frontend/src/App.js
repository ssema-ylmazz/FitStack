import React from 'react';
import SemaTasks from './components/SemaTasks'; // Sema'nın dosyası (eğer bu branch'te varsa)
import HuseyinTasks from './components/HuseyinTasks';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>FitStack - Takım Çalışması</h1>
      {/* SemaTasks buradaysa ekleyin, yoksa hata verebilir. 
          Merge aşamasında ikisi de burada olacak. */}
      <HuseyinTasks />
    </div>
  );
}

export default App;