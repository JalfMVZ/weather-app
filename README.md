# Weather Widget (Frontend)

> Aplicación web moderna y minimalista para consultar el clima actual de cualquier ciudad. Construida con Vue 3 (Composition API), Vite y Tailwind CSS.

## Características

- Búsqueda de clima por ciudad (OpenWeatherMap + fallback WeatherAPI)
- Modularización profesional: `api/`, `types/`, `constants/`, `i18n/`, `utils/`, `components/`
- Diseño responsivo, minimalista y centrado
- Mensajes e íconos según el estado del clima
- Soporte para español

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (o usa `npm`/`yarn` si prefieres)

## Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```sh
git clone <REPO_URL>
cd weather-widget
```

Instala las dependencias:

```sh
pnpm install
# o
npm install
# o
yarn install
```

## Configuración de las API keys

Edita el archivo `src/api/weatherApi.ts` y coloca tus claves de OpenWeatherMap y WeatherAPI:

```ts
const OPENWEATHER_API_KEY = 'TU_API_KEY'
const WEATHERAPI_KEY = 'TU_API_KEY_2'
```

## Comandos útiles

### Desarrollo con recarga en caliente

```sh
pnpm dev
# o
npm run dev
# o
yarn dev
```

### Compilar y minificar para producción

```sh
pnpm build
# o
npm run build
# o
yarn build
```

### Lint y formato

```sh
pnpm lint
pnpm format
```

## Estructura del proyecto

- `src/api/` — funciones para consumir APIs externas
- `src/types/` — tipos e interfaces TypeScript
- `src/constants/` — constantes y mapas de clima
- `src/i18n/` — textos y mensajes en español
- `src/utils/` — utilidades y lógica auxiliar
- `src/components/` — componentes Vue reutilizables

## Recomendaciones de IDE

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

---

¡Listo! Ahora puedes consultar el clima de cualquier ciudad con una interfaz profesional y modular.
