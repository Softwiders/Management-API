const express = require('express')
const routs = express.Router()
const sql = require('../Database/connection')

routs.get("/", (req,res)=> {
    sql.query("SELECT id, description, date, amount, invoice FROM `transaction` WHERE type = 'Income'", (err, rows, fields) => {
        if (!err) {
            res.send(rows);      
        }
        else {
            res.send("Errs => " + err);
        }
    })
})

module.exports = routs