import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../services/userAPI"
import Loading from "../Loading/Loading"
import { AlbumType } from "../../types"
import searchAlbumsAPI from "../../services/searchAlbumsAPI"

export default function Login() {
    const [valueName, setValueName] = useState("")
    const [disabledButton, setDisabledButton] = useState(true)
    const [ loading, setLoading] = useState(false)
    const navigate = useNavigate()

    

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        setValueName(value)
        if(value.length >= 3) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }

    const sendName = async (event:React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        const user = await createUser({ name: valueName })
        navigate('/search')
    }


    if(loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <header>
                <h1>Login</h1>
            </header>
            <main>
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
                >
                    Entrar
                </button>
            </main>
        </>
    )
}