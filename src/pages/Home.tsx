import { useEffect, useRef, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { PiupiuList } from "../components/PiupiuList";
import { usePagination } from "../hooks/useScroll";
import { piuComponentHeight } from "../consts";
import { User } from "../types/Users";
import { routes } from "../routes";
import { apiPiu } from "../service/api";
import { useQueryHome } from "../hooks/useQueryHome";

export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const [piupius, setPiupius] = useState<Piu[] | undefined>([]);
  const [newData, setNewData] = useState<Piu[] | undefined>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = Math.ceil(window.screen.height / piuComponentHeight);
  const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
    useQueryHome();

  useEffect(() => {
    const dataPius = data?.pages && data.pages.flatMap((page) => page.data);
    if (
      dataPius &&
      dataPius.length > 0 &&
      piupius &&
      piupius.length > 0 &&
      dataPius[0].id != piupius[0].id
    ) {
      setNewData(dataPius);
    }
    setPiupius(dataPius);
  }, [data]);

  const { scrollTop } = usePagination({
    onBottomEnter: () => {
      hasNextPage && fetchNextPage();
    },
    onTopEnter: () => {
      setNewData([]);
    },
    onTopLeave: () => {},
    bottomRef,
    topRef,
    refreshVariable: piupius,
  });

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();
    setAddingPiupiu(true);
    try {
      await apiPiu
        .post(`posts`, {
          message: formValue,
        })
        .then((response) => {
          if (response.status === 200) {
            refetch();
            setTextValue("");
          }
        })
        .finally(() => setAddingPiupiu(false));
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <>
      <div ref={topRef} className="relative">
        <NavTitle
          position="sticky"
          navOptions={[
            { title: "Para você", path: routes.home },
            { title: "Perseguindo", path: routes.following },
          ]}
          refreshButton={{
            newPosts: newData,
            onClick: () => {
              scrollTop();
            },
          }}
        >
          <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
        </NavTitle>
        <NewPiupiu
          loading={addingPiupiu}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onSubmit={handleSubmit}
          user={{} as User}
        />
        <PiupiuList
          initialLoading={isLoading}
          topRef={topRef}
          bottomRef={bottomRef}
          loading={true}
          piupius={piupius}
          onChange={() => {}}
        />
      </div>
    </>
  );
};
