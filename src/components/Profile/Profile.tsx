import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

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
        <main>
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
          <div>
            <h3>Nome</h3>
            <p>{ user.name }</p>
          </div>
          <div>
            <h3>E-mail</h3>
            <p>{ user.email }</p>
          </div>
          <div>
            <h3>Descrição</h3>
            <p>{ user.description }</p>
          </div>
        </main>
      )}
    </>
  );
}
