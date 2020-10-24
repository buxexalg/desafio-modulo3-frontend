# Desafio Módulo 3 de Front-end - Cubos Academy

## Aplicação de visualização da Tabela do Brasileirão 2019.

Repositório referente a uma aplicação em REACT como função visualizar os resultados dos jogos do Brasileirão 2019, assim como a tabela de classificação final. Caso seja feito um login válido, será possível alterar os valores dos resultados dos jogos. [Desafio de Back-end](https://github.com/buxexalg/desafio-modulo3-backend)

# Conteúdos

-   Instalação
-   Instruções de Uso
-   Dependências

## Instalação

Para rodar o projeto, você precisará ter o Node.js instalado na sua máquina.

### Node

#### Instalação do Node no Windows

Acesse a página oficial do Node.js (https://nodejs.org) e baixe o instalador. Tenha certeza também que tem o `git` disponível no seu PATH, você também pode precisar do `npm`.

#### Instalação do Node no Ubuntu

Você pode instalar facilmente o nodejs e o npm com um apt install, basta seguir os seguintes comandos.

          $ sudo apt install nodejs
          $ sudo apt install npm

#### Outros sistemas operacionais
Você pode achar mais informações sobre a instalação no site oficial do Node.js (https://nodejs.org/) e no site oficial do NPM.

## Instruções de Uso

### Inicialização da aplicação

Após clonar o repositório, o comando `npm start` na pasta raiz da aplicação para iniciá-la, porém é necessário estar com a [API de Back-end](https://github.com/buxexalg/desafio-modulo3-backend) rodando na porta 8081 ou substituir pelo [Back-end de referência](desafio-3-back-cubos-academy.herokuapp.com). 

### Login e senha de autenticação

Para acessar o menu de edição é necessário autenticar a sessão com o email e senha registrados no back-end, que são

```
{
	"email": "admin@cubos.academy",
	"password": "vouserdev"
}
```
