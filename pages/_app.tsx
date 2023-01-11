import '../styles/globals.css';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { AllPokemon } from '../components/AllPokemon';
import Image from 'next/image';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className='container mx-auto'>
        <header className='pt-8 pb-8'>
          <div className='flex justify-center mb-8'>
            <Image src='/logo.svg' width={221} height={80} />
          </div>
          <h1 className='text-3xl font-bold font-mono'>Pokédex</h1>
        </header>
        <AllPokemon />
        <Component {...pageProps} />
        <footer className='mt-10 mb-4'>Made by Matt Greenfield</footer>
      </div>
    </Provider>
  );
}

export default MyApp;
