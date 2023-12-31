import { createContext, useContext, useState, useEffect } from "react";

import { api } from '../services/api';
import { json } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password }); 
      const{ user, token } = response.data;

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
      localStorage.setItem('@rocketnotes:token', token)

      api.defaults.headers.common['Authorization'] = `bearer ${token}`;
      setData({ user, token })

    } catch(error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possível realizar o login.');
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@rocketnotes:token');
    localStorage.removeItem('@rocketnotes:user');

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      await api.put('/users', user);

      if(avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append('avatar', avatarFile);

        const response = await api.patch('/users/avatar', fileUploadForm);
        user.avatar = response.data.avatar;
      }

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));

      setData({ user, token: data.token });
      alert('perfil atualizado com sucesso!');
    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possível atualizar o perfil.');
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('@rocketnotes:token');
    const user = localStorage.getItem('@rocketnotes:user');

    if(token && user) {
      api.defaults.headers.common['Authorization'] = `bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      user: data.user,
      updateProfile,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };