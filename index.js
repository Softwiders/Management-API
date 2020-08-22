const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const ProjectsRouts = require('./Projects/project')
const IncomeRouts = require('./Income')
const ExpenseRouts = require('./Expense')
const ReceiptRouts = require('./Receipt')
const TransactionRouts = require('./Transaction')


const app = express();

// use logger
app.use(morgan('tiny'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// for cors authentication of browser
app.use(cors())

// All API
app.use("/projects",ProjectsRouts)
app.use("/incomes",IncomeRouts)
app.use("/expenses",ExpenseRouts)
app.use("/receipts",ReceiptRouts)
app.use("/transaction",TransactionRouts)

app.use("/", (res, req) => res.send("Welcome"))


// set Up status 
app.use((req,res,next)=>{
    const error = new Error("Go to Hell");
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
   res.status(error.status || 500);
   res.json({
       error:{
           message:error.message
       }
   })
})

app.use((req, res,next)=>{
    res.status(200).json({
        message:"Connected"
    });
});

//server port
const port = process.env.port || 3030;

app.listen(port, () => console.log(`Example app listening on port 3030!`));