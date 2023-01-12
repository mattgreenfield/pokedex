import React, { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAxios from '../hooks/axios';
import { set as setPokemon } from '../store/pokemonSlice';
import { RootState } from '../store/store';
import Link from 'next/link';
import { Card } from './Card';
import classNames from 'classnames';
import { getColorFromType } from '../helpers/backgroundFromType';

type AllPokemonProps = {
  search: string;
};

export const AllPokemon: FC<AllPokemonProps> = ({ search }) => {
  // TODO: move this data fetching and storage to a wrapper component
  const allPokemon = useSelector((state: RootState) => state.pokemon.all);
  const seenPokemon = useSelector((state: RootState) => state.pokemon.seen);
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
    url: '/pokemon',
    config: apiConfig,
  });

  useEffect(() => {
    if (response !== null) {
      dispatch(setPokemon(response.results));
    }
  }, [response, dispatch]);

  const filteredList = allPokemon.filter(({ name }) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  const listClasses = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3';
  
  const getCardColor = (id) => {
    if (!seenPokemon[id]) {
      return null;
    }

    return getColorFromType(seenPokemon[id].types[0].type.name);
  };

  return loading ? (
    <ol className={listClasses}>
      {[...Array(80)].map(() => (
        <li>
          <Card />
        </li>
      ))}
    </ol>
  ) : (
    <div>
      {error && (
        <div>
          <p>{error.message}</p>
        </div>
      )}
      {allPokemon.length ? (
        <>
          <ol className={listClasses}>
            {filteredList.map((item) => (
              <li key={item.id}>
                <Link href={`/${item.id}`} scroll={false} passHref>
                  <a>
                    <Card color={getCardColor(item.id)}>
                      <div className="flex items-center justify-center grow">
                        <img
                          width="96px"
                          height="96px"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                          alt={`${item.name}`}
                          className={classNames({
                            'grayscale brightness-0 contrast-0': !seenPokemon[item.id],
                          })}
                        />
                      </div>
                      <div className="flex justify-between px-4 py-2 border-t bg-white">
                        <div>{item.name}</div>
                        <div className="text-gray-400">#{item.id}</div>
                      </div>
                    </Card>
                  </a>
                </Link>
              </li>
            ))}
          </ol>
          {!filteredList.length && <div className='text-center font-medium mt-8 mb-10'>No items found, please try another search</div>}
        </>
      ) : (
        'No Pokemon Found'
      )}
    </div>
  );
};
