# Kimoveis

## Introdução

Uma API Rest que oferece recursos abrangentes para o controle de imobiliárias. A aplicação foi desenvolvida com foco na eficiência, segurança e usabilidade, fornecendo uma base sólida para o gerenciamento completo desses processos no setor imobiliário.


## Endpoints:

| Método | Endpoint                   | Responsabilidade                                  | Autenticação                           |
| ------ | -------------------------- | ------------------------------------------------- | -------------------------------------- |
| POST   | /users                     | Criação de usuário                                | Qualquer usuário, não necessita token  |
| GET    | /users                     | Lista todos os usuários                           | Apenas Admnistradores                  |
| PATCH  | /users/:id                 | Atualiza um usuário                               | Apenas Admnistradores ou dono da conta |
| DELETE | /users/:id                 | Realiza um soft delete no usuário                 | Apenas Admnistradores                  |
| POST   | /login                     | Gera o token de autenticação                      | Qualquer usuário, não necessita token  |
| POST   | /categories                | Criação de categoria                              | Apenas Admnistradores                  |
| GET    | /categories                | Lista todas as categorias                         | Qualquer usuário, não necessita token  |
| GET    | /categories/:id/realEstate | Lista todos imóveis que pertencem a uma categoria | Qualquer usuário, não necessita token  |
| POST   | /realEstate                | Criação de um imóvel                              | Apenas Admnistradores                  |
| GET    | /realEstate                | Lista todos os imóveis                            | Qualquer usuário, não necessita token  |
| POST   | /schedules                 | Agenda uma visita a um imóvel                     | Qualquer usuário, obrigatório token    |
| GET    | /schedules/realEstate/:id  | lista todos os agendamentos de um imóvel          | Apenas Admnistradores                  |

## Requisitos do Serviço

### POST - /users

-   Rota para criação de usuário com os seguintes dados:
    -   **name**: string, máximo de 45 caracteres e obrigatório;
    -   **email**: string, máximo de 45 caracteres, obrigatório e único;
    -   **password**: string, máximo de 120 caracteres, obrigatório;

### GET - /users

-   A rota deve retornar todos os dados dos usuários;
-   A rota pode ser acessada apenas por usuários administradores.

### PATCH - /users/:id

-   A rota atualizar os dados do usuário;
-   Não é possível atualizar os campos **id** e **admin**;
-   Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

### DELETE - /users/:id

-   A rota realizar um soft delete do usuário;
-   A rota pode ser acessada apenas por administradores;
-   Não é possível realizar um soft delete em um usuário já deletado.

### POST - /login

-   Rota de login recebendo **email** e **password**;
-   Não é possível realizar o login de um usuário marcado como deletado;
-   A rota **não precisa de autenticação** para ser acessada.

### POST - /categories

-   Rota para criação de categorias com os seguintes dados:
    -   **name**: string, máximo de 45 caracteres, obrigatório e único.
-   Não podem ser cadastradas duas categorias com o mesmo nome;
-   A rota pode ser acessada apenas por usuários administradores.

### GET - /categories

-   Rota lista todas as categorias;
-   A rota não precisa de autenticação para ser acessada.

### GET - /categories/:id/realEstate

-   Rota lista todos os imóveis que pertencem a uma categoria;
-   A rota não precisa de autenticação para ser acessada.

### POST - /realEstate

-   Rota para criação de um imóvel com os seguintes dados:
    -   **value**: decimal, obrigatório e 0 por padrão;
    -   **size**: inteiro e obrigatório;
    -   **address**: um objeto com os seguintes dados:
        -   **street**: string, máximo de 45 caracteres e obrigatório;
        -   **zipCode**: string, máximo de 8 caracteres e obrigatório;
        -   **number**: string, máximo de 7 caracteres e opcional;
        -   **city**: string, máximo de 20 caracteres e obrigatório;
        -   **state**: string, máximo de 2 caracteres e obrigatório.
    -   **categoryId**: inteiro.
-   Não podem ser cadastrados dois imóveis com o mesmo endereço;
-   A rota pode ser acessada apenas por administradores.

### GET - /realEstate

Rota lista todos os imóveis;
A rota não precisa de autenticação para ser acessada.

### POST - /schedules

-   Rota responsável pelo agendamento de uma visita a um imóvel com os seguintes dados:
    -   **date**: string da data de agendamento da visita ao imóvel, no formato americano **AAAA-DD-MM**;
    -   **hour**: string do horário de agendamento da visita ao imóvel, no formato **HH:MM**;
    -   **realEstateId**: inteiro;
-   Não é possível agendar uma visita a um imóvel com a mesma data e hora;
-   Não é possível o mesmo **usuário** agendar uma visita a 2 imóveis diferentes com a mesma data e hora;
-   Só é possível agendar uma visita durante horário comercial (08:00 as 18:00);
-   Só é possível agendar uma visita durante dias úteis (segunda à sexta);
-   A rota pode ser acessada tanto por usuários comuns quanto administradores.

### GET - /schedules/realEstate/:id

-   Rota lista todos os agendamentos de um imóvel.
-   A rota pode ser acessada apenas por administradores.
