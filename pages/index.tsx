import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAxios from '../hooks/axios';
import { set as setPokemon } from '../store/pokemonSlice';
import { List } from '../components/List';
import { ListItem } from '../components/ListItem';

export default function Home() {
  // TODO: move this data fetching and storage to a wrapper component
  const pokemon = useSelector(state => state.pokemon);
  const dispatch = useDispatch();

  const apiConfig = useMemo(
    () => ({
      params: {
        limit: 151,
      },
    }),
    []
  );

  const { response, loading, error } = useAxios({
    // method: 'get',
    url: '/pokemon',
    config: apiConfig,
  });

  useEffect(() => {
    if (response !== null) {
      dispatch(setPokemon(response.results));
    }
  }, [response, dispatch]);

  return (
    <div className='container mx-auto'>
      <Head>
        <title>Pokédex</title>
        <meta name='description' content='A list of Pokémon' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <header className='pt-8 pb-8'>
        <h1 className='text-3xl font-bold'>Pokédex</h1>
      </header>
      <main>
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>
            {error && (
              <div>
                <p>{error.message}</p>
              </div>
            )}
            {pokemon.all.length ? (
              <List
                items={pokemon.all}
                key='id'
                render={item => (
                  <ListItem>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt={`${item.name}`} className='mx-auto' />
                    <div>{item.name}</div>
                    <div>#{item.id}</div>
                  </ListItem>
                )}></List>
            ) : (
              'No Pokemon Found'
            )}
          </div>
        )}
      </main>

      <footer>Made by Matt Greenfield</footer>
    </div>
  );
}
