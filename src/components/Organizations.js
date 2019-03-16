import React from 'react'
import OrganizationCard from './OrganizationCard'

const Organizations = ({orgs}) => {
  if (!orgs) {
    return null
  }
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {Object.values(orgs).map(org => <OrganizationCard key={org.id} org={org} />)}
    </div>
  )
}

export default Organizations
