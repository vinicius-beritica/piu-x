import { PiupiuList } from "../components/PiupiuList";
import { useEffect, useState } from "react";
import { Piu } from "../types/Pius";
import { useParams } from "react-router-dom";
import { apiPiu } from "../service/api";

type ProfileProps = {
  postsRoute: "posts" | "likes";
};

export const Profile = ({ postsRoute }: ProfileProps) => {
  const [userPosts, setUserPosts] = useState<Piu[] | undefined>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiPiu
      .get(`${import.meta.env.VITE_API_BASE_URL}users/${handle}/${postsRoute}`)
      .then((newResponse) => {
        setIsLoading(false);
        return setUserPosts(newResponse.data);
      });
  }, [postsRoute, handle]);

  const loadingCircle = document.querySelector("#initial-loanding");
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 1);
      }
    });
    if (loadingCircle) {
      intersectionObserver.observe(loadingCircle);
    }
    return () => intersectionObserver.disconnect();
  }, [loadingCircle]);

  return (
    <>
      <main>
        <PiupiuList initialLoading={isLoading} piupius={userPosts} />
      </main>
    </>
  );
};
