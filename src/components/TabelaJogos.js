import React from 'react';

import '../styles/tabelaJogos.css';

export default function TabelaJogos() {
	const [rodada, setRodada] = React.useState(1);
	const [opacidade1, setOpacidade1] = React.useState(0.5);
	const [opacidade2, setOpacidade2] = React.useState(1);
	const [jogos, setJogos] = React.useState([]);

	React.useEffect(() => {
		fetch(
			`https://desafio-3-back-cubos-academy.herokuapp.com/jogos/${rodada}`,
			{
				method: 'GET',
				headers: {},
			}
		)
			.then((response) => {
				return response.json();
			})
			.then(({ dados }) => {
				setJogos(dados);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [rodada]);

	return (
		<div className="jogos">
			<div className="headerJogos">
				<img
					src="https://systemuicons.com/images/icons/arrow_left.svg"
					alt="Rodada anterior"
					style={{ opacity: opacidade1 }}
					onClick={() => {
						if (rodada > 1) {
							setRodada(rodada - 1);
							rodada === 2 && setOpacidade1(0.5);
							rodada === 38 && setOpacidade2(1);
							setJogos(null);
						}
					}}
				/>
				<h2>{rodada}ª rodada</h2>
				<img
					src="https://systemuicons.com/images/icons/arrow_right.svg"
					alt="Próxima rodada"
					style={{ opacity: opacidade2 }}
					onClick={() => {
						rodada < 38 && setRodada(rodada + 1);
						if (rodada < 38) {
							setRodada(rodada + 1);
							rodada === 1 && setOpacidade1(1);
							rodada === 37 && setOpacidade2(0.5);
							setJogos(null);
						}
					}}
				/>
			</div>

			<div className="conteudoJogos">
				{jogos === null ? (
					<div>Carregando...</div>
				) : (
					<table>
						<tbody className="tabelaJogos">
							{jogos.map((elemento, index) => (
								<tr key={index} className="listaJogo">
									<td>{elemento.time_casa}</td>
									<td>{elemento.gols_casa}</td>
									<td>x</td>
									<td>{elemento.gols_visitante}</td>
									<td>{elemento.time_visitante}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
