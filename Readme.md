# On-the-Beach-Tech-Test

## Requirements

[Node.js](https://nodejs.org/en/download/)
[VSCode](https://code.visualstudio.com/)

## Setup

Clone the repository using `$git clone` in the VScode terminal, cd into the created directory and run `$npm i` to install dependencies (mocha v.6.1.4 and chai v.4.2.0)

Run `$npm test` to run the tests.

## Notes

I built up the function using TDD, writing new tests then altering the function to pass the tests. The different stages can be seen in the repository's commit history.

First commit - initail setup and dependancy installation.

Second commit - wrote and passed the first test with a simple check on the input string, if it was empty then the function would return an empty string. Although the check wasn't necessary at this time, it was apparent that it would be for the rest of the tests later.

Third commit - wrote the next two tests together as they were both concerning jobs with no dependencies. Wrote a second function to format the input string into a two dimensional array as I thought it would make it easier to reference the necessary information. This is called in the main function and the formatted input is used to build up the final job sequence by iterating through the array and adding any jobs with no dependencies.

Fourth commit - wrote both the tests for jobs with dependencies as they would require the same logic to pass. Using the existing code, I added another loop to add any jobs that have dependencies, checking if the dependency had been added to the final sequence before adding the job. Added a while loop to check that the length of the final sequence was correct before continuing to the return statement.

Fifth commit- wrote both the tests for error checking the input string. The first test was passed by declaring a boolean and adding a check in the first iteration through the input to see if the job was equal to the dependency. This would change the boolean and cause the function to return the appropriate error before continuing to the second loop. The second test was passed by building up strings in the while loop containing all the jobs and dependencies that were not yet in the final sequence. The strings had to be reset and built again each iteration of the while loop. If at any time the elements of both were equivalent, then there must be a circular dependency. This would change the boolean and cause the while loop to exit, and the function to return the appropriate error.

The remaining commits were refactors, in order to make the function more readable, to get rid of any unnecessary/redundant code, and make the function more efficient. I also expanded the tests to be more appropriate, rather than just checking for the exact expected sequence they would check the order of the returned jobs in relation to their dependencies.

