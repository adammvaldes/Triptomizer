# Sprint 2 - t13 - Spaghetti Coders

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: Dmitry Melnikov

## Definition of Done

* Sprint Review and Restrospectives completed (sprint2.md).
* Web app deployed on black-bottle.cs.colostate.edu
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

We want to successfully integrate the newly acquired requirements into our webpage. We expect to successfully display a map of Colorado and an itinerary on our website, with compatibility with mobile devices. On the client side, we want to update any itinerary the server is given, then update the map to have the vectors that point to each specific location on the map. We want to update our calculation of distance to successfully calculate the different distance of a round trip between locations. We plan to take on each task step by step to complete our goals.
* 1. User: I want to supply my own units for the distances.<br>
I should be able to define an arbitrary unit of measure to use in the itinerary.
* 2. TripCo: The solution must be responsive for mobile devices. <br>
Mobile first! The solution should be designed/optimized for a mobile environment, but still work well in a desktop environment. Not the other way around.
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
We came together as a group to discuss the epics and tasks for this sprint. We began to split each epic into different tasks, then estimated the difficulty of each task. We evaluated epics by diffucilty and created tasks for both the client and the server sides for each epic. <br>
The client side needs to successfully process uploaded file, render the map and itinerary from the file on the webpage, and draw the corresponding vectors on the map after the calculations are completed. <br>
The server side needs to process the new type of TFFI object, and calculate the round trip distances from the data in the object. <br>
In addition, our team created a few tasks to clarify the information given from the Product Manager. These are essential to make sure that we complete the sprint goals within the time frame. <br>
Lastly, we have tasks to remind us to maintain clean code and confirm operability between our assigned teams. We plan to use the clean code task to remind us to review each others' code to confirm our code's cleanliness. 


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | 3 |
| Tasks |  27 | 24 | 
| Story Points |  31  | 30 | 




## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/14/18 | 2 | 9 | *none* | 
| 9/17/18 | 2 | 9 | *none* |
| 9/19/18 | 2 | 9 | Brainstorming and understanding the relationship between server and client. Issues understanding the requirements for the assignment |
|9/21/18 | 10 | 5 | Understanding the client side |
|9/24/18 | 10 | 5 | *none* |
|9/26/18 | 13 | 5 | *none* |
|9/28/18 | 24 | 1 | *none* |

*Add a new row for each scrum session.*

## Review

Overall the team performed really well. We were able to create a mobile responsive solution that draws a map of trip and creates an itinerary based on the uploaded file. The webapp follows the latest TFFI guidelines posted for this sprint.  The team communicated and worked together to figure out the best possible solution and to overcome impediments. 

#### Completed epics in Sprint Backlog 

* User: I want to supply my own units for the distances: the webapp allows users to supply their own units for distances
* User:I want a map and itinerary for my trip : our webapp allows users to upload a file with thier locations. Then it will generate a map and itinerary for the trip
* TripCo : The solution must be responsive for mobile devices : our webapp is designed with mobile solution in mind and is scalable on mobile devices.

#### Incomplete epics in Sprint Backlog 

* TripCo: All clients and servers must interoperate!: currently the client does not allow users to select which server they want to communicate with
* TripCo: All code shall be clean! : the clean code is a continuous process and is never finished as long as the product is in development

#### What went well

* We were able to finish the webapp's core functionality on time. The team members learned a lot about web development during this sprint.
* The team communicated well over Slak and in CS120 lab. We had no problems creating tasks and distributing workload among team members.
* Team members were very helpful in sharing information and assisting each other.

#### Problems encountered and resolutions

* We had difficulty understanding server-client communication in the beginning. 
* It was not immediately clear how to display the map on the screen in the specified format
* While rendering the map we discovered problems plotting vectors anchored to the borders of Colorado instead of the borders of image. We solved this issue by calculating the pixel buffer to offset vector positions from image borders to state borders.

These issues delayed our progress. We were able to resolve them through research, asking for help from TAs and experimentation. 


## Retrospective


#### What we changed this sprint

We focused on trying to create a working solution sooner in the sprint to allow more time for trouble shooting and finalizing touches. We improved on team communication and working in lab during the same hours to allow for smoother spread of working hours. 

#### What we did well

The changes discussed above were successful  in allowing us faster development of working version sooner and giving us more time for debugging. The team communicated well during our time in CS120 lab and everyone was helpful in trying to solve issues with the project.

#### What we need to work on

The main improvements were seen in working together so we will continue on this path of fostering productive work environment for every team member. The team will also work on more accurately estimating time requirements for each task and divide those tasks accordingly.

#### What we will change next sprint 

We will improve our early stages of development. The team will spend more time understanding issues presented and carefully study the provided task specifications. We will create more tasks up front by diving epics into more individual components. 
