import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import Loading from '../Loading/Loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../MusicCard/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

export default function Album() {
  const [musics, setMusics] = useState<SongType[] | []>([]);
  const [infoArtist, setInfoArtist] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);
  const [favMusics, setFavMusics] = useState<SongType[] | []>([]);
  const params = useParams();
  const id = params.id ?? 'notFound';

  useEffect(() => {
    const musicsAPI = async () => {
      const data = await getMusics(id);
      const [info, ...musicList] = data;
      setInfoArtist(info);
      setMusics(musicList);
      setLoading(false);
    };
    const fetchFavorites = async () => {
      const musicsFav = await getFavoriteSongs();
      setFavMusics(musicsFav);
    };
    musicsAPI();
    fetchFavorites();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    infoArtist && (
      <>
        <header>
          <h1>Álbum</h1>
        </header>
        <main>
          <h1 data-testid="artist-name">{infoArtist.artistName}</h1>
          <h2 data-testid="album-name">{infoArtist.collectionName}</h2>
          <div id="music-list">
            {musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                id={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                page="album"
                refetchFavorites={ () => {} }
                checked={
                  favMusics.some((favMusic) => music.trackId === favMusic.trackId)
                }
              />
            ))}
          </div>
        </main>
      </>
    )
  );
}
