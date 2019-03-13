import React from 'react'
import OrganizationCard from './OrganizationCard'

const Organizations = (props) => {
  const { orgs, setOrgToShow, setShowOrganisations } = props

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
      <OrganizationCard key={org.id} org={org} onCardClick={() => onCardClick(org.login)} />
    )
  }

  const onCardClick = (name) => {
    setOrgToShow(name)
    setShowOrganisations(false)
  }

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {showOrganizations(orgs)}
    </div>
  )
}

export default Organizations
