#!/usr/bin/env node
import process from "node:process"

//gets the argument list when the command is used.
const args = process.argv;

function readFlags(){}

function organizeData(data){
    let lastEventType = "";
    let lastEventTypeCounter = 0;
    let lastRepo = "";
    for (ghubEvent of data){
        if (ghubEvent.type != lastEventType){
            pickCorrectOutputMessage(lastEventType, lastEventTypeCounter, lastRepo);
            lastEventType = ghubEvent.type;
            lastEventTypeCounter = 0;
            lastRepo = ghubEvent.repo.name;
        }
    }
}

function fetchUserActivity(user){
    fetch(`https://api.github.com/users/${user}/events`)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        organizeData(result);
    });

}

function pickCorrectOutputMessage(eventType, quantity, repo){
    switch (eventType){
        case "CommitCommentEvent":
            console.log(`- Made ${quantity} commit comments on ${repo}`)
            break;
        case "CreateEvent":
            console.log(`- Made ${quantity} tags or branches on ${repo}`)
            break;
        case "DeleteEvent":
            console.log(`- Deleted ${quantity} tags or branches on ${repo}`)
            break;
        case "ForkEvent":
            console.log(`- Forked ${quantity} repositories`);
            break;
        case "GollumEvent":
            console.log(`- Updated or created ${quantity} the wiki page on ${repo}`)
            break;
        case "IssueCommentEvent":
            console.log(`- Commented ${quantity} times on issues/pull requests from ${repo}`)
            break;
        case "IssuesEvent":
            console.log(`- Updated ${quantity} issues on ${repo}`)
            break;
        case "MemberEvent":
            console.log(`- Made public the repo: ${repo}`)
            break;
        case "PublicEvent":
            console.log(`- Made ${quantity} tags or branches on ${repo}`)
            break;
        case "PullRequestEvent":
            console.log(`- Updated or creaded ${quantity} pull requests on ${repo}`)
            break;
        case "PullRequestReviewEvent":
            console.log(`- Created ${quantity} pull request reviews on ${repo}`)
            break;
        case "PullRequestReviewCommentEvent":
            console.log(`- Commented ${quantity} times on pull request reviews from ${repo}`)
            break;
        case "PullRequestReviewThreadEvent":
            console.log(`- Edited ${quantity} pull request threads on ${repo}`)
            break;
        case "PushEvent":
            console.log(`- Pushed ${quantity} commits on ${repo}`)
            break;
        case "ReleaseEvent":
            console.log(`- Made ${quantity} tags or branches on ${repo}`)
            break;
        case "SponsorshipEvent":
            console.log(`- Made ${quantity} tags or branches on ${repo}`)
            break;
        case "WatchEvent":
            console.log(`- Made ${quantity} tags or branches on ${repo}`)
            break;
        default:
            break;
    }
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