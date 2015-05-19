Example Frontend Workflow
=========================

This project shows how to integrate a 'full' AngularJS single page application in a Maven based workflow. 

- Uses the [frontend-maven-plugin ](https://github.com/eirslett/frontend-maven-plugin) to set up a Node environment within the webapp directory.
- Uses [NPM](https://www.npmjs.com/) for all dependency management, bower is nice but often causes problems on build-servers because it accesses github directly. 
- Uses [JSHint](http://jshint.com/) for code checks
- Uses [Gulp](http://gulpjs.com/) for the actual build-process, including concatenation and uglyfication of JS
- Uses [Karma](karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/) for unit tests
- Reports tests results in junit format for easy CI integration
- JSHint and test failures break the build
- Uses [Istanbul](https://github.com/gotwarlost/istanbul) code coverage in text, HTML and XML formats
- Patches a configuration JS file based on an environment var to be able to have configurations for different environments.
- 'mvn clean package' packages the app into a deployable WAR

Development
------------
- 'git clone' this repo into a directory
- Import the maven project into your favorite IDE
- Run the 'maven install' target

- During development you can run './bin/gulp watch' from the src/main/webapp directory to have gulp watch for directory changes
- You can run './bin/karma start ./config/karma.js' to have karma running the tests continuously
- The site is built into the src/main/webapp/dist directory. You can view the site by starting a web server in that dir (for example python3 -m http.server) and then browsing to localhost


