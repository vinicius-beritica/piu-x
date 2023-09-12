import { useCallback, useEffect, useRef, useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { NavHeader } from "../components/NavHeader";
import { Piu } from "../types/Pius";
import NewPiupiu from "../components/NewPiupiu";
import { PiupiuList } from "../components/PiupiuList";
import { User } from "../types/Users";
import { apiPiu } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { backendRoutes, routes } from "../routes";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [liked, setLiked] = useState<boolean>();
  const [post, setPost] = useState<Piu>();
  const [userReply, setuserReply] = useState("");
  const [replying, setReplying] = useState(false);
  const { id, likes } = useParams();
  const navPage = useNavigate();
  const debounceTimer = useRef<number | undefined>();

  const getReplies = useCallback(async () => {
    try {
      const response = await apiPiu.get(backendRoutes.singlePiupiu.replies(id));
      setReplies(response.data.replies);
    } catch (error) {
      navPage(routes.home);
    }
  }, [id]);

  const getPost = useCallback(async () => {
    const response = await apiPiu.get(backendRoutes.singlePiupiu.post(id));
    setPost(response.data);
  }, [id]);

  useEffect(() => {
    getReplies();
    getPost();
  }, [getReplies, liked]);

  const handleSubmit = async (e: React.FormEvent, replyText?: string) => {
    //responder
    console.log(e, replyText);
    e.preventDefault();
    try {
      await apiPiu
        .post(backendRoutes.singlePiupiu.reply(id), {
          message: replyText,
        })
        .then((response) => {
          if (response.status === 200) {
            setuserReply("");
            getReplies();
            getPost();
          }
        });
    } catch (error) {
      throw new Error();
    }
  };

  const handleLike = useCallback(async () => {
    setLiked(liked);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        if (!liked) {
          await apiPiu.post(backendRoutes.singlePiupiu.like(id));
          setLiked(liked);
        } else {
          await apiPiu.delete(backendRoutes.singlePiupiu.like(id));
          setLiked(!liked);
        }
      } catch (err) {
        setLiked(!liked);
      }
    }, 200);
  }, [id, liked, likes, debounceTimer.current]);

  return (
    <>
      <NavHeader title="Post" />
      <CompletePiupiu
        author={post?.author}
        body={post?.message || ""}
        reactions={{
          reactions: {
            comment: {
              active: false,
              total: post?.replies?.total,
            },
            repiu: {
              active: false,
              total: 0,
            },
            like: {
              total: post?.likes?.total,
              active: liked,
              onClick: handleLike,
            },
          },
        }}
      />
      <NewPiupiu
        onChange={(e) => setuserReply(e.target.value)}
        onSubmit={handleSubmit}
        user={{} as User}
        variant="reply"
        value={userReply}
        loading={replying}
      />
      <PiupiuList piupius={replies} onChange={getReplies} />
    </>
  );
};
