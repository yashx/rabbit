import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { setActivePost } from "~/store/slices/displaySlice";
import relativeTime from "dayjs/plugin/relativeTime";
import { htmlUnencode } from "~/utils/text";

import styles from "./index.module.css";
import classNames from "classnames";

dayjs.extend(relativeTime);

function Post({ data, compact }) {
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
          <div className={styles.award} key={award.id}>
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

  const previewElement = data.thumbnail && compact && (
    <img className={styles.preview_img} src={data.thumbnail} />
  );

  let mediaElement = null;
  if (!compact) {
    switch (data.post_hint) {
      case "image":
        mediaElement = (
          <a
            className={styles.media_container}
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={data.url} className={styles.media_image} />;
          </a>
        );
        break;
      default:
        mediaElement = (
          <div className={styles.media_container}>
            <div className={styles.media_element}>Media</div>;
          </div>
        );
    }
  }

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
      {data.post_hint}
      {awardsElement}
      {mediaElement}
      <div className={classNames(styles.footer, compact && styles.compact)}>
        {actionsElement}
        <div>{data.num_comments} comments</div>
      </div>
    </div>
  );
}

export default Post;
