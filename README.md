# public_accounts : a tool for exploring Quebec's municipal public accounts
This project aims to create an automated means to display and comprehend municipal 
budgets and better understand how different municipalities spend their dollars. The project
was started in the context of a transportation research project so additionnal work is 
done in order make the tradeoffs in that space more transparent

## Functionality
This project was stood up as part of a project on municipal costs of transportation. Exploring municipal public accounts isn't particularly straighforward and referneces change every year. This project tries to address that by creating an immutable structure and then assigning the indices to that structure. This means the data can then be tied to the report structure. Finally, the interface allows for the creation of indicators based on the reports. 


## Constituent parts

There are 3 main parts to the setup:
- a frontend
- a backend
- a common types package which is used in order to share the definitions of a few variables


## Getting started

See the [getting started page](docs/getting_started.md)