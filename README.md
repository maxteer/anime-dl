# anime-dl

Criado nas horas vagas para facilitar o download de animes.

## Sites suportados

- [betteranime.net](https://betteranime.net)

## Recursos

- Progresso de download;
- Pesquisar o anime através da CLI;
- Menu de seleção de anime na pesquisa;
- Menu de seleção de episódios para baixar.

## Instalação

Baixe o tarball em https://github.com/maxteer/anime-dl/releases/latest

```sh
# npm
Windows: npm install -g file://Caminho/Até/O/Tarball/anime-dl-v1.0.0.tgz
Linux: npm install -g file://$PWD/anime-dl-v1.0.0.tgz

# yarn
Windows: yarn global add file://Caminho/Até/O/Tarball/anime-dl-v1.0.0.tgz
Linux: yarn global add file://$PWD/anime-dl-v1.0.0.tgz
```

## Uso

```sh
# yarn ou npm com global bin
anime-dl Sword Art Online -o pasta/para/salvar

# yarn sem global bin
yarn anime-dl Sword Art Online -o pasta/para/salvar

# npm sem global bin
npx anime-dl Sword Art Online -o pasta/para/salvar
```

#### Argumentos

- `-v, --version` exibe a versão atual.
- `-o, --output` (\*) diretório de saída.
- `-sb, --show-browser` exibe o browser automatizado.
- `-h, --help` exibe a mensagem de ajuda.

## Licença

[MIT](LICENSE)
