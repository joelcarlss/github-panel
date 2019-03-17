import moment from 'moment'
import {updateRepoToDatabase, setUserToDb} from './firebase/database'
import { getUserId } from './firebase/utils'
import {webhookUrl, getUserRepo, getUserRepos, getWebhooks, createWebhook, deleteWebhook, getUser, getUserOrganisations, githubGetRequest} from './github/api'

export const userWebhookUrl = () => {
  let userId = getUserId()
  return `${webhookUrl}?id=${userId}`
}

export const saveToken = (token) => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const saveUserToDb = async () => {
  let token = getGithubToken()
  let user = await getUser(token)
  return setUserToDb(user.id, user.login)
}

export const getUserReposAndWebhooksAsObject = async (token) => {
  let userRepos = await getUserRepos(token)
  // userRepos = userRepos.map(({id}) => ({id}))
  let obj = {}

  for (let i = 0; i < userRepos.length; i++) {
    userRepos[i].webhooks = await getGithubWebhooks(userRepos[i], token)
    userRepos[i].statistics = await getGithubRepoStatistics(userRepos[i], token)
    obj[userRepos[i].id] = userRepos[i]
  }
  return obj
}

export const getUserOrganisationsAsObject = async (token) => {
  let orgs = await getUserOrganisations(token)
  let obj = {}

  for (let i = 0; i < orgs.length; i++) {
    orgs[i].members = await getOrganisationMembers(orgs[i].url, token)
    obj[orgs[i].id] = orgs[i]
  }
  return obj
}

export const createWebhookAndUpdateRepo = async (repo) => {
  let token = getGithubToken()
  let userId = getUserId()
  await createWebhook(userId, token, repo)
  let owner = repo.owner.login
  let repoName = repo.name
  updateRepo(owner, repoName)
}

export const deleteWebhookAndUpdateRepo = (repo) => {
  let token = getGithubToken()
  let owner = repo.owner.login
  let repoName = repo.name
  let hookId = findCorrectHookIdInRepo(repo)
  deleteWebhook(token, repo, hookId)
  .then(result => {
    if (result.status === 204 || result.status === 404) {
      spliceWebhookAndUpdateRepo(repo)
    } else {
      updateRepo(owner, repoName)
    }
  }
      )
}

export const spliceWebhookAndUpdateRepo = (repo) => {
  repo.webhooks.forEach((element, i) => {
    if (element.config.url === userWebhookUrl()) {
      repo.webhooks.splice(i)
    }
  })
  updateRepoToDatabase(repo)
}

export const updateRepo = async (owner, repoName) => {
  let token = getGithubToken()
  let newRepo = await getUserRepo(token, owner, repoName)
  getGithubWebhooks(newRepo, token)
  .then(repoWebhooks => {
    newRepo.webhooks = repoWebhooks
    updateRepoToDatabase(newRepo)
  })
}

export const getGithubToken = () => {
  let token = window.localStorage.getItem('token')
  return token
}

export const findCorrectHookIdInRepo = (repo) => {
  let hooks = repo.webhooks
  let id
  for (let i = 0; i < hooks.length; i++) {
    if (hooks[i].config.url === userWebhookUrl()) {
      id = hooks[i].id
    }
  }
  return id
}

const getGithubRepoStatistics = async (repo, token) => {
  let statistics = {}
  let owner = repo.owner.login
  let repoName = repo.name
  statistics.contributors = await githubGetRequest(`https://api.github.com/repos/${owner}/${repoName}/stats/contributors`, token)
  .then(contributors => {
    return contributors.map(({author, total}) => ({author: author.login, total}))
  }).catch(console.log)
  statistics.weeklyCommits = await githubGetRequest(`https://api.github.com/repos/${owner}/${repoName}/stats/participation`, token)
  .then(commits => commits.all)
  .catch(console.log)
  return statistics
}

const getGithubWebhooks = async (repo, token) => {
  let array = []
  if (repo.permissions.admin) {
    let owner = repo.owner.login
    let repoName = repo.name
    array = await getWebhooks(token, owner, repoName)
  }
  return array
}

const getOrganisationMembers = (url, token) => {
  return githubGetRequest(url + '/members', token)
}

export const getGithubOrganisations = async () => {
  let token = getToken()
  let orgs = await getUserOrganisations(token)
  return orgs
}

export const capitalizeFirstLetter = (string) => {
  if (typeof string === 'string') {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

export const formatTime = (data) => {
  let time = moment.unix(data.seconds)
  return time.fromNow()
    // return time.format('YYYY-MM-DD HH:mm')
}
