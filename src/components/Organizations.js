import React from 'react'
import OrganizationCard from './OrganizationCard'

const Organizations = (props) => {
  const { orgs, setOrgIdToShow, setShowOrganisations } = props

  const showOrganizations = () => {
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
      <OrganizationCard key={org.id} org={org} onCardClick={() => onCardClick(org.id)} />
    )
  }

  const onCardClick = (id) => {
    setOrgIdToShow(id)
    setShowOrganisations(false)
  }

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {showOrganizations(orgs)}
    </div>
  )
}

export default Organizations
