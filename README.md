# App

Gympass Style App

## RFs (Requisitos Funcionais)

- [x] Deve ser possível realizar o cadastro de um usuário;
- [x] Deve ser possível autenticar um usuário;
- [ ] Deve ser possível obter o perfil do usuário autenticado;
- [ ] Deve ser possível obter a quantidade de check-ins realizados pelo usuário;
- [ ] Deve ser possível obter o histórico de check-ins do usuário;
- [ ] Deve ser possível buscar academias próximas;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia.

## RNs (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail já utilizado;
- [ ] O usuário não pode realizar mais de um check-in na mesma academia no mesmo dia;
- [ ] O usuário não pode realizar check-in caso não esteja a, no máximo, 100 metros da academia;
- [ ] O check-in deve ser validado em até 20 minutos após sua criação;
- [ ] O check-in deve ser validado por administradores;
- [ ] Apenas administradores podem cadastrar academias.

## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário deve ser armazenada de forma criptografada;
- [x] Os dados da aplicação devem ser persistidos em um banco de dados PostgreSQL;
- [ ] Todas as listagens devem ser paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por meio de um token JWT.