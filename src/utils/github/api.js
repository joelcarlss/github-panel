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

export const getWebhooks = async (token, owner, repo) => {
  try {
    const result = await window.fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`,
    {headers: {Authorization: 'token ' + token}})
    let data = await result.json()
    return data
  } catch (e) {
    console.log('ERROR')
    console.log('There was an error fetching the data: ' + e)
  }
}

// export const createWebhook = async (token, repo) => {
//   try {
//     const result = await window.fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`,
//     {headers: {Authorization: 'token ' + token}})
//     let data = await result.json()
//     return data
//   } catch (e) {
//     console.log('ERROR')
//     console.log('There was an error fetching the data: ' + e)
//   }
// }
