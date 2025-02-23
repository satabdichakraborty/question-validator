import React from 'react';
import { ValidateItem } from './components/ValidateItem';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <main className="app-content">
        <ValidateItem />
      </main>
    </div>
  );
};

export default App; 