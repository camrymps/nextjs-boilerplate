## Next.js Boilerplate

A basic, no-frills, Next.js boilerplate that includes the follwing:

✅ &nbsp; Typescript
✅ &nbsp; Next Auth
✅ &nbsp; TailwindCSS
✅ &nbsp; Mongoose
✅ &nbsp; FontAwesome icons
✅ &nbsp; Testing with Cypress
✅ &nbsp; Eslint with Airbnb config and Prettier

### Getting Started

First, clone this repository

```bash
git clone https://github.com/camrymps/nextjs-boilerplate.git
```

Next, install the dependencies

```bash
cd nextjs-boilerplate
```

```bash
yarn install
```

And finally, run

```bash
yarn dev
```

### Testing

An example cypress test, located at <b>cypress/integration/login.spec.ts</b>, has been provided. Before running this test, change the "example@example.com" email address to a valid email address in the <b>cypress/fixtures/user.json </b> file. You will also need to make sure you have configured the proper email settings in the <b>.env.local</b> file. The config files, located under <b>cypress/configFiles</b>, can be used to provide your tests with additional environment variables. For more information about using environment variables with Cypress, go [here](https://docs.cypress.io/guides/guides/environment-variables#Option-2-cypress-env-json).

To begin testing, simply run

```bash
yarn run cy:dev
```

### License

MIT
