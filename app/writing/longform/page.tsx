import BookPage from "@/components/writing/BookPage";
import { book } from "@/lib/book";
import { pageTitle, withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: pageTitle(book.title),
  description: book.description,
  openGraph: { title: pageTitle(book.title), description: book.description },
});

export default function BookRoute() {
  return <BookPage />;
}
