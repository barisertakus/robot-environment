# Robot Environment

## Application Link

```
    https://robot-environment.vercel.app/
```

### 30.04.2022
- NextJS was used to create a new application. 
- The analysis of documents and projects was completed.

### 01.05.2022
- Styled-components and Material UI were used for styling in the project.
- The arena where the robot will move was created.
- Rows and columns were added as boxes in the arena.
- Frontend-side movement logic was added to simulate robot control.

### 02.05.2022
- An image was provided to symbolize the robot.
- The image configuration for NextJS was completed.
- The structures in the project were divided into components and refactored.
- Icons for detecting and showing the robot's direction were added.
- Material UI icons were used that used SVG for better performance.

### 03.05.2022
- Frontend-side movement logic was removed, and backend-side movement logic was added.
- The TurnAround function, which triggers the robot to turn around itself, was implemented.
- A Snackbar was added to the application to display error messages.
- The functions for error, date, and TurnAround were all refactored.

### 04.05.2022
- All the colors were saved in the Colors file.
- The styles in the arena where the Robot is located were updated.
- Jest & React Testing Library were used for unit testing.
- GitHub action were added that will automatically run unit tests after every push to branches.

### 05.05.2022
- MSW, Mock service worker was used instead of mocking Axios or Fetch.
- In this way, it will not create a dependency, regardless of how API requests are made.
- Unit tests were added for Image, loading component and robot arena.