
import {Link} from '@remix-run/react'
import Button from '~/components/Button'
function tnc() {
  return (
    <><h1 className=''> Terms and Condition</h1>
     {/* TODO add terms and condition */}
           
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
            {/* Button looks ugly, 
            TODO 
            Add appropriate space between button
            How to throw error if user does not accept the terms and condition? */}
       
        <Link to ='/'>
            <Button theme='red'>
                Reject
            </Button>
        </Link>
    </>
  )
}

export default tnc