import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Album from './components/Album/Album';
import { AlbumType } from './types';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Layout from './components/Layout/Layout';
import Favorites from './components/Favorites/Favorites';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';

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
      <Route path="/" element={ <Layout /> }>
        <Route
          path="/search"
          element={ <Search globalState={ { albumList, searchArtist } } /> }
        />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="*/" />
      </Route>
    </Routes>
  );
}

export default App;
