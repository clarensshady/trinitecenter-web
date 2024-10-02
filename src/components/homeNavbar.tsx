import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
  Badge,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Trinite from "../assets/Trinite.png";
import {
  faBarsStaggered,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { UserTwitterCard } from "./userTwitterCard";
import { useNavigate, NavigateFunction } from "react-router-dom";
import useLotteryStore from "../store/GlobalData";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { SideBar } from "./sideBar";

interface Inav {
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

export default function HomeNavbar({ setWidth }: Inav) {
  const [checked, setCheck] = React.useState(true);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const onValueChange = (isSelected: boolean) => {
    setCheck(isSelected);
  };

  React.useEffect(() => {
    if (checked) {
      setWidth(275);
    } else {
      setWidth(120);
    }
  }, [checked]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate: NavigateFunction = useNavigate();
  const {
    changeAuthentication,
    deleteUser,
    userInfo,
    isMessage,
    setIsMessage,
  } = useLotteryStore((state) => ({
    changeAuthentication: state.changeAuthentication,
    deleteUser: state.deleteUser,
    userInfo: state.User,
    isMessage: state.isMessage,
    setIsMessage: state.setIsMessage,
  }));

  React.useEffect(() => {
    if (isMessage) {
      toast.success(`Bienvenue ${userInfo.Pseudoname} 👏`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        type: "success",
      });
      setIsMessage(false);
    }
  }, [isMessage]);

  return (
    <Navbar maxWidth="full" isBordered /* onMenuOpenChange={setIsMenuOpen} */>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand>
        <div className="hidden md:block">
          <Switch
            isSelected={checked}
            size="md"
            color="primary"
            onValueChange={onValueChange}
            startContent={<FontAwesomeIcon icon={faXmark} />}
            endContent={<FontAwesomeIcon icon={faBarsStaggered} />}
          />
        </div>
        <div className="sm:ml-3">
          <img
            src={Trinite}
            style={{ width: 70, height: 70, objectFit: "cover" }}
          />
        </div>
      </NavbarBrand>
      <ToastContainer />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Trinite Center
              </ModalHeader>
              <ModalBody>
                <p>Voulez-vous vraiement Deconnecté</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Annulé
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    deleteUser();
                    changeAuthentication(false);
                    navigate("/");
                    onClose();
                  }}
                >
                  Deconnecté
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <NavbarContent justify="end">
        <NavbarItem onClick={onOpen} className="hidden lg:flex">
          <FontAwesomeIcon className="text-2xl" icon={faRightFromBracket} />
        </NavbarItem>
        <NavbarItem>
          <Badge
            content=""
            color="primary"
            shape="circle"
            placement="bottom-right"
          >
            <Popover showArrow placement="bottom">
              <PopoverTrigger>
                <Avatar
                  // color="primary"
                  isBordered
                  radius="full"
                  src={userInfo.PhotoUrl ?? ""}
                />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <UserTwitterCard />
              </PopoverContent>
            </Popover>
          </Badge>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <SideBar />
      </NavbarMenu>
    </Navbar>
  );
}
