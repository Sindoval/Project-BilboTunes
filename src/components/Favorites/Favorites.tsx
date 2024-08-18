import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { SongType } from '../../types';
import MusicCard from '../MusicCard/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import '../Album/Album.css';

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favMusics, setFavMusics] = useState<SongType[] | []>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const musics = await getFavoriteSongs();
      setFavMusics(musics);
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const favMusicsReload = async () => {
    const musics = await getFavoriteSongs();
    setFavMusics(musics);
  };

  return (
    <>
      <h1>Favorites</h1>
      {favMusics.length > 0 && (
        <main className="music-list">
          {favMusics.map((music) => (
            <MusicCard
              key={ music.previewUrl }
              id={ Number(music.trackId) }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              refetchFavorites={ favMusicsReload }
              page="favorites"
              checked
            />
          ))}
        </main>
      )}
    </>
  );
}
