import React from "react";
import Card from "./Layout/Card";

const RepoList = (props) => {
  const users = props.repo;

  return (
    <>
      {users.map((user) => (
        <Card
          key={user.id}
          user={user}
          id={user.id}
          owner={user.name}
          name={user.full_name}
          avtar={user.owner.avatar_url}
          push={user.pushed_at}
          star={user.stargazers_count}
          desc={user.description}
          issue={user.open_issues}
        />
      ))}
    </>
  );
};

export default RepoList;
