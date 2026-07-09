import { UserButton } from '@clerk/tanstack-react-start';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { firstName } = useLoaderData({ from: '/_protected' });
  return (
    <div>
      <p>Hello {firstName}!</p>
      <UserButton />
    </div>
  )
}
