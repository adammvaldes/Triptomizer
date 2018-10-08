# Sprint 3 - t13 - Spaghetti Coders

## Goal

### Build shorter trips!
### Sprint Leader: Adam Valdes

## Definition of Done

* Sprint Review and Restrospectives completed (sprint3.md).
* Version in pom.xml should be `<version>3.0.0</version>`.
* Increment deployed for demo and testing as server-3.0.jar.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.
* Team members should be able to reach a consensus on whether a task is done or not when closing it.
* If team members disagree on whether a task is done or whether a solution is ready to deploy then they should attempt to resolve the issue through discussion between team members before resorting to a "majority rules" decision.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

We want to have a more organized approach to completing the epics of this Sprint. We will first complete the unfinished epics of Sprint 2, then move on the epics of Sprint 3. We want to continue to keep a well-designed, well-organized, functioning website for users.

*Include any design diagrams prepared during sprint planning (user interface, component diagram, component/state/hierarchy, etc.) with a short paragraph or each.

#### First Time Visiting Website Layout
<img src="https://user-images.githubusercontent.com/42558356/46451268-9a9c9980-c752-11e8-8242-9578aa7dd578.jpg" width="400"/>

#### Website After Load Button Was Pressed
<img src="https://user-images.githubusercontent.com/42558356/46451296-b4d67780-c752-11e8-9eae-5bc9475f93f5.jpg" width="450"/>

#### Website After Start From Scratch Button Was Pressed
<img src="https://user-images.githubusercontent.com/42558356/46451299-ba33c200-c752-11e8-8c6b-0c2fbfad4b7b.jpg" width="400"/>

Epics planned for this sprint.

* 1. TripCo: All code must be tested: <br>
minimum 50% coverage, preferred 70% coverage
* 2. User: I want to design a trip from scratch so I can stop using the other tool: <br>
Create an empty itinerary.
* 3. User: I want to make and save changes to the trip:<br>
I would like to add or remove destinations. <br>
I want to choose a different starting location. <br>
I want to reverse the order of the trip. <br>
I want to find possible destinations so I can add them. <br>
I want to save the changes I make to the trip.
* 4. User: I want my trips to be shorter. <br>
Use a simply optimization strategy (nearest neighbor) to build a shorter trip.
* 5. (Sprint2) TripCo: All clients and servers must interoperate!
This requires an adherence to the TFFI specification: <br>
Each client must include a configuration option to change to server:port used for RESTful services.
* 6. (Sprint2) TripCo: All code shall be clean!:
Adhere to the Google style guide for Java and JavaScript. <br>
Write maintainable code. <br>
Time to read the book if you haven't started. <br>
More to come! <br>
You may amend your sprint#.md and README.md with policies as needed to reflect specifics you would like to focus on for the sprint and the future.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *4* | *0* |
| Tasks |  *18*   | *0* | 
| Story Points |  *31*  | *0* | 

For this sprint we ended up planning the same number of beginning story points as the number that we created last sprint. Although the story points we planned are equal to the ones from the last sprint at the beginning, we can expect for some additional ones to be added as the sprint progresses and new requirements are found and new features are found to be necessary. Although Dmitry was transferred to another team, we still expect to be able to complete most if not all of the tasks we created.  

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 10/1/2018 | *none* | #135 | *none* | Dmitri was transferred away from our team. We will be working to readjust our team workload to compensate for the decrease in our number of team members.
| 10/3/2018 | #217 | #135, #205 | *none* | 
| 10/5/2018 | #217 | #135, #205 | *none* |

*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What Went Well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *something*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*Articulate what went well at the end of the sprint.*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
