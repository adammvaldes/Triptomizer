# Inspection - Team *T13* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | Itinerary.js |
| Meeting | 30 November 2018 |
| Checklist | http://www.cs.toronto.edu/~sme/CSC444F/handouts/java_checklist.pdf |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Vlad | 2 Hours |
|  John Miller| 2 hrs |
| Adam Valdes | 1 hr |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Itinerary.js:182 | Attributes are not tied through properties of config. | med | Vlad | |
| Itinerary.js:223 | bool.bool variable is a confusing name | low | Vlad | |
| Itinerary.js:241 | Is it possible to not set state in Itinerary but to inherit as prop? | low | Vlad | |
| Itinerary.js:68,98 | When leg/total distance atribute is removed form the itinerary only the distances are removed. The row remains. | low | pqalzm6| |
| Itinerary.js:83 | Render method does not check if the elements being rendered are undefined. | low | Adam | |
| Itinerary.js:155 | Rendering attributes from config does not check if each individual atribute is undefined. | med | Adam | |
| Itinerary.js:204 | Row of itinerary-modifying buttons suffers from high code duplication between buttons. | low | Adam | |
| Itinerary.js:213 | Search functionality needs more separation from the row of itinerary modifying buttons. | low | Adam | |

