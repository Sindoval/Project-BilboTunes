import { useState, ChangeEvent, useEffect } from 'react';
import './Search.css';
import { AlbumType, GlobalState } from '../../types';
import AlbumCard from '../AlbumCard/AlbumCard';
import Loading from '../Loading/Loading';

export default function Search({ globalState }: GlobalState) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [artistSearch, setArtistSearch] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { albumList, searchArtist } = globalState;

  useEffect(() => {
    if (searched) {
      setMessageError(albumList.length === 0);
    }
  }, [albumList, searched]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);

    if (value.length >= 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const buttonClick = async () => {
    setLoading(true);
    searchArtist(inputValue); // função callback
    setArtistSearch(inputValue);
    setSearched(true);
    setInputValue('');
    setLoading(false);

    if (albumList.length === 0) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }
  };

  return (
    <>
      <header className="header-search">
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          value={ inputValue }
          onChange={ handleChange }
        />
        <button
          data-testid="search-artist-button"
          onClick={ buttonClick }
          disabled={ isDisabled }
          type="button"
          className="btn btn-warning"
        >
          Pesquisar
        </button>
      </header>
      <main>
        {loading && (
          <Loading />
        )}
        {messageError ? (
          <h2>Nenhum álbum foi encontrado</h2>
        ) : (
          <>
            {albumList.length > 0 && (
              <h2>{`Resultado de álbuns de: ${artistSearch}`}</h2>
            )}
            <div className="album-list">
              {albumList.map((album: AlbumType) => (
                <AlbumCard
                  key={ album.collectionId }
                  info={ {
                    id: album.collectionId,
                    artist: album.artistName,
                    albumName: album.collectionName,
                    url: album.artworkUrl100,
                    price: album.collectionPrice,
                    date: album.releaseDate,
                  } }
                  data-testid={ `album-card-${album.collectionId}` }
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
