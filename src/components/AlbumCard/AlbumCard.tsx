import './AlbumCard.css'
import { Link } from 'react-router-dom';

type AlbumCardProps = {
    info: {
    id: Number,
    artist: string,
    albumName: string,
    url: string,
    price: Number,
    date: string
    }
};

export default function AlbumCard({ info }:AlbumCardProps) {
    return (
        <div className="album-card">
            <Link to={`/album/${info.id}`} data-testid={`link-to-album-${info.id}`}>
                <p>{info.artist}</p>
                <p>{info.albumName}</p>
                <img src={info.url} alt={ info.albumName } />
                <p>Data: {info.date}</p>
                <p>Price - {String(info.price)}</p>
            </Link>
        </div>
    )
} 