# api-nodejs - Banco

** Simulação de um banco**

```bash
bun install
```

### Estrutura NodeJS

- routers =>  Direcionar para qual controller irá tratar a requisiçao da referida rota.
- Controllers => Recebe os parâmetros da requisição, fazer as validações da entrada dos parâmetros e depois responder para o router.
- Services => Trata da regra de negório(CRUD) e caso necessário consulta os repository e devolve para os controllers.
- Repositories => Trata da persistência dos dados e devolve confirmação para os services.
