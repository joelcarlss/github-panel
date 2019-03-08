import {getUserRepos, getWebhooks} from './github/api'

export const getUserReposAndWebhooksAsObject = async (token) => {
  let userRepos = await getUserRepos(token)
  let obj = {}
  let webhooks = await Promise.all(userRepos.map(element => getGithubWebhooks(element, token)))

  userRepos.map((element, i) => {
    element.webhooks = webhooks[i]
    console.log(element.webhooks)
    obj[element.id] = element
    return true
  })
  return obj
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
