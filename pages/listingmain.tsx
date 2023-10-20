import React from 'react'

const listingmain = () => {
    const obj =[
        {
            id:1,
            maximum_amt:10000,
            minentry_amt:10,
            redenvelope_name:'Diwali-Gift'

        },
        {
            id:2,
            maximum_amt:50000,
            minentry_amt:50,
            redenvelope_name:'Christmas-Gift'

        },
        {
            id:1,
            maximum_amt:10000,
            minentry_amt:10,
            redenvelope_name:'Diwali-Gift'

        },
        {
            id:2,
            maximum_amt:50000,
            minentry_amt:50,
            redenvelope_name:'Christmas-Gift'

        },
        {
            id:1,
            maximum_amt:10000,
            minentry_amt:10,
            redenvelope_name:'Diwali-Gift'

        }
        
    ]
  return (
    <div className='mainlisting'>
        {obj.map(details=>{
            return(

            <div className='containerlisting'>
                <h1>{details.redenvelope_name}</h1>
                <h2>Total Bounty ${details.maximum_amt}</h2>
                <h3>Entry Fee ${details.minentry_amt}</h3>

            </div>
            )
        })}

    </div>
  )
}

export default listingmain