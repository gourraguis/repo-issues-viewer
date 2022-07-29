# Repo Issues Viewer

Implement GitHub repo issues viewer as a kanban board


## Requirements
1. User should input repo url in the top input and press "Load"E.g. https://github.com/nodejs/diagnostics/
2. Load issues using github API
3. Add 3 columns 
	- Backlog (all new unknown issues goes here, latest added on the bottom)
	- In Progress
	- Completed
4. Add ability to drag'n'drop issues between the columns and change order of issues.
5. Changed column/order data must persist during page reload and unique per repo. 
	- Data loaded from github **must not be stored** in the storage. You can store only user data: column and ordering
	- On change Repo1 → Repo2 → Repo1 user must see  changes he did in Repo1.
6. Design should be done using Bootstrap 5
7. Data must be passed through the Context

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
