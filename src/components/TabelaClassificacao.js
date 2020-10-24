import React from 'react';

import '../styles/tabelaClassificacao.css';
import { fazerRequisicaoComBody } from '../utils/requisicoes';

export default function TabelaClassificacao(props) {
	const { classificacao, setClassificacao } = props;
	const [filtro, setFiltro] = React.useState('Posição');
	const [filtroAsc, setFiltroAsc] = React.useState(true);

	const tituloHeader = [
		'Posição',
		'Time',
		'PTS',
		'V',
		'E',
		'D',
		'GF',
		'GS',
		'SG',
	];

	const alteraNomeFiltro = (nomeFiltro) => {
		let nomeObjeto = '';

		switch (nomeFiltro) {
			case 'Posição':
				nomeObjeto = 'id';
				break;
			case 'Time':
				nomeObjeto = 'nome';
				break;
			case 'PTS':
				nomeObjeto = 'pontos';
				break;
			case 'V':
				nomeObjeto = 'vitorias';
				break;
			case 'E':
				nomeObjeto = 'empates';
				break;
			case 'D':
				nomeObjeto = 'derrotas';
				break;
			case 'GF':
				nomeObjeto = 'golsFeitos';
				break;
			case 'GS':
				nomeObjeto = 'golsSofridos';
				break;
			case 'SG':
				nomeObjeto = 'saldoGols';
				break;
		}
		return nomeObjeto;
	};

	React.useEffect(() => {
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
	}, []);
	
		const filtroObjeto = alteraNomeFiltro(filtro);

		classificacao.sort((a, b) => {
			if (filtroObjeto === 'nome') {
				return a['nome'].localeCompare(b['nome']);
			} else if (filtroObjeto !== 'nome') {
				return b[filtroObjeto] - a[filtroObjeto];
			}
		});

		filtroAsc ? setClassificacao(classificacao.reverse()) : setClassificacao(classificacao)

	return (
		<div className="classificacao">
			{classificacao.length === 0 ? (
				<div className="carregando">Carregando...</div>
			) : (
				<table>
					<thead>
						<tr>
							{tituloHeader.map((elemento, index) => (
								<td key={index}>
									{elemento}
									{elemento === filtro ? (
										<img
											src={
												filtroAsc
													? 'https://systemuicons.com/images/icons/arrow_down.svg'
													: 'https://systemuicons.com/images/icons/arrow_up.svg'
											}
											alt="Ordenar coluna"
											onClick={() => {
												setFiltroAsc(!filtroAsc);
												setFiltro(elemento);
											}}
										/>
									) : (
										<img
											src="https://systemuicons.com/images/icons/sort.svg"
											alt="Ordenar coluna"
											onClick={() => {
												setFiltroAsc(false);
												setFiltro(elemento);
											}}
										/>
									)}
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{classificacao.map(
							(
								{
									id,
									nome,
									pontos,
									vitorias,
									empates,
									derrotas,
									golsFeitos,
									golsSofridos,
									saldoGols,
								},
								index
							) => {
								return (
									<tr key={index}>
										<td>{id}</td>
										<td>{nome}</td>
										<td>{pontos}</td>
										<td>{vitorias}</td>
										<td>{empates}</td>
										<td>{derrotas}</td>
										<td>{golsFeitos}</td>
										<td>{golsSofridos}</td>
										<td>{saldoGols}</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			)}
		</div>
	);
}
