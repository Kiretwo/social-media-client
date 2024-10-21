# Social Media Client

## Getting Started

Open the terminal and run:
```
npm install
```
<br>

To open the project in the browser run:
```
npm start
```
<br>

To test eslint and prettier, change something in the code (add spaces or an error) and run:
```
npm run lint
npm run format
```
<br>

To test jest run:
```
npm run test
```
<br>

To test cypress run:
```
npm run cy:test:open
```
^ This should open the webpage in the browser and cypress at the same time, then navigate (in cypress) to E2E Testing, choose browser, and find "login.cy.js".
<br>

- To test cypress in terminal run: ```npm run cy:test:run```.


If for some reason cypress won't run/work properly when running ```npm run cy:test:open```, try opening 2 seperate bash terminals and follow these steps:
<br>

> In first terminal run:
```
npm start
```
<br>

> In second terminal run:
```
npm run cy:open
```
> ^ Follow the same steps in cypress.
<br>

> - To test cypress in terminal run: ```npm run cy:run```.

<br>

To create a commit and push, use these commands:
```
git add .
git commit -m "Summary (required)" -m "Description"
git push
```
^ Use the same approach when testing the commit hook (husky), any error in ".js" files will prevent a commit until the error is fixed.
<br>

### Further Notes
- NB! ALL commits must be done in the terminal, you will encounter an error if you are trying to use github desktop for commits because of the commit hook.
- ESlint should target all ".js" files.
- Prettier should target all ".{js, css, md, scss, mjs}" files.
