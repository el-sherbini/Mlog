import Link from 'next/link'
import { urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}
export default function Posts({ posts }: Props) {
  return (
    <div
      className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2
      md:gap-6 md:p-6 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className=" group cursor-pointer overflow-hidden rounded-lg">
            <img
              className="h-96 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
              src={urlFor(post.mainImage).url()!}
              alt=""
            />

            <div>
              <div className="py-3">
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-xs">{post.description}</p>
              </div>
              <img
                className="mr-2 inline h-12 w-12 rounded-full"
                src={urlFor(post.author.image).url()!}
                alt=""
              />
              by <span className="font-bold"> {post.author.name}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
