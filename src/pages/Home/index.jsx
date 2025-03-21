import './style.css'
import { FaRegTrashAlt } from "react-icons/fa";
import api from '../../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {
  const [users, setUsers] = useState([])
  
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
   
  }
  // criando novos usuarios e enviando pro servidor
  async function createUsers() {
    const name = inputName.current.value;
    const age = inputAge.current.value;
    const email = inputEmail.current.value;

    // Verificando se os campos estão preenchidos
    if (!name || !age || !email) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await api.post('/usuarios', {
        name,
        age: Number(age), // Garantindo que o 'age' seja um número
        email
      });
      getUsers(); // Atualiza a lista após criação
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Verifique o console para mais detalhes.");
    }
  }

  //deletar usuarios
  async function deleteUsers(id) {
     await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
   
  }, [])

  return (
    <div className='container'>
      <form className="user-form">
        <h1>Cadastro de Usuários</h1>
        <input id="name" name='nome' type='text' placeholder="Digite o nome" ref={inputName} />
        <input id="age" name='idade' type='number' placeholder="Digite a idade" ref={inputAge} />
        <input id="email" name='email' type='email' placeholder="Digite o email" ref={inputEmail} />

        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      
        {users.map((user) => (
          <div key={user.id} className="card">
            <div className="user-info">
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>

            <button className="delete-button" onClick={() => deleteUsers(user.id)}>
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
    </div>
  );
}

export default Home;
