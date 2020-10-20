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

	const ordenaColuna = (filtro) => {
		const tabelaOrdenada = [...classificacao];

		tabelaOrdenada.sort((a, b) =>
			filtro === 'nome'
				? a[filtro].localeCompare(b[filtro])
				: a[filtro] > b[filtro]
				? 1
				: -1
		);

		console.log(tabelaOrdenada);
		setClassificacao(tabelaOrdenada);
	};

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
				dados.forEach((elemento, index) => {
					elemento.id = index + 1;
					elemento.saldoGols =
						elemento.golsFeitos - elemento.golsSofridos;
				});
				setClassificacao(dados);
			})
			.catch((err) => {
				console.error(err);
			});
	});

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
									<img
										src={iconeFiltro}
										alt="Ordenar coluna"
										onClick={() => {
											setFiltro(
												alteraNomeFiltro(elemento)
											);
											ordenaColuna(filtro);
										}}
									/>
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{classificacao.map(
							(
								{
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
										<td>{index + 1}</td>
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
