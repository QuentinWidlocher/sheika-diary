import {
  Form,
  Link,
  LinksFunction,
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
} from 'remix'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import entriesStylesheet from '~/styles/entries.css'
import { deleteAction } from '~/features/entries/api/delete'
import { getUser } from '~/utils/session.server'
import { User } from '@prisma/client'

export let links: LinksFunction = () => [
  { rel: 'stylesheet', href: entriesStylesheet },
]

export let loader: LoaderFunction = async ({ request }) => {
  let currentUrl = new URL(request.url).pathname
  let user = await getUser(request)
  return { currentUrl, user }
}

// We just display the pages for now, we use this file to link the stylesheet
export default function EntriesMainPage() {
  let { currentUrl, user } = useLoaderData<{
    currentUrl: string
    user: User | null
  }>()

  return (
    <div className="entries-layout">
      <header>
        <div className="bg-picture"></div>
        <nav className="flex">
          <Link to="/entries" className="button flex mr-auto">
            <FiArrowLeft size="1.5rem" className="mr-3" />
            Back to the entries
          </Link>
          {user ? (
            <Form action="/logout" method="post">
              <button type="submit">{user.username} (Logout)</button>
            </Form>
          ) : (
            <Link className="button" to={`/login?redirectTo=${currentUrl}`}>
              Login
            </Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
        <div className="bg-picture"></div>
      </main>
      <footer>
        <div className="bg-picture"></div>
        <nav className="flex">
          {!user ? null : (
            <Link to="/entries/new" className="button flex ml-auto">
              <FiPlus size="1.5rem" className="mr-3" />
              Add an entry
            </Link>
          )}
        </nav>
      </footer>
    </div>
  )
}
