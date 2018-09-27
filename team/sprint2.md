# Sprint 2 - t13 - Spaghetti Coders

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: Dmitry Melnikov

## Definition of Done

* Sprint Review and Restrospectives completed (sprint2.md).
* Version in pom.xml should be `<version>2.0.0</version>`.
* Increment deployed for demo and testing.
* Increment release `v2.0` created on GitHub with appropriate version number and name.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order.
* Unit tests are fully automated.
#### Configuration Management
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

We want to successfully integrate the newly acquired requirements into our webpage. We expect to successfully display a map of Colorado and an itinerary on our website, with compatibility with mobile devices. On the client side, we want to update any itinerary the server is given, then update the map to have the vectors that point to each specific location on the map. We want to update our calculation of distance to successfully calculate the different distance of a round trip between locations. We plan to take each task on step by step to complete our goals.
* 1. User: I want to supply my own units for the distances.<br>
I should be able to define an arbitrary unit of measure to use in the itinerary.
* 2. TripCo: The solution must be responsive for mobile devices. <br>
Mobile first! The solution should be designed/optimized for a mobile environment, but still work well in a desktop environment. Not the other way around.
This is an ongoing issue that you might want to reflect in your README and sprint#.md's
* 3. TripCo: All clients and servers must interoperate! <br>
This requires an adherence to the TFFI specification.
Each client must include a configuration option to change to server:port used for RESTful services.
* 4. TripCo: All code shall be clean! <br>
Adhere to the Google style guide for Java and JavaScript.
Write maintainable code.
Time to read the book if you haven't started.
More to come!
You may amend your sprint#.md and README.md with policies as needed to reflect specifics you would like to focus on for the sprint and the future.
* 5. User:I want a map and itinerary for my trip <br>
I plan trips in the state of Colorado in another tool.
The tool produces a file that conforms to the TFFI trip object.
The trip is always a round trip.
Show me a map and itinerary for the trip in the file that I can view on my phone.

#### Planning Decisions:
We came together as a group to discuss the epics and tasks for this sprint. We began to split each epic into different tasks, then estimated the difficulty of each task. In total, we created 10 tasks based on the epics and information we currently have. We had to split up epics number 1 and 5 the most, with tasks for both the client and the server sides. <br>
The client side needs to successfully render the map and itinerary on the webpage, and draw the corresponding vectors on the map after the calculations are completed. <br>
The server side needs to process the new type of TFFI object, and calculate the round trip distances from the data in the object. <br>
In addition, our team created a few tasks to clarify the information given from the Product Manager. These are essential to make sure that we complete the sprint goals within the time frame. <br>
Lastly, we have tasks to remind us to maintain clean code and confirm operability between our assigned teams. We plan to use the clean code task to remind us to review each others' code to confirm our code's cleanliness. We will use slack to communicate with members from the other teams for our Interoperate Epic number 3.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | 0 |
| Tasks |  11 | 2 | 
| Story Points |  15  | 2 | 

*Enter the `# Planned` at the beginning of the sprint, `# Completed` at the end of the sprint.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/14/18 | 2 | 9 | *none* | 
| 9/17/18 | 2 | 9 | *none* |
| 9/19/18 | 2 | 9 | Brainstorming and understanding the relationship between server and client. Issues understanding the requirements for the assignment |
|9/21/18 | 10 | 5 | Understanding the client side |
|9/24/18 | 10 | 5 | *none* |
|9/26/18 | 13 | 5 | *none* |

*Add a new row for each scrum session.*

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What went well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems encountered and resolutions

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

*Articulate at the end of the sprint.  Focus on one of things you need to work on.*
