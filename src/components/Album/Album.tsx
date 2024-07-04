import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import Loading from '../Loading/Loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../MusicCard/MusicCard';

// faça uma requisição utilizando a função getMusics do arquivo src/services/musicsAPI.ts
// Enquanto aguarda a resposta da API, exiba a mensagem Carregando...
// Exiba o nome da banda ou artista na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="artist-name"
// Exiba o nome do álbum na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="album-name"
// Liste todas as músicas do álbum na tela. Para isso, crie um componente chamado MusicCard que deverá exibir o nome da música (propriedade trackName no objeto
// recebido pela API) e um player para tocar o previe  da música (propriedade previewUrl no objeto recebido pela API).

export default function Album() {
  const [musics, setMusics] = useState<SongType[] | []>([]);
  const [infoArtist, setInfoArtist] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);
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
    musicsAPI();
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
                info={ {
                  trackName: music.trackName,
                  previewUrl: music.previewUrl,
                  artWorkUrl100: infoArtist.artworkUrl100,
                } }
              />
            ))}
          </div>
        </main>
      </>
    )
  );
}
