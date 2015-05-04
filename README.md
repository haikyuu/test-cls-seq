#How to reproduce the test cases?

- `git clone` this repo.
- `npm install`
- Edit the `models\config.json` file.
- `npm start`
- in another terminal :
  - `curl localhost:3004/user` Hook beforeCreate
  - `curl localhost:3004/house` Hook afterCreate
