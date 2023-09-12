import { useState } from "react";
import { User } from "../../types/Users";
import { Popover } from "../Popover";
import { ProfilePic } from "../ProfilePic";
import { Username } from "../Username";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

type SessionControllerProps = {
  user: User;
  options: {
    text: string;
    onClick: () => void;
  }[];
};
export const SessionController = ({ options }: SessionControllerProps) => {
  const [isActive, setIsActive] = useState(false);
  const userData = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`relative hidden xl:flex gap-4 cursor-pointer p-3 rounded-full ${
        isActive ? "" : "hover:bg-zinc-900"
      } items-center`}
    >
      <Popover onChange={setIsActive} open={isActive}>
        {options.map((item) => (
          <span
            className="py-2 px-4 hover:bg-zinc-900 flex justify-start"
            key={item.text}
            onClick={handleLogout}
          >
            {item.text}
          </span>
        ))}
      </Popover>

      <ProfilePic image={userData.image_url} userName={userData.name} />
      <Username
        showVerified={false}
        clickable={false}
        variant="column"
        user={userData}
      />
      <span className="text-2xl ml-auto self-start ">...</span>
    </button>
  );
};

export default SessionController;
