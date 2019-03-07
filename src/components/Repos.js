import React from 'react'
import RepoCard from './RepoCard'

const showRepoList = (repos) => {
  let arr = []
  if (repos) {
    for (let key in repos) {
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
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {showRepoList(props.repositories.current)}
    </div>
  )
}

export default Repos
