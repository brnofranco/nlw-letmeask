import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';



export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const [ newRoom, setNewRoom ] = useState(''); 

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong> Toda pergunta tem uma resposta </strong> {/* Crie salas de Q&A ao-vivo */}
                <p> Aprenda e compartilhe conhecimento com outras pessoas </p> {/* Tire as dúvidas de sua audiência em tempo-real */}
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <img src={user?.avatar} alt="Avatar" className="user-avatar" />
                    {user?.name ? <h1> Olá, {user?.name}! </h1> : ''}
                    <h2> Criar uma nova sala </h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                        <p> 
                            Quer entrar em uma sala existente? <Link to="/"> clique aqui</Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    )
}