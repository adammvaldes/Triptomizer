# Inspection - Team *T13* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | Itinerary.js |
| Meeting | 30 November 2018 |
| Checklist | https://github.com/csu18fa314/t13/blob/master/team/pqalzm6/20181130_104640.jpg |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Vlad | 1 Hours |
|  John Miller| 1 hrs |
| Adam Valdes | 1 hr |
| EJ Lee | 1 hr |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Itinerary.js:182 | Attributes are not tied through properties of config. | med | Vlad | #481 |
| Itinerary.js:223 | bool.bool variable is a confusing name | low | Vlad | #482 |
| Itinerary.js:241 | Is it possible to not set state in Itinerary but to inherit as prop? | low | Vlad | #481 |
| Itinerary.js:68,98 | When leg/total distance atribute is removed form the itinerary only the distances are removed. The row remains. | low | pqalzm6| #480 |
| Itinerary.js:83 | Render method does not check if the elements being rendered are undefined. | low | Adam | #483 |
| Itinerary.js:155 | Rendering attributes from config does not check if each individual attribute is undefined. | med | Adam | #483 |
| Itinerary.js:204 | Row of itinerary-modifying buttons suffers from high code duplication between buttons. | low | Adam | #484 |
| Itinerary.js:213 | Search functionality needs more separation from the row of itinerary modifying buttons. | low | Adam | #480 |
| Itinerary.js:11,12 | textField1 and textField2 in state are not being used in the class | low | EJ | #485 |
| Itinerary.js:158-164 | Itinerary Rendered on default covers entire card on site. | low | EJ | #480 |
| Itinerary.js:50,88 | The state of distances is incorrect when trip is updated before PLAN click | med | EJ | #485 |

