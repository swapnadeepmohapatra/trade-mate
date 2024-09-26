import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Auth() {
  // http://localhost:3000/auth?RequestToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjUyMjYxNjcwIiwicm9sZSI6IldDZ3BiYkhIeDF1Q1lhV3ZDUHRLMFRWUjR1TmRVbGtBIiwibmJmIjoxNzI3MjAyMTI5LCJleHAiOjE3MjcyMDIxNTksImlhdCI6MTcyNzIwMjEyOX0.lVHBKY7GBHu-ogDEo8V5Iv4POyFybU0fwrkVUfs_mag&state=urse1

  const { search } = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const requestToken = urlParams.get("RequestToken");
    const state = urlParams.get("state");

    console.log(requestToken, state);
  }, [search]);

  return (
    <div>
      Auth
      <p>{JSON.stringify(search)}</p>
    </div>
  );
}

export default Auth;
