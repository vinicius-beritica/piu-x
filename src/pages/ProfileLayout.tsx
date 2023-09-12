import { useState, useContext, useEffect } from "react";
import { NavHeader } from "../components/NavHeader";
import NavTitle from "../components/NavTitle";
import ProfilePic from "../components/ProfilePic";
import { Username } from "../components/Username";
import { User } from "../types/Users";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { Dialog } from "../components/Dialog";
import { routes } from "../routes";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { apiPiu } from "../service/api";

export const ProfileLayout = () => {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<number>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const userContext = useContext(AuthContext);
  const { handle } = useParams();
  const navPage = useNavigate();

  const {
    isLoading,
    isError,
    data: userData,
    refetch,
  } = useQuery(["fetchData"], () =>
    apiPiu
      .get(`users/${handle}`)
      .then((res) => {
        // setDialogOpen(false);
        return res.data;
      })
      .catch((error) => {
        console.error(`Erro na requisição: ${error}`);
      })
  );

  if (isLoading) {
    console.log(`Retorno do isLoading`);
  }
  if (isError) {
    navPage(routes.home);
  }

  const handleProfile = (dataProfile: Partial<User>) => {
    apiPiu.patch(`users/${handle}`, dataProfile);
    setDialogOpen(false);
    refetch();
  };

  const handleDialogClick = () => {
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {
    setUser(userData);
    refetch();
    setDialogOpen(false);
    routes.profile(userData?.user.handle);
  }, [handle, userData]);

  return (
    <>
      <NavHeader
        title={userData?.user.name || ""}
        subtitle={`${userData?.posts || 0} piadas`}
      />
      <NavTitle
        position="relative"
        navOptions={[
          { title: "Perfil", path: routes.profile(handle) },
          { title: "Curtidas", path: routes.userLikes(handle) },
        ]}
      >
        <section className="h-48 w-full bg-zinc-700" />
        <section className="relative mb-2 select-none px-3 w-full">
          <div className="min-h-[5rem] flex justify-end w-full">
            <div className="absolute -top-16 left-4 ">
              <ProfilePic
                border
                variant="reallyBig"
                userName={userData?.user.name || ""}
                image={userData?.user.image_url}
              />
            </div>
            {userData?.user.handle === userContext.handle && (
              <div
                onClick={handleDialogClick}
                className="absolute cursor-pointer rounded-full bg-zinc-950 hover:bg-zinc-900 p-6 right-4 top-4"
              >
                <BsFillPencilFill />
              </div>
            )}
          </div>
          <div>
            <Username size="xl" variant="column" user={userData?.user} />
            <p className="text-white mt-3 text-sm">
              {userData?.user.description}
            </p>
          </div>
        </section>
      </NavTitle>
      <Outlet />
      <Dialog
        onClose={() => {
          setDialogOpen(false);
        }}
        open={dialogOpen}
      >
        {userData?.user && (
          <ProfileEditForm onSubmit={handleProfile} user={userData?.user} />
        )}
      </Dialog>
    </>
  );
};
