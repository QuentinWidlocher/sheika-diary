import { Entry } from '@prisma/client'
import {
  ActionFunction,
  Link,
  LinksFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
} from 'remix'
import { deserialize, serialize } from 'superjson'
import { z } from 'zod'
import EntryForm from '~/features/entries/components/entry-form'
import {
  prismaSelectEntryInPage,
  EntryInPage,
} from '~/features/entries/types/entries'
import { db } from '~/utils/db.server.'
import formStylesheet from '~/styles/forms.css'
import { updateAction } from '~/features/entries/api/update.server'

export let links: LinksFunction = () => [
  { rel: 'stylesheet', href: formStylesheet },
]

export let loader: LoaderFunction = async ({ params }) => {
  let slug = z.string().parse(params?.slug)

  let entry = await db.entry.findFirst({
    select: { ...prismaSelectEntryInPage },
    where: {
      slug,
    },
  })

  if (!entry) {
    return redirect('/entries')
  }

  return serialize(entry)
}

export let action = updateAction

export default function EntryUpdateBySlug() {
  let defaultValues = deserialize<EntryInPage>(useLoaderData())
  let transition = useTransition()

  return (
    <EntryForm
      transition={transition}
      submitLabel={{ default: 'Update entry', sending: 'Updating entry' }}
      defaultValues={defaultValues}
      action={'/entries/' + defaultValues.slug + '/update'}
      ButtonsSlot={() => (
        <Link className="button mr-3" to={'/entries/' + defaultValues.slug}>
          Cancel
        </Link>
      )}
    />
  )
}
