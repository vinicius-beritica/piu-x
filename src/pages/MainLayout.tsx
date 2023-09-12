import { SideBar } from "../components/SideBar";
import { SideCard } from "../components/Sidecard";
import Button from "../components/Button";
import { SideList } from "../components/SideList";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { User } from "../types/Users";
import { apiPiu } from "../service/api";
import { useQuery } from "@tanstack/react-query";

export const MainLayout = () => {
  const userContext = useContext(AuthContext);
  const [userSideList, setUserSideList] = useState<User[] | undefined>([]);

  useEffect(() => {
    let dataUser = null;
    const dataLocalStorage = localStorage.getItem("user");
    if (dataLocalStorage !== null) {
      dataUser = JSON.parse(dataLocalStorage);
      userContext.setHandle(dataUser.handle);
      userContext.setName(dataUser.name);
      userContext.setImageUrl(dataUser.image_url);
      userContext.setVerified(dataUser.verified);
    }
  }, []);

  const { data, isLoading } = useQuery(
    ["repoData"],
    () =>
      apiPiu.get("users/latest").then((newResponse) => {
        setUserSideList(newResponse.data);
        return newResponse.data;
      }),
    {
      refetchInterval: 300000,
      staleTime: 299000,
    }
  );

  return (
    <>
      <SideBar />
      <div className="flex px-2 flex-col w-[100vw] ws:w-[min(566px,65vw)]">
        <Outlet />
      </div>
      <div className="ml-4 mt-12 w-72 sticky top-12 lg:w-96 h-min rounded-md hidden ws:block">
        <SideCard>
          <h1 className="text-xl font-bold mb-3">Assine o Premium</h1>
          <p className="mb-2">
            Pague por uma bolinha colorida e me deixe rico.
          </p>
          <div className="w-min">
            <Button thickness="thin" variant="secondary">
              Assinar
            </Button>
          </div>
        </SideCard>
        <SideList loading={isLoading} users={userSideList} />
      </div>
    </>
  );
};
