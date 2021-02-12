const { json } = require("body-parser");
const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");


var app = express();

app.use(bodyparser.json());


var mySqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'db_node_js',
    multipleStatements : true
});

mySqlConnection.connect((err) => {
    if (err)
        console.log('DB Connection Failed \n Error: ' + JSON.stringify(err, undefined, 2));
    else    
        console.log('DB Connection Succeded');
});

app.listen(3000, ()=>console.log('Express server is running at port no: 3000'));

//get all employee
app.get('/employee', (req, res) => {
    mySqlConnection.query('select * from employee', (err, rows, fields) =>{
        if (err)
            console.log(err);
        else {
            // for (let x = 0; x<rows.length; x++)
            //     console.log(rows[x].name);
            res.send(rows);
            // res.send(fields);
        }            
    })
});

//get an employee
app.get('/employee/:id', (req, res) => {
    mySqlConnection.query('select * from employee where empId=?',[req.params.id], (err, rows, fields) =>{
        if (err)
            console.log(err);
        else {
            // for (let x = 0; x<rows.length; x++)
            //     console.log(rows[x].name);
            res.send(rows);
            // res.send(fields);
        }            
    })
});

//delete an employee
app.delete('/employee/:id', (req, res) => {
    mySqlConnection.query('delete from employee where empId=?',[req.params.id], (err, rows, fields) =>{
        if (err)
            console.log(err);
        else {
            // for (let x = 0; x<rows.length; x++)
            //     console.log(rows[x].name);
            res.send('Deleted Successfully') ;
            // res.send(fields);
        }            
    })
});

//insert an employee
app.post('/employee', (req, res) => {
    let emp = req.body;
    var sql = "SET @empId = ?; SET @name= ?; SET @empCode=?; SET @salary=?; \
    CALL EmployeeAddOrEdit(@empId, @name, @empCode, @salary);";
    mySqlConnection.query(sql,[emp.empId, emp.name, emp.empCode, emp.salary], (err, rows, fields) =>{
        if (err)
            console.log(err);
        else {
            res.send(rows) ;
        }            
    })
});


//update an employee
app.put('/employee', (req, res) => {
    let emp = req.body;
    var sql = "SET @empId = ?; SET @name= ?; SET @empCode=?; SET @salary=?; " +
    " CALL EmployeeAddOrEdit(@empId, @name, @empCode, @salary);";
    mySqlConnection.query(sql,[emp.empId, emp.name, emp.empCode, emp.salary], (err, rows, fields) =>{
        if (err)
            console.log(err);
        else {
            res.send("Updated successfully") ;
        }            
    })
});