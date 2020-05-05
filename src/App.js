import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  /* O hook "useEffect" será chamado toda vez que houver mudanças na variável 
     "repositories".  */
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[repositories]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'www.abc.com.br',
      techs: ' diversas'
    });

    const repository = response.data;

    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
            { repositories.map(repository => <li key={repository.id}>repository.title</li>) }
          </ul>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
