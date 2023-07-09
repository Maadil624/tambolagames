//get answers array stored in db through which tickets will be generated

// app.get('/getanswers', async (req, res) => {
//     let result = await Answers.find();

//     let answersArray = result[0]['answers'];
//     if (answersArray) {

//         res.send(answersArray);
//     }
//     else {
//         res.send({ result: 'Answers not found' })
//     }
// });

//api to generate tickets from answers stored in db
import autoIncrementModelID from "../Models/Counter.js";
import ticketSchema from "../Models/Tickets.js"
import answersSchema from "../Models/Answers.js"
import  express  from "express";
import axios from "axios";
const app=express();
const getanswers=async function(req,res){
    let result = await Answers.find();
    // get array with name answers
    let answersArray = result[0]['answers'];
    if (answersArray) {
        // if answers array is stored in db 
        res.send(answersArray);
    }
    else {
        // if answers array not is stored in db
        res.send({ result: 'Answers not found' })
    }
}

export async function generateticket(req,res){
    if (req.body.count) {
        //get the number of tickets to be generated
        let tickets = req.body.count;
        let generatedTickets = [];

        // get answers array from db
        const getAnswers = 'http://localhost:5000/getanswers';
        const response = await axios.get(getAnswers);
        const answersArray = response.data;

        let shuffled = answersArray.sort(() => 0.5 - Math.random());

        //create requested tickets
        for (let i = 0; i < tickets; i++) {

            //create 3 constant rows for ticket with same empty spaces
            let row1 = shuffled.slice(0, 5).sort(() => 0.5 - Math.random()).concat((new Array(4)).fill(null)).sort(() => 0.5 - Math.random());
            row1 = row1.sort(() => 0.5 - Math.random());

            let row2 = shuffled.slice(5, 10).sort(() => 0.5 - Math.random()).concat((new Array(4)).fill(null)).sort(() => 0.5 - Math.random());
            row2 = row2.sort(() => 0.5 - Math.random());

            let row3 = shuffled.slice(10, 15).sort(() => 0.5 - Math.random()).concat((new Array(4)).fill(null)).sort(() => 0.5 - Math.random());
            row3 = row3.sort(() => 0.5 - Math.random());

            //combine whole array of answer ticket 
            let array = row1.concat(row2, row3);

            //create new ticket with unique combination of answers 
            try {
                const newTicket = await Tickets.create({
                    'answers': array,
                }); // create new ticket
                generatedTickets.push(newTicket); // push new ticket to generatedTickets
            } catch (err) {
                console.error(err,"eeeee");
                res.status(500).send('Error creating new ticket');
            }
        };

        // send response with new tickets data
        res.status(200).send(generatedTickets);
    }
    else {
        res.send({ result: 'No ticket count found' });
    }
}

export default getanswers
//route to get ticket according to user id
// export async function alltickets(req, res){
//     if (req.body.data.id) {
//         //if id for user found
//         let user_id = req.body.data.id;
//         let ticket = await Tickets.findOne({ id: user_id }); //find ticket with same id as user

//         if (ticket) {
//             //if ticket found
//             res.send(ticket);
//         } else {
//             res.send({ result: "No Ticket found" })
//         }
//     }
//     else {
//         res.send({ result: 'No id found' });
//     }
// }
