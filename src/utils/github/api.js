export const getUserRepos = async (token) => {
  try {
    const result = await window.fetch('https://api.github.com/user/repos', {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    getWebhooks(token)
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

export const getWebhooks = async (token) => {
  try {
    const result = await window.fetch(`https://api.github.com/repos/user/hooks`,
    {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    console.log('____________________________')
    console.log(data)
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}
