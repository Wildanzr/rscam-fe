import React from 'react'

interface IIndicator {
    status: boolean
}

const Indicator: React.FC<IIndicator> = (props: IIndicator) => {
    // Props Destructuring
    const { status } = props
  return (
    <div className="flex">
        {status
            ? <span className='text-lg font-medium text-green-500'>Online</span>
            : <span className='text-lg font-medium text-red-500'>Offline</span>
        }
    </div>
  )
}

export default Indicator