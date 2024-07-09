import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Header.css';

export default function Header() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const searchUser = async () => {
      const { name } = await getUser();
      setLoading(false);
      setUserName(name);
    };
    searchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <header data-testid="header-component">
      <h3 data-testid="header-user-name">{ userName }</h3>
      <nav>
        <NavLink to="/search" data-testid="link-to-search" />
        Search
        <NavLink to="/favorites" data-testid="link-to-favorites" />
        Favorites
        <NavLink to="/profile" data-testid="link-to-profile" />
        Profile
      </nav>
    </header>
  );
}
