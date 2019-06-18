# App Store

App store for Reapit PAAS platform. Initial scaffold from [React App Boilerplate](https://github.com/reapit/react-app)

## Getting started

### First
```
brew install node

brew install yarn
```
### To build for dev
``` 
yarn

yarn dev
```
HMR dev server available on [port 8080](http://localhost:8080)
### To build for prod
``` 
yarn build

yarn start
```
Again, server available on [port 8080](http://localhost:8080)
### To run the linter (Prettier & TSLint)
``` 
yarn lint
```
This also runs as a pre-commit hook
### To run the unit tests (Jest & Enzyme)
``` 
yarn test
```
This also runs as a pre-push hook
### To run the unit tests in dev mode
``` 
yarn test-dev
```
### To run the performance Tests (Lighthouse & Jest)
``` 
yarn test-perf
```
### To run the E2E Tests (Webdriver)
``` 
yarn test-e2e
```
### To run an analysis of bundles and packages
```
yarn bundle-analyse
```