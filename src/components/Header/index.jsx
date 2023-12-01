import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout } from './styles';

export function Header() {

  return(
    <Container>
      <Profile>
        <img 
          src="https://github.com/gianlucacarra.png" 
          alt="Foto de usuário" 
        />

        <div>
          <span>Bem-vindo,</span>
          <strong>Gianluca Carra</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>

    </Container>
  );
}