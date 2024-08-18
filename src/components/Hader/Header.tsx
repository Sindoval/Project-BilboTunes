import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Header.css';
import logo from '../../images/logo.png';

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
    <header data-testid="header-component" className="header">
      <div className="header-top">
        <div className="bilbo-tunes">
          <h3>
            Bilbo
            <span className="tunes">
              Tunes
            </span>
          </h3>
          <img src={ logo } alt="logo" className="header-img" />
        </div>
        <div className="bilbo-tunes2">
          <h3 data-testid="header-user-name">{ userName }</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div>
      </div>
      <nav>
        <NavLink to="/search" data-testid="link-to-search">
          Search
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favorites
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Profile
        </NavLink>
      </nav>
    </header>
  );
}
