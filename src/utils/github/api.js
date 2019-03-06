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
