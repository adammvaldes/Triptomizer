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

We want to successfully integrate the newly aquired requirements into our webpage. We expect to successfully display a map of Colorado and an itinerary on our website, with compatability with mobile devices. On the client side, we want to update any itinerary the server is given, then update the map to have the vectors that point to each specific location on the map. We want to update our calculation of distance to successfully calculate the different distance of a round trip between locations. We plan to take each task on step by step to complete our goals.
* User: I want to supply my own units for the distances.<br>
I should be able to define an arbitrary unit of measure to use in the itinerary.
* TripCo: The solution must be responsive for mobile devices. <br>
Mobile first! The solution should be designed/optimized for a mobile environment, but still work well in a desktop environment. Not the other way around.
This is an ongoing issue that you might want to reflect in your README and sprint#.md's
* TripCo: All clients and servers must interoperate! <br>
This requires an adherence to the TFFI specification.
Each client must include a configuration option to change to server:port used for RESTful services.
* TripCo: All code shall be clean! <br>
Adhere to the Google style guide for Java and JavaScript.
Write maintainable code.
Time to read the book if you haven't started.
More to come!
You may amend your sprint#.md and README.md with policies as needed to reflect specifics you would like to focus on for the sprint and the future.
* User:I want a map and itinerary for my trip <br>
I plan trips in the state of Colorado in another tool.
The tool produces a file that conforms to the TFFI trip object.
The trip is always a round trip.
Show me a map and itinerary for the trip in the file that I can view on my phone.

*Include a discussion of planning decisions.*


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | 0 |
| Tasks |  9   | 0 | 
| Story Points |  14  | 0 | 

*Enter the `# Planned` at the beginning of the sprint, `# Completed` at the end of the sprint.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* | *none* | 

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
