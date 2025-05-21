import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Addvideo, GetAllVideos, RemoveVideo } from "../store/multiviewerslice/multiviewer";
import { useDispatch, useSelector } from "react-redux";
import "../edit.css"; // Make sure to import the CSS file here

export default function Edit() {
  const [inputId, setInputId] = useState("");
  

  const [inputTitle, setInputTitle] = useState("");
  const dispatch = useDispatch();
  const { videoList } = useSelector((state) => state.mv);
  const [BCvideoList, setBCvideoList] = useState([]);
  const [YTvideoList, setYTvideoList] = useState([]);
  const loc = useLocation();

  useEffect(() => {
    dispatch(GetAllVideos());
  }, [dispatch]);

  useEffect(() => {
    if (videoList) {
      setBCvideoList(videoList?.BCvideos || []);
      setYTvideoList(videoList?.YTvideos || []);
    }
  }, [videoList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedId = inputId.trim();
    const trimmedTitle = inputTitle.trim();

    if (!trimmedId || !trimmedTitle) {
      alert("Both video ID/URL and title are required");
      return;
    }

    const newVideo = { videoentity: trimmedId, title: trimmedTitle };

    if (trimmedId.includes("https://players.brightcove.net/")) {
      if (BCvideoList.find((v) => v.id === trimmedId)) {
        alert("This Brightcove video is already added");
      } else {
        newVideo.type = "brightcove";
        dispatch(Addvideo(newVideo)).then(() => dispatch(GetAllVideos()));
      }
    } else if (/^[a-zA-Z0-9_-]{11}$/.test(trimmedId)) {
      if (YTvideoList.find((v) => v.id === trimmedId)) {
        alert("This YouTube video is already added");
      } else {
        newVideo.type = "youtube";
        dispatch(Addvideo(newVideo)).then(() => dispatch(GetAllVideos()));
      }
    } else {
      alert("Input is not a valid Brightcove URL or YouTube video ID");
    }

    setInputId("");
    setInputTitle("");
  };

  const removeBCVideo = (id) => {
    dispatch(RemoveVideo({ id, type: "brightcove" })).then(() => dispatch(GetAllVideos()));
  };

  const removeYTVideo = (id) => {
    dispatch(RemoveVideo({ id, type: "youtube" })).then(() => dispatch(GetAllVideos()));
  };
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "25px", marginBottom: "20px" }}>Multiviewer</h2>

      {loc.pathname.includes("/edit") && (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Video Title"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Video ID or Brightcove URL"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Video
          </button>
        </form>
      )}

      {/* Brightcove Section */}
      {BCvideoList.length > 0 && (
        <>
          <h3 style={{ background: "#e0f4ff", padding: "10px", color: "#007acc", borderRadius: "5px" }}>
            Brightcove Livestreams
          </h3>
          <div className="video-grid">
            {BCvideoList.map((video, index) => (
              <div key={index} className="video">
                <iframe
                  src={video.VideoEntity}
                  title={`bc-${index}`}
                  allowFullScreen
                />
                <div className="video-title">{video.Title}</div>
                {loc.pathname.includes("/edit") && (
                  <button
                    onClick={() => removeBCVideo(video._id)}
                    style={{
                     
                      top: "8px",
                      right: "8px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* YouTube Section */}
      {YTvideoList.length > 0 && (
        <>
          <h3 style={{ background: "#ffe8cc", padding: "10px", color: "#cc6600", borderRadius: "5px" }}>
            YouTube Livestreams
          </h3>
          <div className="video-grid">
            {YTvideoList.map((video, index) => (
              <div key={index} className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.VideoEntity}`}
                  title={`yt-${index}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="video-title">{video.Title}</div>
                {loc.pathname.includes("/edit") && (
                  <button
                    onClick={() => removeYTVideo(video._id)}
                    style={{
                     
                      top: "8px",
                      right: "8px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
