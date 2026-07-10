import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'

const authStateFn = createServerFn().handler(async () => {
  // Use `auth()` to read the session on the server and protect this route.
  // Unlike the `<Show>` component, which only controls what renders, this is
  // the real access check: a signed-out user who navigates here is redirected.
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    throw redirect({ to: '/' })
  }

  return { userId }
})

export const Route = createFileRoute('/protected')({
  component: Protected,
  beforeLoad: async () => await authStateFn(),
  loader: async ({ context }) => ({ userId: context.userId }),
})

function Protected() {
  const { userId } = Route.useLoaderData()

  return (
    <p>
      Welcome! Your user ID is <code>{userId}</code>.
    </p>
  )
}
