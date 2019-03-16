import {useEffect, useState} from 'react'
import { getToken } from '../utils/functions'
import { useLocalStorage } from '../utils/hooks'
import { requestPermission } from '../utils/firebase/messaging'
import {updateDatabaseWithGithubDataByToken, setNoticesToRead, onRepos, onOrgs} from '../utils/firebase/database'

export default () => {
  const [showOnlyAdmin, setShowOnlyAdmin] = useLocalStorage('showOnlyAdmin', false)
  const toggleShowAdmin = () => setShowOnlyAdmin(state => !state)
  const [repos, setRepos] = useState(false)
  const [orgs, setOrgs] = useState(false)
  const [showMenu, setShowMenu] = useState(null)

  useEffect(() => {
    try {
      let token = getToken() // TODO: Not a local storage variable
      updateDatabaseWithGithubDataByToken(token)
      requestPermission()

      onRepos((doc) => setRepos(doc.data()))
      onOrgs((doc) => setOrgs(doc.data()))
    } catch (e) {
      console.log(e) // TODO: Show data from API instead?
    }
  }, [])

  useEffect(() => {
    if (showMenu === false) {
      setNoticesToRead()
    }
  }, [showMenu])
  return {
    showMenu,
    setShowMenu,
    showOnlyAdmin,
    setShowOnlyAdmin,
    toggleShowAdmin,
    repos,
    orgs
  }
}
