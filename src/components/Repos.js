import React from 'react'
import RepoCard from './RepoCard'

const showRepoList = (repos) => {
  console.log(repos)
  for (let key in repos) {
    console.log(key)
  }
}

const showRepo = (repo) => {
  return (
    <div>
      <RepoCard />
    </div>
  )
}

const Repos = (props) => {
  return (
    <div>
      {showRepoList(props.repositories)}
    </div>
  )
}

export default Repos
