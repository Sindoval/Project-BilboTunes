import { useEffect, useState } from 'react';
import empty_heart from '../../images/empty_heart.png';
import checked_heart from '../../images/checked_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import getMusics from '../../services/musicsAPI';
import { AlbumType } from '../../types';
import './MusicCard.css';

type MusicCardProps = {
  id: number,
  trackName: string,
  previewUrl: string,
  checked: boolean,
  page: 'album' | 'favorites',
  refetchFavorites: () => void,
};

export default function MusicCard(
  { id,
    trackName,
    previewUrl,
    checked,
    page,
    refetchFavorites,
  }: MusicCardProps,
) {
  const [inputCheck, setInputCheck] = useState(false);
  const [infoArtist, setInfoArtist] = useState<AlbumType | null>(null);

  useEffect(() => {
    setInputCheck(checked);
    const musicsAPI = async () => {
      const data = await getMusics(String(id));
      const [info] = data;
      setInfoArtist(info);
    };
    musicsAPI();
  }, [checked, id]);

  const handleChange = async () => {
    setInputCheck(!inputCheck);
    if (inputCheck) {
      await removeSong({
        trackId: id,
        trackName,
        previewUrl });
      refetchFavorites();
    } else {
      setInputCheck(true);
      await addSong({
        trackId: id,
        trackName,
        previewUrl });
    }
  };
  if (page === 'favorites' && !inputCheck) {
    return;
  }
  return (
    <div className="music-card">
      <p>{trackName}</p>
      { infoArtist && (
        <img src={ infoArtist.artworkUrl100 } alt={ trackName } />
      )}
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackName }
          data-testid={ `checkbox-music-${id}` }
        >
          <input
            type="checkbox"
            name=""
            id={ trackName }
            checked={ inputCheck }
            onChange={ handleChange }
          />
          {inputCheck ? (
            <img
              src={ checked_heart }
              alt="favorite"
              id={ trackName }
              className="fav-img"
            />
          ) : (
            <img
              src={ empty_heart }
              alt="favorite"
              id="checked"
              className="fav-img"
            />
          ) }
        </label>
      </div>
    </div>
  );
}
