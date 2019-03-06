export const getUserRepos = async (token) => {
  try {
    const data = await window.fetch('https://api.github.com/user/repos', {headers: {Authorization: token}})
    console.log(data.json())
    return data
  } catch (e) {
    console.log('There was an error fetching the data: ' + e)
  }
}
