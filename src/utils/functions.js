import {updateRepoToDatabase, setUserToDb} from './firebase/database'
import { getUserId } from './firebase/utils'
import {webhookUrl, getUserRepo, getUserRepos, getWebhooks, createWebhook, deleteWebhook, getUser, getUserOrganisations} from './github/api'

// export const getUserReposAndWebhooksAsObject = async (token) => {
//   let userRepos = await getUserRepos(token)
//   let obj = {}
//   let webhooks = await Promise.all(userRepos.map(element => getGithubWebhooks(element, token)))

//   userRepos.map((element, i) => {
//     element.webhooks = webhooks[i]
//     console.log(element.webhooks)
//     obj[element.id] = element
//     return true
//   })
//   return obj
// }

export const userWebhookUrl = () => {
  let userId = getUserId()
  return `${webhookUrl}?id=${userId}`
}

export const saveUserSettings = (settings) => {
  let admin = settings.showAdmin || false
  let organisations = settings.showOrganisations || false
  window.localStorage.setItem('organisations', organisations)
  window.localStorage.setItem('admin', admin)
}

export const getUserSettings = () => {
  let settings = {}
  settings.showAdmin = JSON.parse(window.localStorage.getItem('admin')) || false
  settings.showOrganisations = JSON.parse(window.localStorage.getItem('organisations')) || false
  return settings
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
  console.log(user)
  return setUserToDb(user.id, user.login)
}

export const getUserReposAndWebhooksAsObject = async (token) => {
  let userRepos = await getUserRepos(token)
  let obj = {}

  for (let i = 0; i < userRepos.length; i++) {
    userRepos[i].webhooks = await getGithubWebhooks(userRepos[i], token)
    obj[userRepos[i].id] = userRepos[i]
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

const getGithubWebhooks = async (repo, token) => {
  let array = []
  if (repo.permissions.admin) {
    let owner = repo.owner.login
    let repoName = repo.name
    array = await getWebhooks(token, owner, repoName)
  }
  return array
}

export const getGithubOrganisations = async () => {
  let token = getToken()
  return await getUserOrganisations(token)
}

export const capitalizeFirstLetter = (string) => {
  if (typeof string === 'string') {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
