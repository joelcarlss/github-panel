import React, {useEffect, useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { onMessage } from '../utils/firebase/messaging'
import { capitalizeFirstLetter } from '../utils/functions'

function PopUpMessage () {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(false)
  let vertical = 'top'
  let horizontal = 'right'

  useEffect(() => {
    onMessage((object) => {
      handleMessage(object)
    })
  }, [])

  const handleMessage = (object) => {
    let message = `${capitalizeFirstLetter(object.data.title)}: ${object.data.body}`
    setMessage(message)
    setOpen(true)
  }

  function handleClose () {
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{message}</span>}
      />
    </div>
  )
}

export default PopUpMessage
