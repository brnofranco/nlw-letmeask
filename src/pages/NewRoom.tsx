import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function NewRoom() {
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
                    <h2> Criar uma nova sala </h2>
                    <form action="">
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">
                            Criar sala
                        </Button>
                        <p> 
                            Quer entrar em uma sala existente? <a href="#"> clique aqui</a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    )
}