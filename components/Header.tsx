import React from 'react'

const Header = () => {
  return (
    <div className="flex items-center justify-between border-y bg-blue-500 py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">Blog</span>{' '}
          is a place to write and read articles
        </h1>

        <h2>It`s easy and free to post your thinking on any topic.</h2>
      </div>

      <div className="hidden h-32 md:inline-flex lg:h-full">
        <img
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="logo"
        />
      </div>
    </div>
  )
}

export default Header
