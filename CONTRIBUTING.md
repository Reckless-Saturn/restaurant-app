# Contributing

## General Workflow

1. Fork the repo
1. Cut a namespaced feature branch from Famished's master
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

1. Make commits to your feature branch. Prefix each commit like so:
  - (feat) Add search bar
  - (fix) Fix inconsistent tests [Fixes #0]
  - (refactor) Create factory for CustomerCtrl
  - (cleanup) HTML syntax for buttons
  - (test) Add test file for GET requests
  - (doc) Comment functions in services.js

1. When you've finished with your fix or feature, Rebase upstream (changes into your branch. Submit a pull request directly to Famished's master. Include a description of your changes.
1. Your pull request will be reviewed by another maintainer. 
1. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Detailed Workflow

### Fork the repo

Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

`git remote add upstream https://github.com/Reckless-Saturn/restaurant-app.git`

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

`git checkout -b feat/login`


### Make commits to your feature branch. 

Prefix each commit like so
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) Create factory for CustomerCtrl
  - (cleanup) HTML syntax for buttons
  - (test) Add test file for GET requests
  - (doc) Comment functions in services.js

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script.".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. 
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once finished, commit all your changes and then rebase upstream changes to the master branch into yours by running this command from your branch:

`git pull --rebase upstream master`

Fix conflicting changes and then run: 
`git rebase --continue`

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork's feature branch to the Famished's master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

A team member will review your changes and reach out if there are any questions. 

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code DRY.
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run any tests included before submitting a pull request.
1. Submit tests if your pull request contains new, testable behavior.
1. Your pull request is comprised of a single squashed commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.
