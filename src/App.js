import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import TabelaClassificacao from './components/TabelaClassificacao';
import TabelaJogos from './components/TabelaJogos';

export default function App() {
	return (
		<div className="App">
			<Header />
			<div className="conteudo">
				<div>
					<TabelaJogos />
					<TabelaClassificacao />
				</div>
			</div>
		</div>
	);
}
