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

### Diagrams
<img src="https://github.com/csu18fa314/t13/blob/master/images/SP5Sketch.jpg" width=400px>
*Sprint 5 release website sketch. The main focus for this sprint is to improve and finalize all current features, and optionally add more features once the base has been finalized.*

<img src="https://user-images.githubusercontent.com/42558356/47400444-6b969980-d6fa-11e8-86cc-70fd6958b691.jpg" width=400px>
*Sprint 5 component hierarchy. The focus of this sprint is to keep the hierarchy of our objects the same, while at the same time making big UI changes using react and reactstrap.*

<img src="https://github.com/csu18fa314/t13/blob/master/images/ServerDiagram.png" width=400px>
*Class usages and server side hierarchy for sprint 5. The focus of this sprint will be mainly on the UI, not so much on the server, thus planned hierarchy will be the same.*

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
| Epics | 10 | 6 |
| Tasks |  34   | 78 | 
| Story Points |  51  | 66 | 

#### Planned
We had 34 planned tasks at the beginning of the sprint. We broke tasks up into sections for the client and the server sides. Our main focus is to catch up on unfinished task from last sprint, such as optimizing 2-opt. Then we will move on to the client side tasks. These task mirror the changes suggested from Dave, along with additions of the "team info" section.

#### Completed
At the end of sprint 5, total completed tasks equal 78. As usual, 34 tasks were not nearly enough to accomodate the amount of work our team members had to do for this sprint. Attempting to implement features which did not originally belong in our sprint plan took more points than we planned, as well as testing improvements and various other miniature tasks were also not accounted for.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 11/14/2018 | #414, #400 | #402, #397 | *none* |
| 11/16/2018 | #414, #400, #405, #430, #421, #424, #423, #397 | #402, #434 | *none* | 
| 11/26/2018 | #414, #400, $405, #430, #421, #424, #423, #397, #402, #434 | #435, #439, #425 | *none* | 
| 11/28/2018 | #414, #400, $405, #430, #421, #424, #423, #397, #402, #434, #425, #436, #445, #429, #447, #435, #449, #439, #444 | #428, #455 | *none* | 
| 11/30/2018 | #414, #400, $405, #430, #421, #424, #423, #397, #402, #434, #425, #436, #445, #429, #447, #435, #449, #439, #444, #428, #455, #459, #455, #461, #440, #462, #270, #428 | #410 | *none* | 
| 12/3/2018 | #414, #400, $405, #430, #421, #424, #423, #397, #402, #434, #425, #436, #445, #429, #447, #435, #449, #439, #444, #428, #455, #459, #455, #461, #440, #462, #270, #428, #479, #409, #410 | #485, #488, #480, #403 | *none* |
| 12/5/2018 | #414, #400, $405, #430, #421, #424, #423, #397, #402, #434, #425, #436, #445, #429, #447, #435, #449, #439, #444, #428, #455, #459, #455, #461, #440, #462, #270, #428, #479, #409, #410, #485, #488, #480, #477, #481, #483, #496, #494, #482 | #403, #499, #501, #502 | *none* |
*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 
-I want trip planning to be fast: Vlad and John had worked in a duo fashion throughout the entire section of making 2-opt faster as well as making 2-opt concurrent. Although concurrency will not be making it into the production deployment for this sprint, it is fully implemented in the branch "vstepanuga-sprint5-2optConcurrency" for future review. <br/>
-I want to know who to thank for this application: This was a standard for each team, and did not take a long time to implement. <br/>
-All code must be tested: Our team tried their best to test all code, putting us at roughly a 50% range of code testing.<br/>
-All code must be clean: Following the course text, our team cleaned up nearly all code smells, thus putting our project at A maintainability.<br/>
-Make the system easier to use: Our team completely revamped our website to account for much more simplistic and obvious view of our website. We are proud of this design.<br/>
-I want to choose what information is displayed in the itinerary and map: Our team implemented a dynamic set of checkboxes such that upon clicking a checkbox, a specific row of our itinerary will be hidden away.

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What Went Well

During Sprint 5, like the previous sprints, our teamwork improved. We were able to split tasks up fairly evenly, and coded together as a group more frequently. While updating and improving our client's functionality and design we often times asked each other for opinions. This led to our site being built by a team of people, rather than being built by one person and reviewed by the rest.
We did fairly well in taking on tasks as the sprint continued on. We tried to be sure to work on tasks that we were confident that we could get done before the sprint deadline. We made a few decisions as a group to leave certain tasks in the icebox that we figured we couldn't finish. This led us to not have any incomplete works in our master in time for the check and the deadline.

* We focused as a team in our nearly-complete website redesign, emphasizing user experience 
* We spent time analyzing and fine-tuning output and our client for errors
* We spent much more time talking to other teams and testing between servers for functionality
* We fixed bugs and errors found in a reasonable amount of time
* The team's time managment was better, having less independent coding

#### Problems Encountered and Resolutions

 One of the biggest issues we encountered in this sprint overall was the need for a website redesign.  We had not done much work in redesigning the client in previous sprints, which left various parts of the functionality out of place, outdated or simply not working.  We resolved this by getting feedback from Dave, and meeting as a team to set up clear goals for our website's layout and functionality. By the end of the sprint we were able to complete the redesign of our website to the point agreed upon by each of our team members.
 
 One of our team's ongoing issues was our slow runtimes for our optimizations, and as such another one of our main issues this sprint was to improve our performance for our optimizations.  We were ultimately able to greatly improve our optimization performance after an extensive review of the relevant code and modifying our implementation accordingly.
 
 What was probably our biggest problem this sprint was our struggle to implement concurrency in time to deploy our final product.  Although we were able to thread our optimization process, we were unable to get the threaded version to run faster than the non-threaded one.  As such, we ultimately had to decide that we were not going to be able to implement the feature before the deadline.  This essentially meant that most of our time spent on that feature unfortunately did not change anything in our final deployed website.

## Retrospective

During this sprint we were able to close tasks consistently and frequently and were also able to deploy regularly.  We also identified which epics we thought we could complete and worked in a more focused manner to complete them.  Although our burndown report was behind schedule, we believe that we were close to in line with what could be expected given that the break essentially extended our chart with a week of no progress.

#### What we changed this sprint

One thing we changed this sprint is that we were able to deploy more consistently. We were also able to more clearly identify which tasks and epics we felt were of the highest priority.

#### What we did well

This sprint we were able to more clearly identify which epics we should prioritize completing by the end of the sprint and as such our overall workflow was much more well focused. We were also able to deploy more regularly with a working product throughout the sprint.

#### What we need to work on

One thing we could improve on is being able to more accurately estimate how much time certain tasks will take to complete, as we lost a significant portion of our time to some tasks that we were unable to complete by the end of the sprint, effectively invalidating a portion of our work on this sprint.

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
