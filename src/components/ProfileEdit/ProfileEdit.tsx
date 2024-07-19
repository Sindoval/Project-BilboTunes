import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';

export default function ProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const emailVerify = emailRegex.test(user.email);
      const allVerify = user.name && user.image && user.description;

      if (emailVerify && allVerify) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    validateForm();
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;
    setUser({ ...user, [name]: value });
  };

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await updateUser(user);
    navigate('/profile');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1>Editar perfil</h1>
      <main>
        <form action="">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            type="text"
            data-testid="edit-input-name"
            value={ user.name }
            placeholder={ user.name }
            onChange={ handleChange }
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            data-testid="edit-input-email"
            value={ user.email }
            placeholder={ user.email }
            onChange={ handleChange }
          />

          <label htmlFor="image">Imagem</label>
          <input
            id="image"
            name="image"
            type="text"
            data-testid="edit-input-image"
            value={ user.image }
            placeholder={ user.image }
            onChange={ handleChange }
          />

          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            data-testid="edit-input-description"
            value={ user.description }
            placeholder="Sobre mim"
            onChange={ handleChange }
          />

          <button
            data-testid="edit-button-save"
            disabled={ disabled }
            onClick={ onClick }
          >
            Salvar
          </button>
        </form>
      </main>
    </>
  );
}
