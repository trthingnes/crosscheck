# Crosscheck

Design Project in CS473 Introduction to Social Computing @ KAIST

## Code description

### Extention manifest

The manifest in `public/manifest.json` defines all metadata regarding the Chrome extension and where resources like icons, scripts and HTML files can be located.

### Files in `src/chrome`

This folder contains files that are defined in the file `public/manifest.json`. The script in `service_worker.ts` is run on browser startup and defines the behavior of the context menu used to submit quotes. The service worker could also perform background jobs. The script in `content_script.ts` is run on every website the user visits and highlights the content that has been submitted by other users.

### Files in `src/routes`

This project uses React Router for navigating between pages. The routes folder contains the files that define the main pages in the application. It contains one page for the list of highlights and one page for the list of posts on every highlight.

### Files in `src/components`

This folder contains the components of the React application that are not used as a main page. This folder contains buttons and list element components that are reusable.

### Files in `src/utils`

This folder contains files that are used by the rest of the project.
`Types.ts` defines custom TypeScript types.
`Constants.ts` make all hard coded data available in one location to simplify development.
`Firebase.ts` handles the communication with our Firebase database.

## Build from source

**Note**: _This section can be skipped if you already have the `build` folder._

1. Create a file named `/src/utils/Env.ts`, and insert the following environment variables.

```ts
export const FIREBASE_API_KEY = '<API_KEY>'
export const FIREBASE_AUTH_DOMAIN = '<FIREBASE_AUTH_DOMAIN>'
export const FIREBASE_DATABASE_URL = '<FIREBASE_DATABASE_URL>'
export const FIREBASE_PROJECT_ID = '<FIREBASE_PROJECT_ID>'
export const FIREBASE_STORAGE_BUCKET = '<FIREBASE_STORAGE_BUCKET>'
export const FIREBASE_SENDER_ID = '<FIREBASE_SENDER_ID>'
export const FIREBASE_APP_ID = '<FIREBASE_APP_ID>'
export const FIREBASE_MEASUREMENT_ID = '<FIREBASE_MEASUREMENT_ID>'
```

2. Run `npm install` in the project root to install dependencies.
3. Once the environment file exists run `npm run build` in the project root to make a production build of the project.
   This should create a new folder named `build` that can be installed in Google Chrome.

## Install `build` folder in Google Chrome

1. Open Google Chrome to the `chrome://extensions` page
2. Enable _Developer mode_, and the load the `build` folder using the _Load unpacked_ buttons.
   This should make the extension appear as an unpacked extension in the extension list.

 <img src="img/dev_mode.png" height="33%" />
 <img src="img/load_unpacked.png" height="33%" />
 <img src="img/extension_listing.png" height="33%" />

3.  For simple access to the extension interface pin the icon in the top right just like with any other Google Chrome Extension.

## Development

For development it is recommended to use `npm run dev` and view the extension popup like a normal website when developing the UI to be able to utilize the live reload features React offers. However, some Chrome API functions that the application relies on will not function correctly when the extension is not run as an extension in the browser.

If changes have been made to the extensions content scripts or manifest, it has to be reloaded using the reload button in the extension overview.
UI changes made to the unpacked extension will appear automatically as Chrome uses the HTML files directly.
