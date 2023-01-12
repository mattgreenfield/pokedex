import '../styles/globals.css';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { AllPokemon } from '../components/AllPokemon';
import Image from 'next/image';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [search, setSearch] = useState('');

  return (
    <Provider store={store}>
      <div className="container mx-auto px-2">
        <header className="pt-8 pb-8">
          <div className="flex justify-center mb-8">
            <Image src="/logo.svg" width={221} height={80} />
          </div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold font-mono">Pokédex</h1>
            <div className="w-48">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search…"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </header>
        <AllPokemon search={search} />
        <Component {...pageProps} />
        <footer className="mt-10 mb-4">Made by Matt Greenfield</footer>
      </div>
    </Provider>
  );
}

export default MyApp;
