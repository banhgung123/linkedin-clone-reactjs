import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import {
  db,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getAuth,
  doc,
  onSnapshot
} from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState(() => "");
  const [posts, setPosts] = useState(() => []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const postsRef = collection(db, "posts");

    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const getPosts = [];
      querySnapshot.forEach((doc) => {
        getPosts.push({ id: doc.id, data: doc.data() });
      });
      setPosts(
        getPosts.map((item) => {
          if (item.data.description === getAuth().currentUser.email) {
            return item;
          }
        })
      );
    });

    // const q = query(
    //   postsRef,
    //   orderBy("timestamp", "desc"),
    //   where("description", "==", getAuth().currentUser.email)
    // );
    // const querySnapshot = await getDocs(q);
    // setPosts(
    //   querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     data: doc.data()
    //   }))
    // );
  };

  const sendPost = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoURL,
      timestamp: serverTimestamp()
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map((item) => {
          if (item) {
            const {
              id,
              data: { name, description, message, photoUrl }
            } = item;
            return (
              <Post
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
              />
            );
          }
        })}
      </FlipMove>
    </div>
  );
}

export default Feed;
