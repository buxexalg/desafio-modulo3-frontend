import React from 'react';

import '../styles/header.css';
import { fazerRequisicaoComBody } from '../utils/requisicoes';

export default function Header(props) {
	const [email, setEmail] = React.useState('');
	const [senha, setSenha] = React.useState('');
	const { token, setToken } = props;

	return (
		<div className="header">
			<div>
				<h1>Brasileirão</h1>
				<div>
					{token ? (
						<button
							onClick={() => {
								setToken(null);
								setEmail('');
								setSenha('');
							}}
						>
							Deslogar
						</button>
					) : (
						<form
							className="login"
							onSubmit={(event) => {
								event.preventDefault();
								fazerRequisicaoComBody(
									'http://localhost:8081/auth',
									'POST',
									{
										email: email,
										password: senha,
									}
								)
									.then((res) => res.json())
									.then((tokenJSON) => setToken(tokenJSON));
							}}
						>
							<label>
								Email
								<input
									type="email"
									onInput={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</label>
							<label>
								Senha
								<input
									type="password"
									onInput={(event) => {
										setSenha(event.target.value);
									}}
								/>
							</label>
							<button type="submit"> Logar </button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
