
1.0.0rc4 / 2015-04-17
=====================

  * Fix link to upload or login app

1.0.0rc3 / 2015-04-16
=====================

  * Add reset filters when click on logo
  * Add closing button. Redirect to / after close
  * Add 'Asuntos del Sur' link
  * Add error when description['en'] or description['es'] is longer than 300 characters
  * Add redirect to /login when anonymous user tries to upload new app
  * Add login in modal
  * Update 'STACK' for 'Civic Stack'
  * Update styles to match .about instead of body.about
  * Update no redirect to / when modal closes
  * Fix 'no apps' text


1.0.0rc2 / 2015-04-15
=====================

  * Add order alphabetically categories, countries, licenses, tags and technologies
  * Fix deleting empty license from req.body
  * Fix setting license id to app

1.0.0rc / 2015-04-15
====================

  * Merge branch 'add/remove' into development
  * [admin] - Add removing categories, countries, tags, technologies
  * Merge branch 'add/remove-app' into development
  * [admin-applications] - Add removing app
  * Merge branch 'add/remove-license' into development
  * [admin-licenses] - Add deleting a license
  * Merge branch 'add/admin-licenses' into development
  * [admin-licenses] - Add create and update
  * [admin-licenses] - Add list
  * Merge branch 'add/admin-technologies' into development
  * [admin-technologies] - Add create and update
  * [admin-technologies] - Add list
  * Merge branch 'add/admin-countries' into development
  * [admin-countries] - Add update and create country
  * [admin-countries] - Add list
  * Merge branch 'add/admin-tags' into development
  * [admin-tags] - Add admin list, create and update
  * Merge branch 'add/admin-category' into development
  * [admin-categories-form] - Add create and update category
  * [admin-categories] - Add categories list
  * [header] - Add closing navbar collapse on every 'page:change'
  * [models:user] - Fix to set admin attribute
  * Use npm 2.7.6 (latest version)
  * [setup] - Add secret env variable for session storage
  * [app-card] - Add conditionally show/hide attributes if present or not
  * [app-detail] - Add conditionally show/hide attributes if present or not
  * Merge branch 'update/about-page' into development
  * [about] - Update texts
  * Merge branch 'remove/flags' into development
  * [flags] - Remove flags. Use language abbreviation instead
  * Merge branch 'add/footer' into development
  * [footer] - Add footer
  * [mobile] - Add user-scalable=no
  * [header] - Fix header login icons size and position
  * Merge branch 'add/github-signin' into development
  * [github login] - Add github login
  * [app-card] - Show country name
  * Merge branch 'add/category-filter' into development
  * [filters] - Add filter by category
  * Merge branch 'add/filters-tags' into development
  * [filters] - Add filter by tags
  * Merge branch 'add/filters-technology' into development
  * [filters] - Add filter by technology
  * Merge branch 'add/country-filter' into development
  * [filters] - Add filter by country
  * Merge branch 'add/search-filter' into development
  * [filters] - Add search filter
  * [app-detail] - Fix license name
  * Merge branch 'add/logo' into development
  * [header] - Add logo
  * [models:app] - Add 300 characters max validation
  * [app-form] - Add 300 characters limit for description
  * [app-detail] - Show technology names
  * Merge branch 'add/technology' into development
  * [app:model] - Add technology attribute
  * [admin-app-form] - Add model validation
  * [homepage] - Add showing a message when no apps
  * [admin-app-form] - Fix getting/setting country, category, license
  * [app-detail] - Populate category, country and license attributes. Fix setting language on template
  * Merge branch 'add/app-validation' into development
  * [app] - Add form validation on frontend
  * [language] - Fix unnecesary redirect when accessing the site for the first time. Saving user language
  * Merge branch 'add/languages' into development
  * [languge] - Add spanish and english languages
  * [restricted] - Remove 'restricted' component. Redirect to / after signin
  * Merge branch 'add/uploaded-by' into development
  * [app] - Add uploadedBy attribute
  * Merge branch 'add/licenses' into development
  * [license] - Add license model, db-api, api and licenses component
  * Merge branch 'add/category' into development
  * [category] - Add category
  * [country] - Add country input on front and backend
  * [country] - Add model, db-api, api route for all countries, countries component
  * [models:country] - Add model
  * [app model] - Rename 'title' to 'name'. Remove team, workingAt.
  * [app-card] - Update {{ name }} for {{ title }}
  * [app-logo] - Fix log size acorss the whole app
  * [header] - Add header border bottom
  * [app-form] - Add comments field
  * [admin-app-form] - Fix translation
  * [app-card] - Remove license from footer
  * Merge branch 'add/uploading-new-app' into development
  * [app-form] - Add saving from frontend
  * Add saving app from frontend
  * Add english by default on frontend for regular users (admin can see all languages). Add scrolling back to top after saving
  * Merge branch 'add/different-app-routes' into development
  * [apps] - Add two different routes, one for /api/applications/all and another one for /api/applications/approved for a regular user and an admin respectively
  * Merge branch 'add/admin-apps-form' into development
  * [admin-app-form] - Add create and update form
  * [admin-app] - Add actions on list
  * Merge branch 'add/admin-apps' into development
  * [admin-apps] - Add listing
  * Merge branch 'add/application-form' into development
  * [app-form] - Add step 3
  * [app-form] - Add step 2
  * Merge branch 'development' into add/application-form
  * [header] - Update header collapse and fixed position
  * [app-form] - Starting step 2
  * [app-form] - Add step 1 of new app form
  * [application-form] - Add 'Upload app' button
  * [application-form] - Add 'Upload app' button
  * Merge branch 'add/tags-admin' into development
  * [admin-tags-form] - Add admin tags form
  * [admin-tags] - Separate into another routing component
  * [admin-sidebar] - Add selected class to a sidebar item
  * [admin-tags] - Add admin tags list
  * [admin] - Add real basic admin page
  * [user] - Add admin attribute
  * Merge branch 'add/twitter-login' into development
  * [login] - Add twitter login/logout
  * [bootstrap] - Bump to version 3.3.4
  * [header] - Update to use Vue.js
  * [application-detail] - Remove 'no-gutter' class
  * [visionmedia/debug] - Bump to version 2.1.3
  * [collection] - Add collection for handling client side collections like applications, tags, etc...
  * Merge branch 'add/multilingual-application-description' into development
  * [application] - Add miltilingual description
  * Merge branch 'add/tags' into development
  * [tags] - Add tag multilingual model
  * Merge branch 'add/application-detail' into development
  * [application-detail] - Add application detail page
  * Merge branch 'add/applications-list' into development
  * [application-card] - List all applications on homepage
  * [application-card] - Add logo/logo component for each application logo image
  * Rename cstack to civistack everywhere
  * [homepage] - Add applications list
  * [header] - Use local render for translations. Fix styles
  * Merge branch 'add/about-page' into development
  * [about] - Add about page
  * [config] - Add missing comma
  * Merge branch 'clear/node-js' into development
  * [config] - Add secret key to config
  * [config] - Ignore client side config
  * [translations] - Add support for translations
  * [header] - Add basic header layout
  * [facebok] - Remove all Facebook references
  * Second steps removing nodejs-starter template
  * [build] - Update build process to exit notifying with process.exit(1) and batch the three builds for js, css and assets. Move installing node_modules and components to npm postinstall script on package.json
  * Merge pull request #15 from slifszyc/master
  * Merge branch 'slifszyc-master'
  * mergin @slifszyc pull-request
  * update package.json
  * Merge branch 'update/dependencies'
  * Update npm dependencies
  * Merge pull request #14 from BukhariH/issue-#12
  * Rename development.json to sample.json
  * updating homepage adding @slifszyc to the list of contributors
  * adding @slifszyc to the list of contributors
  * Merge branch 'slifszyc-master'
  * moving sample.json to development.json
  * Fix bug
  * Revert builder2 changes
  * Merge branch 'component1'
  * Merge branch 'builder2.js' into component1
  * Using Builder2.js
  * Using component v1.0.0-rc5
  * Merge branch 'config'
  * Create  directory to hold all config code and parameters
  * Merge branch 'express4'
  * Bump express version to 4.4.3
  * Update README.md
  * splash update
  * splash update
  * fix remote
  * fix git remotes
  * fix superagent
  * Update README.md
  * Merge branch 'master' of github.com:gravityonmars/nodejs-starter
  * Update test for build on development
  * Update README.md
  * Bump passport, passport-twitter and passport-facebook
  * Add debug to auth routes
  * Add debug to root booting
  * Update build module
  * Update code style for variable assignments
  * Update Makefile
  * fix typo
  * Merge branch 'master' of github.com:gravityonmars/nodejs-starter
  * fixes
  * Update README.md
  * [boot] - removing gravityonmars-components/bootstrap-stylus
  * [build] - avoid compile on every root
  * [user] - Unnecessary stuff
  * [user:index] - Avoid 404 on json response
  * [user-model] - Check if provided user has id or _id
  * Link Heroku deployment issues at README.md
  * Add Windows Common errors reference.
  * removing script from boot page
  * fix counters github/twitter
  * [bin] - Resolve path for windows environments. #4
  * Merge branch 'master' of github.com:gravityonmars/nodejs-boilerplate
  * [bin] - Fix typo
  * Update component.json
  * Update Makefile components install script
  * fixing splash
  * fixing splash
  * fixing splash
  * fixing splash
  * fixing splash
  * fixes config & updated readme
  * favicon fix
  * [homepage] - Tweet button to iframe instead script
  * [auth] - Logout user prior to login with any strategy
  * [auth] - success redirect url to /restricted
  * [boot] - Restricted area.
  * [homepage] - Add yields/empty as dependency
  * Added new area 51
  * Mount user API service routes
  * [boot] - Moved homepage to component. Add first restricted example.
  * [registration] - Fix Twitter's registration bug with avatar
  * [user-model] - Client user-model prototyping user session
  * [user] - User object from user-model
  * [homepage] - Initial component
  * [auth] - Add logout route force replace
  * Add twitter auth routes
  * Fix Twitter strategy options
  * Add twitter registration
  * Add Twitter strategy
  * Merge branch 'master' of github.com:gravityonmars/nodejs-starter
  * fixes
  * Update README.md
  * fixes
  * fixes
  * Merge branch 'master' of github.com:gravityonmars/nodejs-starter
  * fixes
  * Update some README.md's links
  * Update README.md
  * more forgotten errors
  * Forgoten registration module in auth
  * Add component as dependency
  * Merge branch 'master' of github.com:gravityonmars/nodejs-starter
  * Makefile fix
  * Patch to merge of configuration keys
  * fix env configs
  * new splash
  * new splash
  * new splash
  * new splash
  * new splash
  * readme & sites using it
  * Move gravityonmars-components/bootstrap-stylus to boot's dependencies
  * Add Procfile
  * Merge branch 'master' of github.com:gravityonmars/nodejs-boilerplate
  * Provide with some usefull silly commands
  * support for bootstrap 2.3.2
  * fixing style
  * fixing style
  * new splash page
  * new splash page
  * Fix jade's deprecated implicit scripts
  * Merge branch 'master' of github.com:gravityonmars/nodejs-boilerplate
  * boot auth module
  * Add missing routes for auth module
  * new splash page
  * Add auth routes and strategy
  * new splash page
  * Simple registration module for facebook provider
  * Add simple user model
  * new splash page
  * Update engines in package.json
  * Add stylus component compiler plugin
  * Write app.css after compile
  * Add public to make clean command
  * Fix booting component.json
  * new splash
  * Update README.md
  * fixing config files
  * Merge branch 'master' of github.com:gravityonmars/nodejs-boilerplate
  * new readme & development.json
  * Update component builder
  * Remove forgotten console.log
  * First commit
