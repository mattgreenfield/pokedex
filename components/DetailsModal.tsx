import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSeen } from '../store/pokemonSlice';
import useAxios from '../hooks/axios';
import { useRouter } from 'next/router';

import { Modal } from './Modal';
import { PokemonDetails } from '../store/types';
import { RootState } from '../store/store';
import Head from 'next/head';
import Link from 'next/link';

type DetailsModalProps = {
  id: number | string;
};

export const DetailsModal: FC<DetailsModalProps> = ({ id }) => {
  const pokemonDetails: PokemonDetails = useSelector((state: RootState) => {
    return state.pokemon.seen[id];
  });
  const dispatch = useDispatch();
  const router = useRouter();

  // TODO: only run this if it's not already in the store
  const { response, loading, error } = useAxios({
    url: `/pokemon/${id}`,
  });

  useEffect(() => {
    if (response !== null) {
      dispatch(setSeen(response));
    }
  }, [response, dispatch]);

  return (
    <Modal forceOpen onClose={() => router.push('/', null, { scroll: false })}>
      {loading && <h2>Loading</h2>}
      {pokemonDetails && (
        <>
            <Head>
                <title>{pokemonDetails.name} | Pokédex</title>
                <meta name="description" content={`Everything you need to know about ${pokemonDetails.name}`} />
            </Head>
            <header className='bg-red-400 mb-12 px-4 pt-4'>   
                <h2 className='font-bold text-3xl'>{pokemonDetails.name}</h2>
                <div>  
                <img className='mx-auto relative top-10' src={pokemonDetails.sprites.other.['dream_world']['front_default']} alt={pokemonDetails.name} />
                </div>
            </header>
            <ul>
                {pokemonDetails.types.map((t) => (
                <li key={t.slot}>{t.type.name}</li>
                ))}
            </ul>
                  <dl>
                      <div>          
                        <dd>Height:</dd>
                        <dt>{ pokemonDetails.height}</dt>
                      </div>
                      <div>          
                        <dd>Weight:</dd>
                        <dt>{ pokemonDetails.weight}</dt>
                      </div>

                  
            </dl>
            <nav>
                <Link href="/2">Previous</Link>
                <Link href="/4">Next</Link>
            </nav>
        </>
      )}
    </Modal>
  );
};
