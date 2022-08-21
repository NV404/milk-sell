import React from 'react'
import { Form,} from '@remix-run/react'


function LangShow(){
    let isLoggedIn = false;
    return(
        <div>
            {isLoggedIn||<LangDr />}
        </div>
    )
}
export default LangShow
function LangDr() {
   

  return (
    
    <div>
        <Form>
            <select>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
            </select>
        </Form>
    </div>
  )
}
