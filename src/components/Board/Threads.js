import React from "react";
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

function Threads(props) {
  const formatter = buildFormatter(enStrings);
  const { threads } = props;

  if (!threads.length) {
    return <p>No threads here yet</p>;
  }

  return (
    <>
      <div>
        {threads.map((thread) => {
          return (
            <Thread thread={thread} formatter={formatter} key={thread.id} />
          );
        })}
      </div>
    </>
  );
}

function Thread(props) {
  const { thread, formatter } = props;
  return (
    <div key={thread.id}>
      <p>User: {thread.user}</p>
      <p>Title: {thread.title}</p>
      <p>Text: {thread.content}</p>
      <p>Time: {thread.createdAt}</p>
      <TimeAgo
        date={thread.createdAt}
        formatter={formatter}
        minPeriod="MINUTE"
      />
    </div>
  );
}

export default Threads;
