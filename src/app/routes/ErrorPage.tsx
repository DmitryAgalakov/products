import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div
      id='error-page'
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
      </p>
    </div>
  );
}
