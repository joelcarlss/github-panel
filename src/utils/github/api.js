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
    name: 'Webhook',
    active: true,
    events: ['push', 'issues'],
    config: {
      url
    }
  }
  try {
    const result = await window.fetch(`https://api.github.com/repos/${owner}/${repoName}/hooks`,
      {
        headers: {Authorization: 'token ' + token},
        body: data,
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
