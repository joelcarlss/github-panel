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
  let url = 'https://us-central1-githubdashboard-1cbfc.cloudfunctions.net/onWebhook'
  let data = {
    name: 'web',
    active: true,
    events: ['push', 'issues'],
    config: {
      url
    }
  }
  let response = await sendWebhookRequest(token, owner, repoName, data)
  return response
}

export const deleteWebhook = () => {}

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
