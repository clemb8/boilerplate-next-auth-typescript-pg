import Link from "next/link";

export default function NotAuth() {

  return (
    <main>
      <div className="content">
        <div className="container">
          <div className="contents">
            <div className="form-block">
              <p>Seems that you are not connected, you can not see those informations</p>
              <Link href="/">Go to the Login Page</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}