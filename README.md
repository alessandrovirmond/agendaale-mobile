# AgendaAle Mobile

Aplicativo de agenda e tarefas construído com foco primário na experiência **Offline-First**. O usuário pode criar tarefas, visualizar o calendário e ser notificado de seus compromissos, mesmo sem internet. A sincronização com a nuvem ocorre de forma invisível em background assim que a conexão é restabelecida.

## 🚀 Tecnologias

* **Framework:** React Native + TypeScript
* **Armazenamento Local:** WatermelonDB / SQLite 
* **Autenticação:** Firebase Auth (SSO) 
* **Rede:** `@react-native-community/netinfo`
* **Interface de Calendário:** `react-native-calendars` 

## 🎨 Diretrizes de UI/UX

* Todo o design visual focará estritamente na programação e produtividade do usuário.
* Os ícones e logos do aplicativo (como favicons, atalhos e assets internos) devem obrigatoriamente utilizar fundos transparentes/vazados. Arquivos com fundo branco sólido não são aceitos no padrão visual do projeto.

## 🎯 Objetivo Inicial: Autenticação e Configuração

1. **Monitoramento de Rede:** Uso do `NetInfo` para habilitar ou desabilitar o botão de SSO na tela inicial. O primeiro login exige internet.
2. **Resolução de Ambiente:** O sistema conta com uma função `init()` chamada na inicialização da aplicação para definir dinamicamente a URL do backend de acordo com o ambiente atual (identificando se está rodando localmente ou apontando para a nuvem no Render).
3. **SSO Flow:** Captura do Token via provedor nativo e envio para a API via requisição HTTP.

## 🛠️ Como rodar localmente

1. Clone o repositório.
2. Instale as dependências: `npm install` ou `yarn`.
3. Configure o ambiente React Native (Android Studio / Xcode).
4. Inicie o Metro Bundler: `npm run start`.
5. Rode no emulador ou dispositivo físico: `npm run android` ou `npm run ios`.
