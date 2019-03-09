import {updateRepoToDatabase} from './firebase/database'
import {getUserRepo, getUserRepos, getWebhooks, createWebhook, deleteWebhook} from './github/api'

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
  await createWebhook(token, repo)
  let owner = repo.owner.login
  let repoName = repo.name
  updateRepo(owner, repoName)
}

export const deleteWebhookAndUpdateRepo = (repo) => {
  let token = getGithubToken()
  let owner = repo.owner.login
  let repoName = repo.name
  deleteWebhook(token, repo)
  .then(updateRepo(owner, repoName))
}

export const updateRepo = async (owner, repoName) => {
  let token = getGithubToken()
  let newRepo = await getUserRepo(token, owner, repoName)
  let repoWebhookList = await getGithubWebhooks(newRepo, token)
  newRepo.webhooks = repoWebhookList
  updateRepoToDatabase(newRepo)
}

export const getGithubToken = () => {
  let token = window.localStorage.getItem('token')
  return token
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
