import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import { useState } from 'react';
import NotAuth from '../components/NotAuth';
import Spinner from '../components/Spinner';

const Connected: NextPage = () => {

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  console.log(session);
  
  // If no session exists, display access denied message
  if (!session) { 
    return <NotAuth></NotAuth>
  }

  return(
    <>
      <main>
        <div className="content">
          <div className="container">
            <div className="contents">
              <div className="form-block">
                <div className="header-form">
                  <h3>Congrats You are connected as <strong>{session?.user?.email}</strong></h3>
                  <h5>Your user id is <strong>{session?.user?.id}</strong></h5>
                  <p className="mb-4">You can Log out to test another time</p>
                  <button value="Log Out" className="btn btn-out" onClick={
                    async () => {
                      setLoading(true);
                      await signOut();
                      setLoading(false);
                    }
                  }>Log Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {
        loading ? <Spinner></Spinner> : <></>
      }
    </>
  );
}

export default Connected;