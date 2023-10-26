import Image from 'next/image'
import Hero from './hero'

export default function Home() {
  return (
    <main className="">
      <Hero></Hero>
    </main>
  )
}

function sayHi() {
  console.log('hi')
}
