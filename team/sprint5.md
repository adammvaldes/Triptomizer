# Sprint 5 - t13 - Spaghetti Coders

## Goal

### Wrap It Up!
### Sprint Leader: EJ Lee

## Definition of Done

* Sprint Review and Restrospectives completed (sprint5.md).
* Version in pom.xml should be `<version>5.0.0</version>`.
* Increment deployed for demo and testing as server-5.0.jar on the production server.
* Increment release `v5.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* All tests pass.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration / Delivery
* Travis successfully builds and tests on all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

In this sprint, we plan to perform final touches on our application. This includes both client and server functionality.

On the client, we plan to complete interoperability with other teams to help us redesign our page if needed. This includes utilitizing more collapse buttons, dialogue boxes, columns and tabs as needed. This will help make our page as user-friendly as possible.
We also want to "clean up" the code for our page in general. This includes simplifying functions and methods, testing code our code more thoroughly, and speeding up the optimization calculations. This may include the use of concurrency later, as well as 3-opt.

We want to implement the new epics and tasks assigned specifically for sprint 5, but those tasks are at the bottom of priority as we work to complete the tasks from the last sprint, such as implementation on of the KML map.

*Include any design diagrams prepared during sprint planning (user interface, component diagram, component/state/hierarchy, etc.) with a short paragraph for each.

Epics planned for this sprint.

* User: I want to know who to thank for this application:<br>
--Add something that lists the authors, show photos/avatars for the development team.
* User: Make the system easier to use.:<br>
--Too much on the screen at one time results in too much scrolling, difficult to find things.<br>
--Show me what I need only when I need it.
* User: I want an interactive map:<br>
--zoom and pan of an interactive map
--save static map (svg/kml)
* User: I want trip planning to be fast.:<br>
--Use concurrency to improve trip planning performance so there is less of a delay for the user.
* User: I want the shortest trips possible:<br>
--Use 3-opt to improve the nearest neighbor trips.
* User: I want my options remembered so I don't have to fix them all the time:<br>
--save my configuration and restore it next time I visit the application.

Epics from the previous sprint.

* TripCo: All code must be tested:<br>
--minimum 50% coverage, preferred 70% coverage
* TripCo: All code shall be clean!:<br>
--Adhere to the Google style guide for Java and JavaScript.<br>
--Write maintainable code.
* User: I want to choose what information is displayed in the itinerary and map:<br>
--allow additional attribute/value pairs to be captured for destinations whether they are entered manually or obtained from a database.<br>
--allow the user to select attributes to display in the itinerary, including the latitude and longitude.
* User: I want to view my trip in other tools:<br>
--Use a mapping tool to draw the map and allow the user to zoom and pan.



## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | *total* | *total* |
| Tasks |  *total*   | *total* | 
| Story Points |  *total*  | *total* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* | *none* | 

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
