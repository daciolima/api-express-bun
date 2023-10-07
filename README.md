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



### Consulta GraphQL. Interface web
```shell
# mutation {
#   createAccount(account: {
#     name: "Carla Silva",
#     balance: 1500
#   })
#   {
#     id
#     name
#     balance
#   }
  
#   updateAccount(account: {
#     id: 15
#     name: "Vanessa Mota",
#     balance: 3200
#   })
#   {
#     id
#     name
#     balance
#   }
  
#   deleteAccount(id: 16)
# }

# {	
#   getAccount(id: 5){
#   	id
#     name
#     balance
# 	}
#   getAccounts {
#     id
#     name
#     balance
#   }
# }
```