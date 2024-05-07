
## Descrição

Nesta aplicação, ao pesquisar uma cidade, a aplicação busca a temperatura da cidade e gera uma playlist de acordo com as regras abaixo:
  Se for maior que 25°C, o serviço deve sugerir músicas pop
  Se estiver entre 10°C e 25°C, o serviço deve sugerir músicas de rock
  Se estiver abaixo de 10°C, o serviço deve sugerir músicas clássicas

[Nest](https://github.com/DevHoffman/desafio-backend-nv2) 
Este é meu desafio desenvolvido. Espero que gostem.

Siga os passos abaixo e vai executar o projeto.

## Instalação

```bash
$ npm install
ou 
$ npm i
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rotas

Neste projeto existem 2 rotas, a [Home](http://localhost:3000/) cuja cidade deve ser pesquisada conforme exemplo 1 e a tela de [Logs](http://localhost:3000/logs).

Exemplo: http://localhost:3000/?cidade=Vitória

Links:
[Home](http://localhost:3000/)
[Logs](http://localhost:3000/logs)