import React from 'react'
import RepoCard from './RepoCard'

const showRepoList = (repos, showAdmin) => {
  let arr = []
  if (repos) {
    if (showAdmin) {
      arr = iterateAdminRepos(repos)
    } else {
      arr = iterateRepos(repos)
    }
  }
  return arr
}
const iterateRepos = (repos) => {
  let arr = []
  for (let key in repos) {
    arr.push(showRepo(repos[key]))
  }
  return arr
}

const iterateAdminRepos = (repos) => {
  let arr = []
  for (let key in repos) {
    if (repos[key].permissions.admin) {
      arr.push(showRepo(repos[key]))
    }
  }
  return arr
}

const showRepo = (repo) => {
  return (
    <RepoCard key={repo.id} repo={repo} />
  )
}

const Repos = (props) => {
  const { repositories, showAdmin, showOrganisations } = props
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {showRepoList(repositories, showAdmin)}
    </div>
  )
}

export default Repos
