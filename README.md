# Currency converter #

## Upload a JSON file that has amount and currency. Choose a new currency and convert all of the currencies inside the file to a chosen one with a single click ##

## Supported currencies ##

* EUR
* CAD
* CHF
* GBP
* JPY
* USD
* new ones can be added quite easy

* Example of the JSON file that can be uploaded is inside `src/client/styles/asset/exchange.json`

## Inital Setup Features ##

* ES6
* Babel
* Bootstrap 4
* CSS Modules
* PostCSS and autoprefixer
* webpack.config (development & production mode)
* Browsersync
* Express
* EJS
* SASS
* ESLint
* yarn.lock
* .editorconfig

## Run the app ##

* run `yarn` or `yarn install` to install all npm paskages

* Make **app.local.json** inside the **conf** folder
* Copy the settings from **app.json** and change them to your preference
* If you run the app in **production** mode, settings from **app.json** will be used
* If you run the app in **development** mode, settings from **app.local.json** will be used

### BEFORE PRODUCTION ###

* `yarn run clean-client` will delete client bundle `build`
* `yarn run clean-server` will delete server bundle `dist`

### IN PRODUCTION ###

* `yarn run build-server`  will bundle server for production using `babel` and make a `build` folder
* `yarn run build-client` will bundle client for production using `webpack` and make a `dist` folder
* `yarn run start` set NODE_ENV = production and start the app on port **3004** (build server and client first)

### IN DEVELOPMENT ###

* `yarn run start-dev` will set NODE_ENV = development and start the server using `nodemon` on port **3000**
* `yarn run webpack` will start the webpack in `watch mode`, make a bundle directory `dist`, start the `browsersync` and automatic reloading and run the app on port **3002**
