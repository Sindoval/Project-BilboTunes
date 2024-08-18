import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './Profile.css';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setLoading(false);
      setUser(userData);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <h1>Profile</h1>
      {user && (
        <main className="profile-info">
          <div className="profile-foto">
            { user.image ? (
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                />
              </svg>
            )}
            <Link to="/profile/edit" className="btn btn-outline-warning">Editar perfil</Link>
          </div>
          <div>
            <h4>Nome</h4>
            <p>{ user.name }</p>
          </div>
          <div>
            <h4>E-mail</h4>
            <p>{ user.email }</p>
          </div>
          <div>
            <h4>Descrição</h4>
            <p>{ user.description }</p>
          </div>
        </main>
      )}
    </>
  );
}
