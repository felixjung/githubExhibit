'use strict';

// NPM MODULES
const Github = require('github-api');
const _ = require('lodash');
const promisify = require('./promisify');

// User class
class Repo {
  constructor (github, user, repo) {
    const _this = this;
    const githubRepo = github.getRepo(user, repo);
    const githubIssues = github.getIssues(user, repo);

    // Promisify and add specific methods of github repo.
    const methods = ['show', 'listForks', 'listPulls', 'listBranches'];
    _.defaults(_this, promisify.promisifyMethods(githubRepo, methods));

    this.listIssues = promisify.promisifyFunction(githubIssues.list);
  }
}

module.exports = Repo;
