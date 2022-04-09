import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import Navbar from '../../components/Navbar'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <main>
      <Navbar />

      <img
        className="h-96 w-full object-cover "
        src={urlFor(post.mainImage).url()!}
        alt=""
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).url()!}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="text-sm font-light">
            Blog post by{' '}
            <span className="font-semibold text-blue-600">
              {post.author.name}
            </span>{' '}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        {post.body && (
          <div className="mt-10">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my-5 text-2xl font-bold" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="my-5 text-xl font-bold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                normal: ({ children }: any) => (
                  <p className="pb-2">{children}</p>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        )}
        {!post.body && (
          <div className="mx-auto mt-20 items-center text-4xl font-bold">
            No content here
          </div>
        )}
      </article>

      <hr className="my-5 mx-auto max-w-lg border bg-blue-500" />
      {submitted ? (
        <div className="my-10 mx-auto flex max-w-3xl flex-col bg-blue-400 py-10 text-black">
          <h3 className="mx-auto text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p className="mx-auto">
            Once it has been approved, it will appear below!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5 "
        >
          <h3 className="text-lg text-blue-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="mb-5 block">
            <span>Name</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-400 transition duration-300 ease-in-out focus:ring"
              placeholder="Mohamed Emad"
              type="text"
            />
          </label>
          <label className="mb-5 block">
            <span>Email</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-400 transition duration-300 ease-in-out focus:ring"
              placeholder="m.emad@email.com"
              type="email"
            />
          </label>
          <label className="mb-5 block">
            <span>Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none
            ring-blue-400 transition duration-300 ease-in-out focus:ring"
              placeholder="Great Content"
              rows={8}
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- The Name field is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                - The Comment field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">
                - The Email field is required
              </span>
            )}
          </div>
          <input
            className="focus:shadow-outline hover:color-white cursor-pointer rounded-sm
              bg-blue-600 py-2 px-4 font-bold text-white shadow transition duration-500 ease-in-out
            hover:bg-blue-700 focus:outline-none"
            type="submit"
            name=""
            id=""
          />
        </form>
      )}

      <div
        className="my-10 mx-auto flex max-w-2xl flex-col space-y-2
        rounded-sm p-10 shadow shadow-blue-400
          "
      >
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="font-semibold text-blue-600">
                {comment.name}:
              </span>{' '}
              {comment.comment}
              <span className="float-right text-gray-500">
                {new Date(comment._createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post'&& slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image
      },
      'comments': *[
        _type == 'comment' &&
        post._ref == ^._id &&
        approved == true],
      description,
      mainImage,
      slug,
      body
    }`

  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
