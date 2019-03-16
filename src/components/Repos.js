import React from 'react'
import { withRouter } from 'react-router-dom'

import { Chip } from '@material-ui/core'

import RepoCard from './RepoCard'

const Repos = (props) => {
  const { repositories, showAdmin, orgToShow, history } = props
  if (!repositories) {
    return null
  }

  let repos = Object.values(repositories)
  if (showAdmin) {
    repos = repos.filter(repo => repo.permissions.admin)
  }
  if (orgToShow) {
    repos = repos.filter(repo => orgToShow === repo.owner.login)
  }

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {orgToShow ? <Chip label={orgToShow} onDelete={() => history.push('/orgs')} /> : null}
      {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
    </div>
  )
}

export default withRouter(Repos)
