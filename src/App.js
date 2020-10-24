import React from 'react';

import './styles/App.css';

import Header from './components/Header';
import TabelaClassificacao from './components/TabelaClassificacao';
import TabelaJogos from './components/TabelaJogos';

export default function App() {
	const [token, setToken] = React.useState(null);
	const [classificacao, setClassificacao] = React.useState([]);

	return (
		<div className="App">
			<Header token={token} setToken={setToken} />
			<div className="conteudo">
				<div>
					<TabelaJogos
						token={token}
						setToken={setToken}
						classificacao={classificacao}
						setClassificacao={setClassificacao}
					/>
					<TabelaClassificacao
						classificacao={classificacao}
						setClassificacao={setClassificacao}
					/>
				</div>
			</div>
		</div>
	);
}
