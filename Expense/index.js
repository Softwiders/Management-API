const express = require('express')
const routs = express.Router()
const sql = require('../Database/connection')

routs.get("/", (req,res)=> {
    sql.query("SELECT id, description, date, amount, acc FROM `transaction` WHERE type = 'Expense'", (err, rows, fields) => {
        if (!err) {
            res.send(rows);      
        }
        else {
            res.send("Errs => " + err);
        }
    })
})



routs.post('/', function(req, res) {
    const { description, acc , amount, partner_id} = req.body
    let total = 0, invoice = 0

    sql.query("SELECT total FROM `transaction` ORDER BY `transaction`.`id` DESC LIMIT 1", (err, rows, fields) => {
        if (!err) {
            let data = rows.map(data=> data.total)
            total = data[0]  

            total -= parseInt(amount)


            
            sql.query("INSERT INTO `transaction` (`id`, `description`, `date`, `type`, `acc`, `amount`, `total`, `invoice`, `responsible`, `project_id`, `partner_id`, `created`, `modified`) VALUES (NULL, '"+description+"', CURRENT_DATE(), 'Expense', '"+acc+"', '"+amount+"', '"+total+"', NULL, '1', NULL, "+partner_id+", current_timestamp(), current_timestamp());", (errInner, fields) => {
                if (!errInner) {
                    res.send(`Data Inserted Successfully.`);           
                }
                else {
                    res.send("Errs => " + err);
                }
            })  



        }
        else {
            res.send("Errs get total=> " + err);
        }
    })

    
  
})




module.exports = routs