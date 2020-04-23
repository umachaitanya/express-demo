const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const customers= [
    {id : 1, name : "umachaitanya"},
    {id : 2, name : "sruthi"},
    {id : 3, name : "joe"},
    {id : 4, name : "monica"}
];

app.get('/', (req, res) => {
    res.send("hello world");
});
app.get('/api/customers',(req,res) => {
    res.send(customers);
});
app.get('/api/customers/:id', (req,res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) { return res.status(404).send("this customer is not available")};
    res.send(customer);
});
app.post('/api/customers',(req,res)=>{
    const { error } = validateCustomer(req.body) //reesult.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const customer = {
        id : customers.length +1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
});
app.put('/api/customers/:id',(req,res)=> {
   
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) {
       return res.status(404).send("this customer is not available");
    }
    const { error } = validateCustomer(req.body) //reesult.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    customer.name = req.body.name;
    res.send(customer);
});
app.delete('/api/customers/:id', (req,res) => {
    const customer = customers.find( c => c.id === parseInt(req.params.id));
    if(!customer){ return res.status(404).send("this customer is not available")};
     //delete
     const index = customers.indexOf(customer);
     customers.splice(index, 1);
     res.send(customer);
})
function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
};
const port = process.env.PORT || 4200;
app.listen(port, () =>  console.log(`listining on port ${port}`))
