import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Login.css';
import logo from '../../images/logo.png';

export default function Login() {
  const [valueName, setValueName] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setValueName(value);
    if (value.length >= 3) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const sendName = async () => {
    setLoading(true);
    await createUser({ name: valueName });
    navigate('/search');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="login-header">
        <h2>
          Bilbo
          <span className="tunes">
            Tunes
          </span>
        </h2>
        <img src={ logo } alt="logo" className="login-image" />
      </header>
      <main className="login-main">
        <input
          type="text"
          placeholder="Nome"
          data-testid="login-name-input"
          value={ valueName }
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-button"
          disabled={ disabledButton }
          onClick={ sendName }
          type="button"
          className="btn btn-warning"
        >
          Entrar
        </button>
      </main>
    </>
  );
}
