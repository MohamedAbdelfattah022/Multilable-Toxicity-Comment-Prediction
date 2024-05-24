import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Sedgwick_Ave_Display } from 'next/font/google'
import { cn } from '@/lib/utils';
import {  } from '@shopify/polaris-icons';
import { Biohazard } from 'lucide-react';

const font = Sedgwick_Ave_Display({
 subsets: ["latin"],
 weight: ["400"],
});

const NavBar = () => {
  return (
    <div className='flex items-center justify-between max-w-7xl mx-auto h-full py-8 px-8'>
        <div className='flex items-center '>
            <Biohazard className='w-10 h-10 text-red-600 mr-3 mb-1.5' /> <p className={cn("flex text-3xl font-extrabold select-none", font.className)}>IsToxic</p>
        </div>
        <div className='gap-5 flex items-center'>
            <Link href='' className='font-semibold hover:-translate-y-1 transition-all'>About</Link>
            <Link href='' className='font-semibold hover:-translate-y-1 transition-all'>Privacy Policy</Link>
            <Link href="https://github.com/MohamedAbdelfattah022/Multilable-Toxicity-Comment-Prediction" target='_blank'>
            <Button className='px-6 bg-red-600 '>
                GitHub Repo
            </Button>
            </Link>
        </div>
    </div>
  )
}

export default NavBar
