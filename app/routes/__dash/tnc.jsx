import React from 'react'
import {Form, useTransition, Link} from '@remix-run/react'
import Button from '~/components/Button'
function tnc() {
  return (
    <><h1 className=''> Terms and Condition</h1>
        <ol>
            <li>
                Our application is only for users who have ability to and willing to test the products.
            
            </li>
            <li>
                We are not responsible for any damage caused by the products.
            </li>
            <li>
                blah blah blah
            </li>
        </ol>
        <Link to ='/'>
            <Button>
            Accept
            </Button>
            
            </Link>
            
            <Link to ='/'>
            <Button>
                Reject
                </Button>
                </Link>
    </>
  )
}

export default tnc