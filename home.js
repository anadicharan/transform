const http = require("http");
const loadExample= require('./example.json')
const port = process.env.PORT || 5000;

// console.log(loadExample().firstName)

var myFn = function(input1,input2) {
    return 'Hello All , My name is '+input1 + ' ' +input2;
};

let templateObj = {
    name:'=> myFn(firstName,lastName)',
    // name: 'Hello my name is {{firstName}}'+' '+'{{lastName}}',
    age:'I am {{age}} years old',
    state: 'I am from {{address.state}}',
    address : 'I live in {{address.city}}',
    phonenumber : 'My contact is {{phoneNumbers[0].number}}'
};
let transform = require('json-to-json-transformer').transform;
let output = transform(templateObj, loadExample, {myFn});

console.log(output);

http.createServer((request,response)=>{
        response.writeHead(200, {"Context-Type":"text/html"});
        response.write(JSON.stringify(output));
        response.end();
    }).listen(port, ()=>{
    console.log(`listening at port ${port}`);
});