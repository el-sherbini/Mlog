import Link from 'next/link'

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <span className="cursor-pointer text-4xl font-bold">Mlog</span>
        </Link>

        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-blue-600 px-5 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-blue-600">
        <h3>Sign In</h3>
        <h3 className="rounded-full border border-blue-600 px-5 py-1">
          Get Started
        </h3>
      </div>
    </nav>
  )
}

export default Navbar
