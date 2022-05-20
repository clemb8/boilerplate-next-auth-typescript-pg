import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';

const Connected: NextPage = () => {

  const { data: session } = useSession();
  console.log(session);

  return(
    <main>
      <div className="content">
        <div className="container">
          <div className="contents">
            <div className="form-block">
              <div className="header-form">
                <h3>Congrats You are connected as <strong>{session?.user?.email}</strong></h3>
                <p className="mb-4">You can Log out to test another time</p>
              </div>
              <div>
                
              </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}

export default Connected;