type MusicCardProps = {
  info: {
    trackName: string,
    previewUrl: string,
    artWorkUrl100: string,
  };
};

export default function MusicCard({ info }: MusicCardProps) {
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
    </div>
  );
}
