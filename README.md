# Aplicativo base em React Native

[React Native](https://facebook.github.io/react-native/) - **0.43.3**

[Redux](https://redux.js.org/) - **3.7.2**

[Node.js](https://nodejs.org/en/) - **10.15.0**

[Npm](https://www.npmjs.com/) - **6.4.1**

**Descrição:** Este projeto tem como objetivo fornecer um aplicativo de uso dos usuários finais.

## Preparando o sistema para a instalação do projeto


1. Para poder fazer a instalação das dependências do projeto, certifique-se que os seguintes requisitos estejam instalados em sua máquina (nessa ordem):
- [Java (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Python 2.7](https://www.python.org/)   
- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [React-native-cli](https://www.npmjs.com/package/react-native-cli) com o comando `npm install -g react-native-cli`

2. Baixe o [Android Studio](https://developer.android.com/studio/) e instale (no mínimo) o sdk equivalente a esta aplicação.
2. Certifique-se que a variável de ambiente `JAVA_HOME` esteja apontada para o diretório do JDK.
3. Adicione o diretório do sdk à variável de ambiente `Path`. Caminho do diretório: `C:\Users\<Seu_Usuario>\AppData\Local\Android\Sdk\platform-tools`
4. Crie uma variável de ambiente `ANDROID_HOME` apontando para `C:\Users\<Seu_Usuario>\AppData\Local\Android\Sdk`  


## Instalação do Projeto

Para instalar as dependências do projeto, vá até o diretório `aeon` e execute o seguinte comando:

`npm install`

## Rodar o Projeto

- Primeiramente, ative o modo de desenvolver e de depuração USB do seu celular. 
- Conecte o celular com o computador por meio de um cabo.
- Abra o projeto no Android Studio na pasta "android" e execute o build. 
- Acesse o diretório `aeon` deste projeto no prompt de comando ou terminal.
- Execute o seguinte comando: `react-native run-android`

- OBS.: Caso queira atualizar o aplicativo conforme as mudanças feitas no código, basta sacudir o celular e clicar na opção "reload".

## Gerar APK para debug:

- Rode o seguinte comando:

```
react-native run-android
```

- Certifique-se de que o react-native iniciou em outra aba de terminal na porta `8081`. **Se não tiver sido iniciado** , execute o comando:
```
react-native start 
```

- Com o react executando, abra outro terminal na pasta do projeto `aeon` e execute o comando 
(crie o diretório `assets`, caso ele não exista):
```
curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
```

- Execute o comando abaixo para linkar as imagens do react com o android:
```
react-native bundle --platform android --dev false --entry-file index.android.js \ --bundle-output android/app/src/main/assets/index.android.bundle \ --assets-dest android/app/src/main/res/
```

- Ir para o diretório do android:
```
cd android
```

- Executar o último comando (Linux):
```
./gradlew assembleDebug
```
- Executar o último comando (Windows):
```
.\gradlew assembleDebug
```
- O arquivo `apk-debug.apk` estará no diretório `android/app/build/outputs/apk/debug`.


## Gerar signed APK:
- Primeiramente, siga os passos de "Gerar APK para debug".
- Vá até o Android Studio, clique na aba `Build`, depois em `Generate Signed Bundle or APK`.
- Selecione o arquivo de chave que está no diretório `app/chave`.
- A senha para a chave é `A3onD@T4`.
- Clique em finalizar e aguarde a geração do apk.
- O apk para release estará no diretório `android\app\release`.
- Com esse apk será possível publicar na PlayStore.
