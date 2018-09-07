# Sprint #1 - T13 - Spaghetti Coders

## Goal

### Distance Calculator!
### Sprint Leader: Vlad Stepanuga

## Definition of Done

* Web application deployed on the production server (black-bottle.cs.colostate.edu).
* Version in server/pom.xml should be `<version>1.0</version>`.
* Sprint Review and Restrospectives completed (sprint#.md).
* Product Increment release `v1.0` created on GitHub.

## Policies

* All commits include a task/issue number.
* No commits to master

## Plan

Epics planned for this release.

* 1 Responsive Client for distance calculator
* 2 RESTful Service for distance

*Include a discussion of planning decisions the team made.*

As a team, we split up the individual tasks between the five members. Due to conflicting schedules, we planned on different times for different members to meet to work on individual projects, i.e. two members worked in the CS120 lab at one point, while two different members worked in the CS120 lab at another point in time. Although all 5 members were unable to meet at the same time, multiple people could help certain tasks at once.

## Review

#### Completed epics in Sprint Backlog 
* We successfully completed all the epics in sprint1. There is a working website at the url: http://black-bottle.cs.colostate.edu:31413
* 

#### Incomplete epics in Sprint Backlog 
* There were no incomplete epics in the sprint backlog.
*

#### What went well
* We successfully created the pull requests on GitHub
* We were able to integrate our changed code onto GitHub
* Good overall team communication and sharing learned knowledge of tools and deployment process

#### Problems encountered and resolutions
* We had several problems completing the Calculations class. We had many issues trying to access the latitude and longitude of the origin and distance. We eventually solved the issue by creating a Location class to initialize the origin and distance in the distance object. This was thanks to testing by Vlad, Adam, and EJ and help from the TA Chris.
* There we a few issues in rounding the calculation that was solved by further testing and small changes in the Distance class.
* Issues syncing IntelliJ with GitHub, the changes were reverting after running the server: fixed by committing changes to github branch first before running the server.

## Retrospective

#### What went well
* The team communicated well over slack and in the CS120 lab.
* There were no issues in creating issues, tasks, and epics in GitHub and Zenhub 
* Team communication and willingness to assists each other

#### Potential improvements
* Spending time physically together in the CS120 lab added to our productivity greatly in comparison to working either separately or remotely, so coordinating more of those opportunities should increase our productivity
* Dividing our workload better for our following assignments in order to better distribute the amount of work each of our members needs to do may help our team's overall performance

#### What we will change next time
* Improve time management and focus on creating a working version sooner to allow more time for debugging
