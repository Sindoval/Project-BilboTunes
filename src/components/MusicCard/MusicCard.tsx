import { useState } from 'react';
import empty_heart from '../../images/empty_heart.png';
import checked_heart from '../../images/checked_heart.png';

type MusicCardProps = {
  info: {
    id: number,
    trackName: string,
    previewUrl: string,
    artWorkUrl100: string,
  };
};

export default function MusicCard({ info }: MusicCardProps) {
  const [inputCheck, setInputCheck] = useState(false);

  const hangleChange = () => {
    setInputCheck(!inputCheck);
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
          onChange={ hangleChange }
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
