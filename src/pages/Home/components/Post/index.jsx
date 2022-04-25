import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { setActivePost } from "~/store/slices/displaySlice";
import relativeTime from "dayjs/plugin/relativeTime";
import { htmlUnencode } from "~/utils/text";

import styles from "./index.module.css";
import classNames from "classnames";

dayjs.extend(relativeTime);

function Post({ data }) {
  const dispatch = useDispatch();
  const setActive = () => {
    dispatch(setActivePost(data));
  };

  const flairElement = data.link_flair_text && (
    <span
      className={classNames(
        styles.flair,
        data.link_flair_text_color == "light" && styles.light_text
      )}
      style={{ backgroundColor: data.link_flair_background_color }}
    >
      {htmlUnencode(data.link_flair_text)}
    </span>
  );

  const awardsElement = data.all_awardings && (
    <div className={styles.awards_container}>
      {data.all_awardings.map((award) => {
        return (
          <div className={styles.award}>
            <img
              src={htmlUnencode(award.resized_icons[0].url)}
              title={award.name + ": " + award.description}
            />
            {award.count}
          </div>
        );
      })}
    </div>
  );

  const previewElement = data.thumbnail && (
    <img className={styles.preview_img} src={data.thumbnail} />
  );

  const actionsElement = (
    <div className={styles.actions}>
      <i
        id="upvote"
        className={classNames("fa-solid fa-arrow-up fa-lg", styles.upvote)}
      />
      <div className={styles.score}>{data.score}</div>
      <i
        id="downvote"
        className={classNames("fa-solid fa-arrow-down fa-lg", styles.downvote)}
      />
    </div>
  );

  return (
    <div className={styles.container} onClick={setActive}>
      <div className={styles.post_info}>
        <span className={styles.subreddit_span}>{data.subreddit}</span>
        {` · ${data.author} · ${dayjs.unix(data.created_utc).fromNow()}`}
      </div>
      <div className={styles.post}>
        <div className={styles.title}>
          {data.title} {flairElement}
        </div>
        {previewElement}
      </div>
      {awardsElement}
      <div className={styles.footer}>
        <div>{data.num_comments} comments</div>
        {actionsElement}
      </div>
    </div>
  );
}

export default Post;
