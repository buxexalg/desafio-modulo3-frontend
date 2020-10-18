import React from 'react';

import '../styles/header.css';

export default function Header() {
	const [email, setEmail] = React.useState('');
	const [senha, setSenha] = React.useState('');

	return (
		<div className="header">
			<div>
				<h1>Brasileirão</h1>
				<div>
					<form className="login">
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
				</div>
			</div>
		</div>
	);
}
