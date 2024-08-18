import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './ProfileEdit.css';

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
      <main className="main-edit">
        <form action="" className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              data-testid="edit-input-name"
              value={ user.name }
              placeholder={ user.name }
              onChange={ handleChange }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              data-testid="edit-input-email"
              value={ user.email }
              placeholder={ user.email }
              onChange={ handleChange }
            />
          </div>
          <div className="col-12">
            <label htmlFor="image" className="form-label">Imagem</label>
            <input
              type="text"
              name="image"
              className="form-control"
              id="image"
              data-testid="edit-input-image"
              value={ user.image }
              placeholder={ user.image }
              onChange={ handleChange }
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">Descrição</label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              data-testid="edit-input-description"
              value={ user.description }
              placeholder={ user.description }
              onChange={ handleChange }
            />
          </div>
          <button
            data-testid="edit-button-save"
            disabled={ disabled }
            onClick={ onClick }
            className="btn btn-outline-warning"
          >
            Salvar
          </button>
        </form>
      </main>
    </>
  );
}
