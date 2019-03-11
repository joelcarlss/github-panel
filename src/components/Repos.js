import React from 'react'
import RepoCard from './RepoCard'

const showList = (repos, showAdmin, showOrganisations) => {
  if (showOrganisations) {
    return showOrganisations(repos, showAdmin)
  } else {
    return showRepoList(repos, showAdmin)
  }
}

const showOrganisations = (repos, showAdmin) => {

}

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
      {showList(repositories, showAdmin, showOrganisations)}
    </div>
  )
}

export default Repos
