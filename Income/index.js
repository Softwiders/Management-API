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


routs.post('/', function(req, res) {
    const { description, acc , amount, project_id} = req.body
    let total = 0, invoice = 0

    sql.query("SELECT total FROM `transaction` ORDER BY `transaction`.`id` DESC LIMIT 1", (err, rows, fields) => {
        if (!err) {
            let data = rows.map(data=> data.total)
            total = data[0]  

            total += parseInt(amount)


            if (project_id != 0) {
                sql.query("SELECT invoice FROM `transaction` WHERE invoice IS NOT NULL ORDER BY `transaction`.`invoice` DESC LIMIT 1", (err1, rows1, fields1) => {
                    if (!err1) {
                        data = rows1.map(data=> data.invoice)
                        invoice = data[0]
                        invoice ++


                        sql.query("INSERT INTO `transaction` (`id`, `description`, `date`, `type`, `acc`, `amount`, `total`, `invoice`, `responsible`, `project_id`, `partner_id`, `created`, `modified`) VALUES (NULL, '"+description+"', CURRENT_DATE(), 'Income', '"+acc+"', '"+amount+"', '"+total+"', "+invoice+", '1', '"+project_id+"', NULL, current_timestamp(), current_timestamp());", (errInner, fields) => {
                            if (!errInner) {
                                res.send(`Data Inserted Successfully.`);           
                            }
                            else {
                                res.send("Errs => " + err);
                            }
                        }) 


                    }
                    else {
                        res.send("Errs get transition=>" + err);
                    }
                })
            }
            else {
                sql.query("INSERT INTO `transaction` (`id`, `description`, `date`, `type`, `acc`, `amount`, `total`, `invoice`, `responsible`, `project_id`, `partner_id`, `created`, `modified`) VALUES (NULL, '"+description+"', CURRENT_DATE(), 'Income', '"+acc+"', '"+amount+"', '"+total+"', NULL, '1', '"+project_id+"', NULL, current_timestamp(), current_timestamp());", (errInner, fields) => {
                    if (!errInner) {
                        res.send(`Data Inserted Successfully.`);           
                    }
                    else {
                        res.send("Errs => " + err);
                    }
                })  
            }



        }
        else {
            res.send("Errs get total=> " + err);
        }
    })

    
  
})

module.exports = routs