import {
  Show,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/tanstack-react-start'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <h1>Index Route</h1>
      <Show when="signed-in">
        <Link to="/protected">Protected</Link>
        <UserButton />
      </Show>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
    </div>
  )
}
