import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { setActivePost } from "~/store/slices/displaySlice";
import relativeTime from "dayjs/plugin/relativeTime";
import { htmlUnencode } from "~/utils/text";

dayjs.extend(relativeTime);

function Post({ data }) {
  const dispatch = useDispatch();
  const setActive = () => {
    dispatch(setActivePost(data.id));
  };

  const flairElement = data.link_flair_text ? (
    <span
      className={`text-xs font-semibold py-0.5 px-1 inline-block w-fit rounded ${
        data.link_flair_text_color == "light" ? "text-white" : "text-black"
      }
        `}
      style={{ backgroundColor: data.link_flair_background_color }}
    >
      {htmlUnencode(data.link_flair_text)}
    </span>
  ) : undefined;

  const awardsElement = data.all_awardings ? (
    <div className="mt-1">
      {data.all_awardings.map((award) => {
        return (
          <div className="inline mr-2">
            <img
              src={htmlUnencode(award.resized_icons[0].url)}
              className="h-4 w-4 mr-0.5 inline"
              title={award.name + ": " + award.description}
            />
            <div className="inline text-xs">{award.count}</div>
          </div>
        );
      })}
    </div>
  ) : undefined;

  const previewElement = data.thumbnail ? (
    <img
      className="w-1/5 ml-1 mt-1 rounded aspect-square object-cover"
      src={data.thumbnail}
    />
  ) : undefined;

  const actionsElement = (
    <div>
      <i className="fa-solid fa-arrow-up fa-lg hover:text-red-600 hover:cursor-pointer" />
      <div className="px-2 inline">{data.score}</div>
      <i className="fa-solid fa-arrow-down fa-lg hover:text-blue-600 hover:cursor-pointer" />
    </div>
  );

  return (
    <div className="bg-white my-1 p-2 hover:cursor-pointer" onClick={setActive}>
      <div className="text-xs">
        <span className="text-red-600">{data.subreddit}</span>
        {` · ${data.author} · ${dayjs.unix(data.created_utc).fromNow()}`}
      </div>
      <div className="flex items-start mt-1">
        <div className="font-medium flex-grow">
          {data.title} {flairElement}
        </div>
        {previewElement}
      </div>
      {awardsElement}
      <div className="flex justify-between mt-4 text-sm">
        <div>{data.num_comments} comments</div>
        {actionsElement}
      </div>
    </div>
  );
}

export default Post;
