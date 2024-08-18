import './AlbumCard.css';
import { Link } from 'react-router-dom';

type AlbumCardProps = {
  info: {
    id: number;
    artist: string;
    albumName: string;
    url: string;
    price: number;
    date: string;
  };
};

export default function AlbumCard({ info }: AlbumCardProps) {
  return (
    <div className="album-card">
      <Link to={ `/album/${info.id}` } data-testid={ `link-to-album-${info.id}` }>
        <p>{info.artist}</p>
        <p>{info.albumName}</p>
        <img src={ info.url } alt={ info.albumName } />
      </Link>
    </div>
  );
}
