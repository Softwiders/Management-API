const express = require('express')
const routs = express.Router()
const sql = require('../Database/connection')

routs.get("/", (req,res)=> {
    sql.query("SELECT id, name, start, cost, status FROM `project`", (err, rows, fields) => {
        if (!err) {
            res.send(rows);            
        }
        else {
            res.send("Errs => " + err);
        }
    })
})

routs.post('/', function(req, res) {
    const { name, email , number, cost} = req.body;
    sql.query("INSERT INTO `project` (`id`, `name`, `start`, `end`, `Dep_start`, `Dep_end`, `cost`, `email`, `number`, `status`, `Created`, `Changed`) VALUES (NULL, '"+name+"', CURRENT_DATE(), NULL, NULL, NULL, '"+cost+"', '"+email+"', '"+number+"', 'OnGoing', current_timestamp(), current_timestamp())", (err, fields) => {
        if (!err) {
            res.send(`Data Inserted Successfully.`);           
        }
        else {
            res.send("Errs => " + err);
        }
    })  
  
})

module.exports = routs