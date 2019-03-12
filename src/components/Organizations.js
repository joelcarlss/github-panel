import React from 'react'
import OrganizationCard from './OrganizationCard'

const showOrganizations = (orgs) => {
  let arr = []
  if (orgs) {
    arr = iterateRepos(orgs)
  }
  return arr
}
const iterateRepos = (orgs) => {
  let arr = []
  for (let key in orgs) {
    arr.push(showRepo(orgs[key]))
  }
  return arr
}

const showRepo = (org) => {
  return (
    <OrganizationCard key={org.id} org={org} />
  )
}

const Organizations = (props) => {
  const { orgs } = props
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {showOrganizations(orgs)}
    </div>
  )
}

export default Organizations
