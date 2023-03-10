# Preview

Collaborative drawing demo build with [Solid.js](https://www.solidjs.com). It's slightly better than the preview below, as it also allows you to draw multiple strokes, and has a reset button.

https://user-images.githubusercontent.com/33033422/224320601-23002c1e-1fb9-4e3f-b437-f99bd216bc9e.mp4



# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
