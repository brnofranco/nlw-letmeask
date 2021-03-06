import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';



export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    const [ roomCode, setRoomCode ] = useState('');

    async function handleCreateRoom() {
        if (!user){
            await signInWithGoogle();
        }
        
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            toast.error("Esta sala não existe!")
            return;
        }

        if (roomRef.val().endedAt) {
            toast('Esta sala já fechou!', {
                icon: '⚠️',
              });
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return(
        <div id="page-auth">
            <div> <Toaster reverseOrder={false} /> </div>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong> Toda pergunta tem uma resposta </strong> {/* Crie salas de Q&A ao-vivo */}
                <p> Aprenda e compartilhe conhecimento com outras pessoas </p> {/* Tire as dúvidas de sua audiência em tempo-real */}
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className="create-room" onClick={handleCreateRoom} >
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            value={roomCode}
                            onChange={event => setRoomCode(event.target.value)}
                        />
                        <Button type="submit">
                             Entrar na sala 
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}