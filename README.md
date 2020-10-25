# accounting-system

Front-end: `yarn start`
Back-end: `yarn start:dev`

The service uses a queue to process transactions.

In case of an error while processing a transaction, all subsequent transactions will be canceled.
