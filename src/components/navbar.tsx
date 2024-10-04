import * as React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarBrand,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Trinite from "../assets/Trinite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";

export interface INavbarProps {}

export function NavbarScreen() {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["Who"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace("_", " "),
    [selectedKeys]
  );

  return (
    <div>
      <Navbar maxWidth="full" isBordered>
        <NavbarBrand>
          <img
            src={Trinite}
            style={{ width: 65, height: 65, objectFit: "cover" }}
          />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Se connecter</Link>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  {selectedValue === "Who" ? `Qui êtres vous?` : selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with icons"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                <DropdownItem
                  key="Administrateur"
                  startContent={<FontAwesomeIcon icon={faUserGear} />}
                >
                  Administrateur
                </DropdownItem>
                <DropdownItem
                  key="Utilisateur"
                  startContent={<FontAwesomeIcon icon={faUser} />}
                >
                  Superviseur
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <Button as={Link} color="primary" href="#" variant="flat">
              Who are you?
            </Button> */}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
