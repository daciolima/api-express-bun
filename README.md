### Projeto Backend - API EXPRESS
Projeto está rodando como base o Bun
Mais sobre: https://bun.sh/

- Api com CRUD disponibilizado via endpoint;
- Serviço GraphQL
- Documentação Swagger


#### Estrutura de pastas recomenda para projetos nesse contexto

- Routers =>  Direcionar para qual controller irá tratar a requisiçao da referida rota.
- Controllers => Recebe os parâmetros da requisição, fazer as validações da entrada dos parâmetros e depois responder para o router.
- Services => Trata da regra de negório(CRUD) e caso necessário consulta os repository e devolve para os controllers.
- Repositories => Trata da persistência dos dados e devolve confirmação para os services.
- Schema => GraphQL


#### Interface GraphQL
**Query - READ**
```python
{	
  getAccount(id: 5){
  	id
    name
    balance
	}
  getAccounts {
    id
    name
    balance
  }
}
```

#### Interface GraphQL
**Mutation - CREATE, UPDATE, DELETE**
```python
mutation {
  createAccount(account: {
    name: "Carla Silva",
    balance: 1500
  })
  {
    id
    name
    balance
  }
  
  updateAccount(account: {
    id: 15
    name: "Vanessa Mota",
    balance: 3200
  })
  {
    id
    name
    balance
  }
  
  deleteAccount(id: 16)
}
```

**Exemplo de consulta GraphQL via Client Rest.**
```shell 
{ 
  "query":  "{ getAccounts { id, name, balance } }" 
}
```