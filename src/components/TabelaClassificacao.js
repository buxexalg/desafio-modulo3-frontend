import React from 'react';

import '../styles/tabelaClassificacao.css';

export default function TabelaClassificacao() {
	const [classificacao, setClassificacao] = React.useState([]);
	const [iconeFiltro, setIconeFiltro] = React.useState(
		'https://systemuicons.com/images/icons/sort.svg'
	);
	const [filtro, setFiltro] = React.useState('Posição');
	const [filtroAsc, setFiltroAsc] = React.useState(false);
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

	function ordenaTabela(array) {
		const index = tituloHeader.indexOf(filtro);

		return tituloHeader.indexOf(filtro);
	}

	React.useEffect(() => {
		fetch(
			`https://desafio-3-back-cubos-academy.herokuapp.com/classificacao`,
			{
				method: 'GET',
				headers: {},
			}
		)
			.then((response) => {
				return response.json();
			})
			.then(({ dados }) => {
				console.log(dados)
				ordenaTabela(dados);
				setClassificacao(dados);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [filtroAsc]);

	return (
		<div className="classificacao">
			<table>
				<thead>
					<tr>
						{tituloHeader.map((elemento, index) => (
							<td key={index}>
								{elemento}
								<img
									src={iconeFiltro}
									alt="Ordenar coluna"
									onClick={(event) => {
										setFiltro(event.target.previousSibling.data)
										if (!filtroAsc) {
											setIconeFiltro(
												'https://systemuicons.com/images/icons/arrow_up.svg'
											);
											setFiltroAsc(!filtroAsc);
										} else {
											setIconeFiltro(
												'https://systemuicons.com/images/icons/arrow_down.svg'
											);
											setFiltroAsc(!filtroAsc);
										}
									}}
								/>
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{classificacao === null ? (
						<div>Carregando...</div>
					) : (
						classificacao.map((elemento, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{elemento.nome}</td>
								<td>{elemento.pontos}</td>
								<td>{elemento.vitorias}</td>
								<td>{elemento.empates}</td>
								<td>{elemento.derrotas}</td>
								<td>{elemento.golsFeitos}</td>
								<td>{elemento.golsSofridos}</td>
								<td>
									{elemento.golsFeitos -
										elemento.golsSofridos}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
