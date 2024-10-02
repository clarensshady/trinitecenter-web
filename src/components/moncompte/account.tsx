import * as React from "react";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  Textarea,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import uploadFile from "../../utils/upload";
import { IUpload } from "../../types/profile";
import { IAccount } from "../../types/myAccount";
import { paysdata } from "../newAgent/paysData";
import useLotteryStore from "../../store/GlobalData";
import { db, storage } from "../../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "nanoid";
import { doc, updateDoc } from "firebase/firestore";
import { BeatLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";

export interface IPrimeTirageCompProps {}

export function AccountComp() {
  const [image, setImage] = React.useState<File | undefined>();

  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isValid, setValid] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IAccount>({} as IAccount);
  const [active, setActive] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isFInish, setFinish] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { userInfo, updateUser, updatePhoto } = useLotteryStore((state) => ({
    updateUser: state.UpdateUser,
    userInfo: state.User,
    updatePhoto: state.updatePhoto,
  }));

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validity = e.target.validity;
    const selectedFile = e.target.files as FileList;

    if (validity && validity.valid) {
      const FileData = uploadFile({
        FileInfo: { file: selectedFile, valid: validity.valid },
      }) satisfies IUpload;

      setValid(Boolean(FileData?.valid));
      setImage(FileData?.ImageInfo?.singleFile);
      setPreviewImage(`${FileData?.ImageInfo?.previewImage}`);
    }
  };

  // create a reference to a reference to cloud storage service
  const storageRef = ref(storage);

  // reference the bucket
  const userRef = ref(storageRef, `users/${image?.name + nanoid()}`);
  // administrator reference
  const adminRef = doc(db, "Administrator", `${userInfo.id}`);
  // superviseur reference
  const superRef = doc(db, "superviseur", `${userInfo.id}`);

  const uploadUserImage = async () => {
    try {
      if (image) {
        setLoading(true);
        const file = await uploadBytes(userRef, image);

        const url = await getDownloadURL(file.ref);
        if (userInfo.Role == "Administrateur") {
          await updateDoc(adminRef, {
            photoUrl: `${url}`,
          });
        }
        if (userInfo.Role == "Superviseur") {
          await updateDoc(superRef, {
            photoUrl: `${url}`,
          });
        }
        setLoading(false);
        updatePhoto(`${url}`);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      throw new Error(`${error}`);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onValueChange = (isSelected: boolean) => {
    setActive(isSelected);
  };

  const updateUserInfo = async () => {
    try {
      setFinish(true);
      if (userInfo.Role == "Superviseur") {
        await updateDoc(superRef, {
          ...data,
        });
        updateUser(data);
        setFinish(false);
      } else {
        await updateDoc(adminRef, {
          ...data,
        });
        updateUser(data);
        setFinish(false);
        setMessage(true);
      }
    } catch (error) {
      setFinish(false);
      throw new Error(`${error}`);
    }
  };

  React.useEffect(() => {
    onClose();
    if (message) {
      toast.success("La modification a bien ete faites", {
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
      setMessage(false);
    }
  }, [message]);

  return (
    <div className="flex-1 w-full flex-col">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-bold">Mon Compte</span>
        </div>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href="/docs/components/button">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/docs/components/breadcrumbs">
              Paramètres du compte
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <ToastContainer />
      <div className="mt-10 w-full sm:w-[590px]">
        <Card className="">
          <CardBody>
            <div className="flex-1 px-3 py-4 w-full">
              <div className="flex w-full flex-col items-center gap-5 justify-center mt-10 mb-16">
                <Badge
                  isOneChar
                  content={
                    <Button
                      isIconOnly
                      color="danger"
                      size="sm"
                      onPress={onOpen}
                      className="rounded-full "
                      aria-label="Like"
                    >
                      <FontAwesomeIcon
                        className="text-[1rem]"
                        icon={faCamera}
                      />
                    </Button>
                  }
                  color="danger"
                  shape="circle"
                  placement="bottom-right"
                >
                  <Avatar
                    isBordered
                    radius="full"
                    className="w-[130px] h-[130px] text-large"
                    src={userInfo.PhotoUrl}
                  />
                </Badge>
                {/* for modal */}
                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="top-center"
                  scrollBehavior="inside"
                  size="xl"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Changer Photo
                        </ModalHeader>
                        <ModalBody>
                          {!isValid && (
                            <div className="flex justify-center w-full border-solid border-1 border-slate-100">
                              <div className=" py-24 flex-col items-center justify-center gap-3">
                                <input
                                  type="file"
                                  id="input-file"
                                  onChange={upload}
                                  style={{ display: "none" }}
                                />
                                <label
                                  onClick={() => console.log("upload")}
                                  htmlFor="input-file"
                                  className="self-center pl-5"
                                >
                                  <FontAwesomeIcon
                                    className="text-[4.6rem] text-slate-300"
                                    icon={faImage}
                                  />
                                </label>
                                <div>
                                  <span className="text-slate-400 text-sm">
                                    Upload your Image
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {isValid && (
                            <div className="relative">
                              <div className="z-20 absolute group text-red-500 top-0 left-0 w-full  h-full bg-red-500]">
                                <div className=" hover:rounded-2xl hidden group-hover:flex justify-center items-center  transition-all hover:bg-black/hover h-full w-full">
                                  <div>
                                    <input
                                      type="file"
                                      id="after-input-file"
                                      onChange={upload}
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      onClick={() => console.log("upload")}
                                      htmlFor="after-input-file"
                                      className="py-28"
                                    >
                                      <FontAwesomeIcon
                                        className="text-[4.6rem] text-slate-300"
                                        icon={faCamera}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <Image
                                className="w-full h-full z-10"
                                src={previewImage}
                              />
                            </div>
                          )}
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="primary"
                            onPress={() => {
                              uploadUserImage();
                            }}
                          >
                            {loading ? (
                              <BeatLoader
                                color="white"
                                loading={loading}
                                size={16}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              "Upload"
                            )}
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                <div className="w-1/3 text-center">
                  <span className="text-slate-400 text-sm">
                    Allowed *.jpeg, *.jpg, *.png max size of 3.1 MB
                  </span>
                </div>
              </div>
              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="NomEntreprise"
                      onChange={onChange}
                      value={data.NomEntreprise}
                      type="text"
                      label="Nom de L'entreprise"
                      defaultValue="Trinite Center"
                      isDisabled
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      name="Pseudoname"
                      onChange={onChange}
                      value={data.Pseudoname}
                      type="text"
                      label="Pseudoname"
                      placeholder="Entrer le Pseudoname"
                      defaultValue={`${userInfo.Pseudoname}`}
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      type="text"
                      name="Prenom"
                      onChange={onChange}
                      value={data.Prenom}
                      label="Prénom"
                      placeholder="Entrer Prenom"
                      defaultValue={`${userInfo.Prenom}`}
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      type="text"
                      name="NomDeFamille"
                      onChange={onChange}
                      value={data.NomDeFamille}
                      label="Nom de Famille"
                      defaultValue={`${userInfo.NomDeFamille}`}
                      placeholder="Entrer votre nom de Famille"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="NumeroTelephone"
                      onChange={onChange}
                      value={data.NumeroTelephone}
                      type="text"
                      label="Numéro de Téléphone"
                      placeholder="Entrer le Numéro de Téléphone"
                      defaultValue={`${userInfo.NumeroTelephone}`}
                      className="w-xs"
                    />
                    <Select
                      label="Pays"
                      name="Pays"
                      value={data.Pays}
                      onChange={onChange}
                      placeholder="Selectioner un pays"
                      defaultSelectedKeys={[`${userInfo.Pays.toLowerCase()}`]}
                      className="max-w-xs"
                    >
                      {paysdata.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      name="Ville"
                      onChange={onChange}
                      value={data.Ville}
                      type="text"
                      label="Ville"
                      placeholder="Entrer la Ville"
                      defaultValue={userInfo.Ville}
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      type="text"
                      name="AddresseComplete"
                      onChange={onChange}
                      value={data.AddresseComplete}
                      label="Addresse complète"
                      placeholder="Entrer l'addresse complète"
                      defaultValue={`${userInfo.AddresseComplete}`}
                      className="w-xs"
                    />
                  </div>
                  <div className="flex-1">
                    <Textarea
                      isRequired
                      name="Description"
                      onChange={onChange}
                      value={data.Description}
                      label="Description"
                      placeholder="Entrer votre description"
                      defaultValue="Moun ki gen fich se li ki touche, apre 90 jou fich sila pa valid anko."
                      className="min-w-xs"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      isRequired
                      value={data.MinutePourSuprimer}
                      onChange={onChange}
                      type="text"
                      label="Minute Pour surprimer un fiche"
                      defaultValue="15"
                      placeholder="Entrer combien Minute"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isRequired
                      type="text"
                      isDisabled={active}
                      disabled={active}
                      name="MariageValeur"
                      onChange={onChange}
                      value={data.MariageValeur}
                      label="Mariage Valeur"
                      placeholder="Entrer Valeur"
                      defaultValue="100"
                      className="w-xs"
                    />
                    <Input
                      isRequired
                      isDisabled={active}
                      type="text"
                      name="MariageQuantite"
                      onChange={onChange}
                      value={data.MariageQuantite}
                      label="Mariage Quantité"
                      placeholder="Entrer Quantité"
                      defaultValue="2"
                      className="w-xs"
                    />
                  </div>
                  <div className="flex justify-start">
                    <Switch
                      color="success"
                      checked={active}
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
                      <span>Mariage Gratuit</span>
                    </Switch>
                  </div>
                  <div className="self-end">
                    <Button
                      variant="shadow"
                      className="text-sm font-semibold"
                      color="primary"
                      onClick={updateUserInfo}
                      isDisabled={userInfo.Role == "Superviseur" ? true : false}
                    >
                      {isFInish ? (
                        <BeatLoader
                          color="white"
                          loading={isFInish}
                          size={16}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Sauvegarder les modifications"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
