import {useEffect, useState, useContext} from 'react'
import { useLocalStorage } from '../utils/hooks'
import { requestPermission } from '../utils/firebase/messaging'
import { setUserData } from '../utils/functions'
import { setNoticesToRead, onRepos, onOrgs, onNoticeCount } from '../utils/firebase/database'
import createContainer from 'constate'

const useApp = () => {
  const [showOnlyAdmin, setShowOnlyAdmin] = useLocalStorage('showOnlyAdmin', false)
  const toggleShowAdmin = () => setShowOnlyAdmin(state => !state)
  const [repos, setRepos] = useState(false)
  const [orgs, setOrgs] = useState(false)
  const [showMenu, setShowMenu] = useState(null)
  const [noticeCount, setNoticeCount] = useState(0)

  useEffect(() => {
    try {
      setUserData()

      requestPermission()

      onRepos((doc) => setRepos(doc.data()))
      onOrgs((doc) => setOrgs(doc.data()))
      onNoticeCount((doc) => setNoticeCount(doc))
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
    noticeCount,
    repos,
    orgs
  }
}

const {Context, Provider} = createContainer(useApp)

export const useAppState = () => {
  const state = useContext(Context)
  return state
}

export {Provider}
