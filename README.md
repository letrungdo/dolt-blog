### 🏠 [Homepage](https://xn--t-lia.vn)

## Request

- IDE: [VSCode](https://code.visualstudio.com/download)
- NodeJs: 24.x (https://nodejs.org/en/download). With [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to switch to the version in `.nvmrc`
- VsCode Extensions:
  1. Eslint
  2. Prettier - Code formatter
- Yarn: npm i yarn -g

## Development

```bash
nvm use
yarn install
yarn dev    # http://localhost:8000
yarn build  # production build into public/
```

## Features

- Posts and pages in Markdown
- Tags and categories with pagination
- Homepage as list of articles, support "Load more" function
- Code highlight using [Prism.js](https://prismjs.com/) and Tomorrow Night theme
- Disqus for comment

## Acknowledgements

This project is based on:

- [gatsby-advanced-starter](https://github.com/vagr9k/gatsby-advanced-starter/)
