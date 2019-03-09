const webhookUrl = 'https://us-central1-githubdashboard-1cbfc.cloudfunctions.net/onWebhook'

export const getUserRepos = async (token) => {
  try {
    const result = await window.fetch('https://api.github.com/user/repos', {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

export const getUserRepo = async (token, owner, repoName) => {
  try {
    const result = await window.fetch(`https://api.github.com/repos/${owner}/${repoName}`,
    {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

export const getWebhooks = async (token, owner, repoName) => {
  try {
    const result = await window.fetch(`https://api.github.com/repos/${owner}/${repoName}/hooks`,
    {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

export const createWebhook = async (token, repo) => {
  let owner = repo.owner.login
  let repoName = repo.name
  let url = webhookUrl
  let data = {
    name: 'web',
    active: true,
    events: ['push', 'issues'],
    config: {
      url
    }
  }
  let response = await sendWebhookRequest(token, owner, repoName, data, 'POST')
  return response
}

export const deleteWebhook = async (token, repo) => {
  let owner = repo.owner.login
  let repoName = repo.name
  try {
    let hookId = findHookIdInRepo(repo)
    console.log(hookId) // '/repos/:owner/:repo/hooks/:hook_id'
    const data = await window.fetch(`https://api.github.com/repos/${owner}/${repoName}/hooks/${hookId}`,
      {
        headers: {
          Authorization: 'token ' + token,
          Accept: 'application/vnd.github.v3+json'
        },
        method: 'DELETE'
      })
    // let jsonResult = await result.json()
    console.log(data)
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

const findHookIdInRepo = (repo) => {
  let hooks = repo.webhooks
  let id
  for (let i = 0; i < hooks.length; i++) {
    if (hooks[i].config.url === webhookUrl) {
      id = hooks[i].id
    }
  }
  return id
}

const sendWebhookRequest = async (token, owner, repoName, data) => {
  try {
    const result = await window.fetch(`https://api.github.com/repos/${owner}/${repoName}/hooks`,
      {
        headers: {
          Authorization: 'token ' + token,
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(data),
        method: 'POST'
      })
    let jsonResult = await result.json()
    console.log(jsonResult)
    return jsonResult
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}
