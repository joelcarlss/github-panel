import React from 'react'
import RepoCard from './RepoCard'

const Repos = (props) => {
  const { repositories, showAdmin, orgToShow } = props

  const showList = () => {
    return showRepoList(repositories, showAdmin)
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
    if (orgToShow) {
      if (orgToShow === repo.owner.login) {
        return (
          <RepoCard key={repo.id} repo={repo} />
        )
      }
    } else {
      return (
        <RepoCard key={repo.id} repo={repo} />
      )
    }
  }

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {showList()}
    </div>
  )
}

export default Repos
