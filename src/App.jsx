import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useGreeting = () => {
  const { data, error } = useSWR('/.netlify/functions/hello', fetcher);

  console.log (data);

  return {
    greeting: data?.message,
    isLoading: !error && !data,
    isError: error,
  };
};

const App = () => {
  const { greeting, isLoading, isError } = useGreeting();

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {isLoading && <p>読込中...</p>}
        {isError && <p>読み込みエラー</p>}
        {greeting && <p>{greeting}</p>}
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
