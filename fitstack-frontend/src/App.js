import React from 'react';
import SemaTasks from './components/SemaTasks';
import HuseyinTasks from './components/HuseyinTasks';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>FitStack - Sema & Hüseyin Ortak Projesi</h1>
      <p>Yazılım Mühendisliği Ödevi - 4. Aşama</p>
      <hr />
      <SemaTasks /> 
      <hr />
      <HuseyinTasks />
    </div>
  );
}

export default App;