import {updateRepo} from './firebase/database'
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

export const updateRepoAndWebhooks = async (repo) => {
  let token = getGithubToken()
  let webhook = await createWebhook(token, repo)
  let owner = webhook.owner.login
  let repoName = webhook.name
  let newRepo = await getUserRepo(token, owner, repoName)
  let repoWebhookList = await getGithubWebhooks(newRepo, token)
  newRepo.webhooks = repoWebhookList
  updateRepo(token, newRepo)
}

export const deleteRepoWebhook = (repo) => {
  let token = getGithubToken()
  return deleteWebhook(token, repo)
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
