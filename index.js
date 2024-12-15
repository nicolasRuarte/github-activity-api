#!/usr/bin/env node
import process from "node:process"

//gets the argument list when the command is used.
const args = process.argv;
let objetos;

function readFlags(){}

function fetchUserActivity(user){
    fetch(`https://api.github.com/users/${user}/events`)
    .then(res => res.json())
    .then(result => objetos = result);
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


fetchUserActivity(args[2]);