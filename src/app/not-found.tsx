import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <h1 className="not-found-page-title">404</h1>
      <p className="not-found-page-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="not-found-page-home-link">
        Go to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
