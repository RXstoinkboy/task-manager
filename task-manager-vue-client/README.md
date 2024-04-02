# task-manager-vue-client

This is just some super basic Todo list just to provide some UI for Task Manager API. 
It is implemented with basic 'optimistic UI' feature as a nice touch. (no error handling in UI, though values should fallback to previous values on failed update).
I also had some fun with basic animations in Vue, though they are kind of clunky due to nested forms in list items. I think it would be much much better if no such weird UX :D.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
