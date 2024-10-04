import * as React from "react";
import {
  ModalContent,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  TimeInput,
  Switch,
  cn,
  Link,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { tirage } from "../statistique/selectData";
import { ClockCircleLinearIcon } from "../../utils/clockCircleIcon";
import {
  Time,
  ZonedDateTime,
  getLocalTimeZone,
  toTime,
  now,
} from "@internationalized/date";

export interface IModalProps {
  TirageId: string;
  onOpen: () => void;
  onOpenChange: () => void;
}

export function ModalComp({}: IModalProps) {
  const { isOpen, onOpenChange } = useDisclosure();

  const time: ZonedDateTime = now(getLocalTimeZone());

  const [timeInterval, setTime] = React.useState<{
    ouverture: Time;
    fermeture: Time;
    boule: string;
  }>({ ouverture: toTime(time), fermeture: toTime(time), boule: "" });

  const [blocked, setBlock] = React.useState<boolean>(false);

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as typeof event.target & {
      value: { value: string };
    };
    setTime({ ...timeInterval, boule: target.value });
  };
  const onChangeOpenTime = (value: Time) => {
    setTime({ ...timeInterval, ouverture: value });
  };
  const onChangeCloseTime = (value: Time) =>
    setTime({ ...timeInterval, fermeture: value });

  const onValueChange = (isSelected: boolean) => {
    setBlock(isSelected);
  };

  const Modifier = () => {
    console.log({
      block: blocked,
      boule: timeInterval.boule,
      ouverture: `${timeInterval.ouverture.hour}:${timeInterval.ouverture.minute}:0${timeInterval.ouverture.second}`,
      fermeture: `${timeInterval.fermeture.hour}:${timeInterval.fermeture.minute}:0${timeInterval.fermeture.second}`,
    });
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Ajouter un Tirage
            </ModalHeader>
            <ModalBody>
              <div className="flex-1">
                <Select
                  label="Tirage"
                  placeholder=""
                  defaultSelectedKeys={["tout"]}
                  className="w-xs"
                  onChange={onChangeSelect}
                >
                  {tirage.map((s) => (
                    <SelectItem key={s.key}>{s.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex gap-3 mt-4">
                <TimeInput
                  hourCycle={24}
                  label="Ouveture"
                  granularity="second"
                  onChange={onChangeOpenTime}
                  defaultValue={new Time(time.hour, time.minute, time.second)}
                  endContent={
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <TimeInput
                  hourCycle={24}
                  granularity="second"
                  label="Fermeture"
                  onChange={onChangeCloseTime}
                  defaultValue={new Time(time.hour, time.minute, time.second)}
                  endContent={
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
              <div className="flex py-2 px-1 justify-between">
                <Switch
                  color="success"
                  defaultSelected={blocked}
                  onValueChange={onValueChange}
                  classNames={{
                    /* base: cn(
                          "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-primary"
                        ), */
                    wrapper: "p-0 h-4 overflow-visible",
                    thumb: cn(
                      "w-6 h-6 border-2 shadow-lg",
                      "group-data-[hover=true]:border-success",
                      //selected
                      "group-data-[selected=true]:ml-6",
                      // pressed
                      "group-data-[pressed=true]:w-7",
                      "group-data-[selected]:group-data-[pressed]:ml-4"
                    ),
                  }}
                >
                  <span>Block</span>
                </Switch>
                <Link color="primary" href="#" size="sm">
                  Liste des tirages
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={Modifier}>
                Ajouter
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
