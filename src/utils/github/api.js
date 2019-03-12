export const webhookUrl = 'https://us-central1-githubdashboard-1cbfc.cloudfunctions.net/onWebhook'

export const getUser = async (token) => {
  try {
    const result = await window.fetch('https://api.github.com/user', {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

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

export const getUserOrganisations = async (token) => {
  try {
    const result = await window.fetch('https://api.github.com/user/orgs', {headers: {Authorization: 'token ' + token}})
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
    return window.fetch(`https://api.github.com/repos/${owner}/${repoName}/hooks`,
    {headers: {Authorization: 'token ' + token}})
    .then(result => result.json())
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

export const createWebhook = async (userId, token, repo) => {
  let owner = repo.owner.login
  let repoName = repo.name
  let url = `${webhookUrl}?id=${userId}`
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

export const deleteWebhook = (token, repo, hookId) => {
  let owner = repo.owner.login
  let repoName = repo.name
  try {
    return window.fetch(`https://api.github.com/repos/${owner}/${repoName}/hooks/${hookId}`,
      {
        headers: {
          Authorization: 'token ' + token,
          Accept: 'application/vnd.github.v3+json'
        },
        method: 'DELETE'
      })
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

export const githubGetRequest = async (url, token) => {
  try {
    const result = await window.fetch(url, {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}
