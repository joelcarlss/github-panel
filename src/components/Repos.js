import React from 'react'
import { withRouter } from 'react-router-dom'
import {useAppState} from '../pages/useAppState'

import { Chip } from '@material-ui/core'

import RepoCard from './RepoCard'

const Repos = ({history, match}) => {
  let { repos, showOnlyAdmin } = useAppState()
  const orgToShow = match.params.org
  if (!repos) {
    return null
  }

  repos = Object.values(repos)
  if (showOnlyAdmin) {
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
