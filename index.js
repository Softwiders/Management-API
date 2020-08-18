const express = require('express');
const bodyParser = require('body-parser');
const sql = require('./Database/connection')

const ProjectsRouts = require('./Projects/project')
const IncomeRouts = require('./Income')
const ExpenseRouts = require('./Expense')
const ReceiptRouts = require('./Receipt')
const TransactionRouts = require('./Transaction')


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// All API
app.use("/projects",ProjectsRouts)
app.use("/incomes",IncomeRouts)
app.use("/expenses",ExpenseRouts)
app.use("/receipts",ReceiptRouts)
app.use("/transaction",TransactionRouts)

app.use("/", (res, req) => res.send("Welcome"))

//server port
const port = 3030;

app.listen(port, () => console.log(`Example app listening on port 3030!`));