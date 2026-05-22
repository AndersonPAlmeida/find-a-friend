# App

Appp Find A Friend

## RFs (Requisitos funcionais) 

[x]O cadastro de um pet
[x]A listagem de todos os pets disponíveis para adoção em uma determinada cidade
[x]A filtragem de pets com base em suas características (como idade, porte, etc.)
[x]A visualização dos detalhes de um pet específico
[x]O cadastro de uma ORG (organização)
[x]O login de uma ORG no sistema

## RNs (Regras de negócio)

[x]A informação da cidade é obrigatória para listar os pets
[x]Uma ORG deve, obrigatoriamente, ter um endereço e um número de WhatsApp
[x]Todo pet cadastrado precisa estar vinculado a uma ORG
[x]O contato do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp
[x]Todos os filtros de características do pet, com exceção da cidade, são opcionais
[]Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostreSQL;
- [x] Todas listas de dados precisar estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);