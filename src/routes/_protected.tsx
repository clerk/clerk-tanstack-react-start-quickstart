import { auth, clerkClient } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

// Server function to check auth and redirect to login if not authenticated
const checkAuth = createServerFn().handler(async () => {
  try {
    const { isAuthenticated, userId } = await auth()
    if (!isAuthenticated) {
      throw redirect({ to: '/' })
    }

    // Get the user's full `Backend User` object
    const user = await clerkClient().users.getUser(userId)

    return { userId, firstName: user?.firstName }
  } catch (error) {
    throw redirect({ to: '/' })
  }
})

// Protected route with auth check
export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => await checkAuth(),
  loader: async ({ context }) => {
    return { userId: context.userId, firstName: context.firstName }
  },
})