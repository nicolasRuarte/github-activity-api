#!/usr/bin/env node
import process from "node:process"

//gets the argument list when the command is used.
const args = process.argv;
let objetos;

function readFlags(){}

function fetchUserActivity(user){
    fetch(`https://api.github.com/users/${user}/events`)
    .then(res => res.json())
    .then(result => console.log(result));
}

function organizeData(data){
    //Index of eventTypes is correlated to index of eventTypeCount
    let eventTypes = [];
    let eventTypeCount = [];

    //Keeps track of every type of event and the number of times they appear
    for (let event of data){
        if (!eventTypes.includes(event.type)){
            eventTypes.push(event.type);
            eventTypeCount.push(1);
        }else {
            eventTypeCount[eventTypes.indexOf(event.type)]++;
        }
    }

    console.log(`Se recibieron los eventos ${eventTypes} con la cantidad de ${eventTypeCount}, respectivamente`)

    outputData({eventTypes: eventTypes, eventTypeCount: eventTypeCount});
}

function outputData(data){
    console.log(`-- Let's check ${args[2]}'s activity!`)

}

function readArgumentsList(){
    const user = args[2];

    if (user === ""){
        console.log("You can't search an empty username.");
        return;
    }else if (user === undefined){
        console.log("Please insert a username.")
        return;
    }

    fetchUserActivity(user);
    
}

readArgumentsList();