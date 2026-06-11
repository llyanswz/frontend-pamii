# Plano de Implementação: Conexão de Cadastro de Usuários

## 1. Documentação do Plano
- Salvar este plano em `plans/cadastrar-usuario.md`.

## 2. Refatoração de Utilitários (`frontend/src/shared/util.js`)
- Centralizar a função `toast` neste arquivo, tornando-a exportável. Isso evita a redundância de código encontrada em `LoginPage.js` e `CadUsuarioPage.js`.

## 3. Implementação da Lógica de Cadastro (`frontend/src/pages/usuario/CadUsuarioPage.js`)
- **Importações**: Adicionar `api` de `../../shared/api.js` e `toast` de `../../shared/util.js`.
- **Lógica de Envio**:
    - Implementar listener de `submit` para o formulário `#form-usuario`.
    - Coletar dados dos inputs: `nome`, `usuario`, `senha` e `perfil`.
    - Executar `api.post('/usuario', data)`.
    - **Sucesso**: Exibir toast de confirmação e redirecionar o usuário para a lista de usuários (`/usuario/list`).
    - **Erro**: Capturar a mensagem de erro da API e exibir via toast.
- **Correção de Bug**: Alterar `windows.history.back()` para `window.history.back()` no botão cancelar.

## 4. Verificação e Testes
- Realizar cadastro de novos usuários via interface.
- Validar a persistência dos dados no banco de dados MySQL.
- Verificar se o redirecionamento pós-sucesso está operando corretamente.
