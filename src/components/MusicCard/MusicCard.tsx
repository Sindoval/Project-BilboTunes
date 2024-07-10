import { useEffect, useState } from 'react';
import empty_heart from '../../images/empty_heart.png';
import checked_heart from '../../images/checked_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';

type MusicCardProps = {
  info: {
    id: number,
    trackName: string,
    previewUrl: string,
    artWorkUrl100: string,
    favMusics: SongType[],
  };
};

export default function MusicCard({ info }: MusicCardProps) {
  const [inputCheck, setInputCheck] = useState(false);

  useEffect(() => {
    if (info.favMusics) {
      const favTest = info.favMusics.some((music) => music.trackId === info.id);
      setInputCheck(favTest);
    }
  }, [info.favMusics, info.id]);

  const handleChange = async () => {
    setInputCheck(!inputCheck);
    if (!inputCheck) {
      await addSong({
        trackId: info.id,
        trackName: info.trackName,
        previewUrl: info.previewUrl });
    } else {
      await removeSong({
        trackId: info.id,
        trackName: info.trackName,
        previewUrl: info.previewUrl });
    }
  };

  return (
    <div className="music-card">
      <p>{info.trackName}</p>
      <img src={ info.artWorkUrl100 } alt={ info.trackName } />
      <audio data-testid="audio-component" src={ info.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ info.trackName }
        data-testid={ `checkbox-music-${info.id}` }
      >
        <input
          type="checkbox"
          name=""
          id={ info.trackName }
          checked={ inputCheck }
          onChange={ handleChange }
        />
        {inputCheck ? (
          <img src={ checked_heart } alt="favorite" id={ info.trackName } />
        ) : (
          <img src={ empty_heart } alt="favorite" id="checked" />
        ) }
      </label>
    </div>
  );
}
