import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const CommentInput = () => {
  return (
    <div className='flex max-w-7xl px-64 items-center justify-center mx-auto'>
        <Textarea className='p-4 flex h-36' placeholder='Enter You Comment ...' />
    </div>
  )
}

export default CommentInput