import React from 'react'
import Button from '~/components/Button'
import {Link} from '@remix-run/react'
function Location() {
  return (
    <>
    <div className="flex justify-between gap-2">
    <p>taking loaction from IP, change location</p>
    <Button as={Link} to="select-address" theme="blue"></Button>
  </div>
  </>
  )
}

export default Location