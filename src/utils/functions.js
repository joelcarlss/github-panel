import {addWebhookToDb} from './firebase/database'
import {getUserRepos, getWebhooks, createWebhook, deleteWebhook} from './github/api'

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
    console.log(userRepos[i].webhooks)
    obj[userRepos[i].id] = userRepos[i]
  }
  return obj
}

export const setWebhookOnRepo = (repo) => {
  let token = getGithubToken()
  let webhook = createWebhook(token, repo)
  addWebhookToDb(webhook)
}

export const deleteRepo = (repo) => {
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
