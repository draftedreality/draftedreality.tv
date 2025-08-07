import './index.css';

import logo from '../assets/logo.svg';
import reactLogo from '../assets/react.svg';

export const App = () => {
  return (
    <div className='app'>
      <div className='logo-container'>
        <img alt='Bun Logo' className='logo bun-logo' src={logo} />
        <img alt='React Logo' className='logo react-logo' src={reactLogo} />
      </div>

      <h1>Bun + React</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
};
