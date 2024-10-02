import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import useLotteryStore from "../store/GlobalData";

export const UserTwitterCard = () => {
  const navigate: NavigateFunction = useNavigate();
  const { userInfo } = useLotteryStore((state) => ({ userInfo: state.User }));

  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={userInfo.PhotoUrl ?? ""}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userInfo.Pseudoname}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              @{userInfo.Pseudoname}
            </h5>
          </div>
        </div>
        <div className="pl-2">
          <Button
            color="primary"
            radius="full"
            size="sm"
            variant="solid"
            onPress={() => navigate("user/account")}
          >
            Profile
          </Button>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          #{userInfo.Role}, @Trinite Center
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">@@</p>
          <p className=" text-default-500 text-small">{userInfo.Ville}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">##</p>
          <p className="text-default-500 text-small">{userInfo.Pays}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
