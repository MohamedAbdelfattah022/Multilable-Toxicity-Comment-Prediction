import { Check, X } from 'lucide-react'
import React from 'react'

const Choices = () => {
  return (
    <div className='flex items-center justify-center gap-32 max-w-7xl mx-auto h-full py-14 px-36'>
        <div className='text-center'><div className='p-2 bg-red-600 text-white rounded-md'>
            <X className='w-16 h-14' />
        </div>
        <p className='pt-2'>Toxic</p>
        </div>
        <div className='text-center'><div className='p-2 bg-green-500 text-white rounded-md'>
            <Check className='w-16 h-14' />
        </div>
        <p className='pt-2'>Pure</p>
        </div>
    </div>
  )
}

export default Choices