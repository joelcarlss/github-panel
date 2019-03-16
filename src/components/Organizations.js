import React from 'react'
import OrganizationCard from './OrganizationCard'
import {useAppState} from '../pages/useAppState'

const Organizations = () => {
  const {orgs} = useAppState()
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
