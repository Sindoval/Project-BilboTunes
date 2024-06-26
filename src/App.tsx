import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Album from './components/Album/Album';
import { AlbumType } from './types';
import searchAlbumsAPI from './services/searchAlbumsAPI';

function App() {
  const [albumList, setArtistList] = useState<AlbumType[] | []>([]);
  const searchArtist = async (artist: string) => {
    const albuns = await searchAlbumsAPI(artist);
    setArtistList(albuns);
    console.log(albuns);
  };

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/search"
        element={ <Search globalState={ { albumList, searchArtist } } /> }
      />
      <Route path="/album/:id" element={ <Album /> } />
      <Route path="/favorites" />
      <Route path="/profile" />
      <Route path="/profile/edit" />
      <Route path="*/" />
    </Routes>
  );
}

export default App;
