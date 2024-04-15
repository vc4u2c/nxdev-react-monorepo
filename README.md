# NxdevReactMonorepo

- NxDev React Monorepo with 2 React Apps & 3 shared libraries.
- [Building React Apps in an Nx Monorepo](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial)

## Initial Setup

```bash
# Download and install Node.js v20.12.0 from https://nodejs.org/en

# Download and Install Git SCM: https://git-scm.com/download/win
# 64 Bit Standalone Installer for Windows: https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe

# Open VS Code
# CTRL + ` to open terminal

cd .\Documents\Source\Repos\React\
git config --global init.defaultBranch main

npm i -g npm@latest
npm -v
node-v
npm i -g nx

# Create a new React monorepo with the following command
npx create-nx-workspace@latest nxdev-react-monorepo --preset=react-monorepo
# √ Application name · store
# √ Which bundler would you like to use? · vite
# √ Test runner to use for end to end (E2E) tests · playwright
# √ Default stylesheet format · css
# √ Set up CI with caching, distribution and test deflaking · github

cd nxdev-react-monorepo
code . -r

# Verify we are in main branch
git branch

# Serve the application
nx serve store
# CTRL + C in VS Code Terminal to close

# Inferred Tasks: Nx identifies available tasks for your project from tooling configuration files, package.json scripts and the targets defined in project.json.
# To view the tasks that Nx has detected, look in the Nx Console project detail view or run the following
nx show project store --web
# CTRL + C in VS Code Terminal to close

# Build
nx run store:build

# Unit Test
nx test store

# End to End Test
nx e2e store-e2e

# Preview
nx run store:preview

# Static Serve
# TODO: Not working
# ENOENT: no such file or directory, copyfile 'C:\Users\Vinod Chandran\Documents\Source\Repos\React\nxdev-react-monorepo\{workspaceRoot}\dist\apps\store\index.html' -> 'C:\Users\Vinod Chandran\Documents\Source\Repos\React\nxdev-react-monorepo\{workspaceRoot}\dist\apps\store\404.html'
nx run store:serve-static

# List built in generators in Nx React
nx list @nx/react

# Add / Generate another application
nx g @nx/react:app inventory --directory=apps/inventory --dry-run
# √ Would you like to add React Router to this application? (y/N) · true
# √ Which E2E test runner would you like to use? · playwright
# √ What should be the project name and where should it be generated? · inventory @ apps/inventory

nx g @nx/react:app inventory --directory=apps/inventory
# √ Would you like to add React Router to this application? (y/N) · true
# √ Which E2E test runner would you like to use? · playwright
# √ What should be the project name and where should it be generated? · inventory @ apps/inventory

# Serve the application
nx serve inventory

# Inferred Tasks: Nx identifies available tasks for your project from tooling configuration files, package.json scripts and the targets defined in project.json.
# To view the tasks that Nx has detected, look in the Nx Console project detail view or run the following
nx show project store --web
# CTRL + C in VS Code Terminal to close

# Build
nx run inventory:build

# Unit Test
nx test inventory

# End to End Test
nx e2e inventory-e2e

# Preview
nx run inventory:preview

# Sharing Code with Local Libraries
nx g @nx/react:library products --directory=libs/products --unitTestRunner=vitest --bundler=none
# √ What should be the project name and where should it be generated? · products @ libs/products
nx g @nx/react:library orders --directory=libs/orders --unitTestRunner=vitest --bundler=none
# √ What should be the project name and where should it be generated? · orders @ libs/orders
nx g @nx/react:library shared-ui --directory=libs/shared/ui --unitTestRunner=vitest --bundler=none
# √ What should be the project name and where should it be generated? · shared-ui @ libs/shared/ui

# Move libs/my-feature-lib to libs/shared/my-feature-lib:
nx g @nx/workspace:move --project my-feature-lib --destination shared/my-feature-lib

# Create and expose a ProductList component from libs/products library.
nx g @nx/react:component product-list --project=products --directory="libs/products/src/lib/product-list"
# √ Should this component be exported in the project? (y/N) · true
# √ Where should the component be generated? · libs/products/src/lib/product-list/product-list.tsx

# Create and expose a OrderList component from libs/orders library.
nx g @nx/react:component order-list --project=orders --directory="libs/orders/src/lib/order-list"
# √ Should this component be exported in the project? (y/N) · true
# √ Where should the component be generated? · libs/orders/src/lib/order-list/order-list.tsx

# Serve apps again
nx serve store
nx serve inventory

# Show the project dependency graph
nx graph
nx graph --affected

# Testing and Linting
# Run the tests for the store app
nx test store
# Run the linter on the store app
nx lint store
# Run the linter on the inventory app
nx lint inventory
# Runs e2e tests for the store app
nx e2e store-e2e
# Runs e2e tests for the inventory app
nx e2e inventory-e2e
# Run tests in parallel
nx run-many -t test

# Building the Apps for Deployment
npx nx run-many -t build

# Install Netlify CLI
npm install -g netlify-cli

# Building the Apps for Deployment
nx affected -t deploy

# Imposing Constraints with Module Boundary Rules
# type:feature should be able to import from type:feature and type:ui
# type:ui should only be able to import from type:ui
# scope:orders should be able to import from scope:orders, scope:shared and scope:products
# scope:products should be able to import from scope:products and scope:shared
```

## Start the application

Run `npx nx serve store` to start the development server. Happy coding!

## Build for production

Run `npx nx build store` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)
