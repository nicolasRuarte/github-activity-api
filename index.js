#!/usr/bin/env node
import process from "node:process"

//gets the argument list when the command is used.
const args = process.argv;

function outputEvents(data){
    console.log(`${data[0].actor.login}'s activity during the last 90 days was the following:`)
    for (let event of data){
        switch (event.type){
            case "CommitCommentEvent":
                console.log(`- ${event.payload.action} a commit comment on ${event.repo.name}`)
                break;
            case "CreateEvent":
                console.log(`- Created a ${event.payload.ref_type} on ${event.repo.name}`)
                break;
            case "DeleteEvent":
                console.log(`- Deleted a ${event.payload.ref_type} on ${event.repo.name}`)
                break;
            case "ForkEvent":
                console.log(`- Forked a repo to ${event.payload.forkee}`);
                break;
            case "GollumEvent":
                console.log(`- Updated the pages ${event.payload.pages} from the ${event.repo.name}'s wiki.`)
                break;
            case "IssueCommentEvent":
                console.log(`- ${event.payload.action} an issue comment on ${event.repo.name}`)
                break;
            case "IssuesEvent":
                console.log(`- ${event.payload.action} an issue on ${event.repo.name}`)
                break;
            case "MemberEvent":
                console.log(`- ${event.payload.action} ${event.payload.member} as a member of ${event.repo.name}`)
                break;
            case "PublicEvent":
                console.log(`- Made one of his private repositories public`)
                break;
            case "PullRequestEvent":
                console.log(`- ${event.payload.action} ${event.payload.number} pull requests on ${event.repo.name}`)
                break;
            case "PullRequestReviewEvent":
                console.log(`- ${event.payload.action} a PR review on the PR ${event.payload.pull_request} from ${event.repo.name}`)
                break;
            case "PullRequestReviewCommentEvent":
                console.log(`- ${event.payload.action} a PR Review comment on the PR ${event.payload.pull_request} from ${event.repo.name}`)
                break;
            case "PullRequestReviewThreadEvent":
                console.log(`- ${event.payload.action} a PR review thread on the PR ${event.payload.pull_request} from ${event.repo.name}`)
                break;
            case "PushEvent":
                console.log(`- Pushed ${event.payload.size} commits to ${event.repo.name}`)
                break;
            case "ReleaseEvent":
                console.log(`- ${event.payload.action} a release on ${event.repo.name}`)
                break;
            case "SponsorshipEvent":
                console.log(`- Sponsored the repository ${event.repo.name}`)
                break;
            case "WatchEvent":
                console.log(`- Starred the repository ${event.repo.name}`)
                break;
            default:
                break;
        }
    }
}

function fetchUserActivity(user){
    try{
        fetch(`https://api.github.com/users/${user}/events`)
        .then(res => res.json())
        .then(result => outputEvents(result));
    }
    catch (error){
        console.error(error);
    }
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