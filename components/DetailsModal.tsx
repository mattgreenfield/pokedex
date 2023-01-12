import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSeen } from '../store/pokemonSlice';
import useAxios from '../hooks/axios';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { PokemonDetails } from '../store/types';
import { RootState } from '../store/store';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';
import { Modal } from './Modal';
import { Badge } from './Badge';
import {getBackgroundFromType} from '../helpers/backgroundFromType';
import { ucFirst } from '../helpers/string';

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


  const getGeneralInfoMarkup = (pokemonDetails) => {
    return [
        {
            'title': 'Type',
            'markup':  <ul className='flex gap-2'>{pokemonDetails.types.map((t) => (
                        <li key={t.slot}><Badge>{t.type.name}</Badge></li>
                        ))}</ul>,
        },
        { 'title': 'Species', markup: pokemonDetails.species.name },        
        { 'title': 'Height', markup: <>{pokemonDetails.height}cm</> },            
        { 'title': 'Weight', markup: <>{pokemonDetails.weight}kg</> },
        { 'title': 'Abilities', markup:
            <ul className='flex gap-2'>{pokemonDetails.abilities.map(({ability}) => <li><Badge>{ability.name}</Badge></li>)}</ul>
        },             
    ];
  }

  return (
    <Modal forceOpen onClose={() => router.push('/', null, { scroll: false })} footer={() => (<>
        <Link href={`/${Number(id) - 1}`} passHref><a className="font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-8 w-1/2 grow-0 text-left">Previous</a></Link>
        <Link href={`/${Number(id) + 1}`} passHref><a className="font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-8 w-1/2 grow-0 text-right">Next</a></Link>
    </>)}>
          {pokemonDetails && (
            <Head>
                <title>{pokemonDetails.name} | Pokédex</title>
                <meta name="description" content={`Everything you need to know about ${pokemonDetails.name}`} />
            </Head>
          )}
        <>
        <header className={classNames('mb-12 px-6 pt-8', {
            [getBackgroundFromType(pokemonDetails?.types[0].type.name)]: !!pokemonDetails,
            'bg-gray-50': loading,
        })}>   
            {loading && <div className='text-3xl h-[1em] bg-gray-200 w-40 bg-opacity-75'></div> }
            {pokemonDetails && <h2 className='font-bold text-3xl text-white'>{pokemonDetails.name}</h2> }
            <div className='h-[200px]'>  
                <img 
                    className={classNames('mx-auto relative top-10 h-[200px]', {
                        'blur-md scale-125': loading,
                    })} 
                    height="200px" 
                    key={id} 
                    src={pokemonDetails ? pokemonDetails.sprites.other.['dream_world']['front_default'] : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                    alt={pokemonDetails && pokemonDetails.name}
                />
            </div>
        </header>
        <div className="p-4">
        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                { ['General', 'Moves', 'Stats'].map((label) => (
                    <Tab
                    key={label}
                    className={({ selected }) =>
                        classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700',
                        selected
                            ? 'bg-white shadow'
                            : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-700'
                        )
                    }
                    >
                    { label }
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel
                key='general'
                className={classNames(
                    'rounded-xl bg-white p-3',
                )}
                >
                    {pokemonDetails && (<>
                        <h3 className='sr-only'>General</h3>
                        <dl>
                            { getGeneralInfoMarkup(pokemonDetails).map(({title, markup}) => (
                            <div className='flex gap-4 mb-1'>          
                                <dd className='text-gray-500 min-w-[70px]'>{title}:</dd>
                                <dt className='font-medium'>{ markup }</dt>
                            </div>    
                            )) }
                        </dl>
                    </>)}
                </Tab.Panel>
                <Tab.Panel
                key='moves'
                className={classNames(
                    'rounded-xl bg-white p-3',
                )}
                >
                {pokemonDetails && (
                    <>
                        <h3 className='sr-only'>Moves</h3>
                        <ul className='flex flex-wrap gap-2 max-h-56 overflow-auto'>{pokemonDetails.moves.map(({move}) => <li><Badge>{move.name}</Badge></li>)}</ul>
                    </>
                )}
                </Tab.Panel>
                <Tab.Panel
                key='stats'
                className={classNames(
                    'rounded-xl bg-white p-3',
                )}
                >
                {pokemonDetails && (
                    <>
                        <h3 className='sr-only'>Stats</h3>
                        <ul>{pokemonDetails.stats.map(({base_stat, effort, stat}) => (<li>
                            <div className='font-medium'>{ ucFirst(stat.name) }</div>
                            <div className='h-4 rounded bg-gray-100'>
                                <div style={{width: `${base_stat}%`}} className='bg-gray-600 h-4 max-w-full rounded text-white text-sm leading-[1.15] text-right px-1'>{base_stat}</div>
                            </div>
                            <div className='text-right text-gray-700 text-sm mt-1'>Effort: {effort}</div>
                        </li>))}</ul>        
                    </>
                )}
                </Tab.Panel>
            </Tab.Panels>
            </Tab.Group>
            </div>
        </>
    </Modal>
  );
};
