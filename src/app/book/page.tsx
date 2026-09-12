import { redirect } from 'next/navigation';

// The booking flow is now handled by a global modal.
// Redirect any direct /book visits to the home page.
export default function BookPage() {
  redirect('/');
}
