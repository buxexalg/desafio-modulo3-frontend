import React from 'react';

import '../styles/tabelaJogos.css';
import { fazerRequisicaoComBody } from '../utils/requisicoes';

export default function TabelaJogos(props) {
	const [rodada, setRodada] = React.useState(1);
	const [opacidade1, setOpacidade1] = React.useState(0.5);
	const [opacidade2, setOpacidade2] = React.useState(1);
	const [jogos, setJogos] = React.useState([]);
	const [edicao, setEdicao] = React.useState(null);
	const [golsCasa, setGolsCasa] = React.useState(null);
	const [golsVisitante, setGolsVisitante] = React.useState(null);
	const { token } = props;
	const { setClassificacao } = props;

	const atualizaJogos = () => {
		fazerRequisicaoComBody(`http://localhost:8081/jogos/${rodada}`, 'GET')
			.then((response) => {
				return response.json();
			})
			.then(({ dados }) => {
				setJogos(dados);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const atualizaClassificacao = () => {
		fazerRequisicaoComBody(`http://localhost:8081/classificacao`, 'GET')
			.then((response) => {
				return response.json();
			})
			.then((dados) => {
				const dadosClassificacao = dados.dados;
				dadosClassificacao.forEach((elemento, index) => {
					elemento.id = index + 1;
					elemento.saldoGols =
						elemento.golsFeitos - elemento.golsSofridos;
				});
				setClassificacao(dadosClassificacao);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	React.useEffect(() => {
		atualizaJogos();
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
							setJogos([]);
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
							setJogos([]);
						}
					}}
				/>
			</div>
			<div className="conteudoJogos">
				{jogos.length === 0 && (
					<div className="carregando">Carregando...</div>
				)}
				{token ? (
					<table>
						<tbody className="tabelaJogos">
							{jogos.map((elemento, index) => (
								<tr key={index} className="listaJogo">
									{edicao !== index ? (
										<>
											<td>{elemento.time_casa}</td>
											<td>{elemento.gols_casa}</td>
											<td>x</td>
											<td>{elemento.gols_visitante}</td>
											<td>{elemento.time_visitante}</td>
											<td className="celulaEditar">
												<button
													className="botaoEditar"
													onClick={() => {
														setEdicao(index);
														setGolsCasa(
															elemento.gols_casa
														);
														setGolsVisitante(
															elemento.gols_visitante
														);
													}}
												>
													<img
														src="https://systemuicons.com/images/icons/pen.svg"
														alt="Editar"
													/>
												</button>
											</td>
										</>
									) : (
										<>
											<td>{elemento.time_casa}</td>
											<td>
												<input
													type="numeric"
													value={golsCasa}
													className="inputPlacar"
													onChange={(event) => {
														setGolsCasa(
															event.target.value
														);
													}}
												/>
											</td>
											<td>x</td>
											<td>
												<input
													type="numeric"
													value={golsVisitante}
													className="inputPlacar"
													onChange={(event) => {
														setGolsVisitante(
															event.target.value
														);
													}}
												/>
											</td>
											<td>{elemento.time_visitante}</td>
											<td className="celulaEditar">
												<button
													className="botaoEditar"
													onClick={() => {
														fazerRequisicaoComBody(
															'http://localhost:8081/jogos',
															'POST',
															{
																id: elemento.id,
																golsCasa: golsCasa,
																golsVisitante: golsVisitante,
															},
															token
														);
														setEdicao(null);
														atualizaJogos();
														atualizaClassificacao();
													}}
												>
													<img
														src="https://systemuicons.com/images/icons/check.svg"
														alt="Confirmar edição"
													/>
												</button>
											</td>
										</>
									)}
								</tr>
							))}
						</tbody>
					</table>
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
