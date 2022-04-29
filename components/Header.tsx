import React from 'react'

const Header = () => {
  return (
    <div className="flex items-center justify-between border-y bg-blue-500 py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl text-6xl">
          <span className="underline decoration-black decoration-4">Mlog</span>{' '}
          is a place to read articles
        </h1>

        <h2>It`s easy and free to post your thinking on any topic.</h2>
      </div>

      <div className="hidden h-96 md:inline-flex">
        <img src="/logo.png" alt="logo" className="m-12" />
      </div>
    </div>
  )
}

export default Header
