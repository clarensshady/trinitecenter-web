import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import * as React from "react";
import { Isel } from "../types/administrateur";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { LoginSchemaWithEmail } from "../validation/administrateur";
import { db } from "../config";
import { BeatLoader } from "react-spinners";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useLotteryStore from "../store/GlobalData";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function AdminForm({ setSelected }: Isel) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isError, setError] = React.useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();
  const { addUser, changeAuthentication, setIsMessage } = useLotteryStore(
    (state) => ({
      addUser: state.addUser,
      changeAuthentication: state.changeAuthentication,
      setIsMessage: state.setIsMessage,
    })
  );

  const ID = React.useId();

  type formData = z.infer<typeof LoginSchemaWithEmail>;

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(LoginSchemaWithEmail),
  });

  const onSubmit = async (data: formData) => {
    try {
      const q = query(
        collection(db, "Administrator"),
        where("Email", "==", data.Email),
        where("MotDePasse", "==", data.Password)
      );
      setLoading(true);
      const administrateur = await getDocs(q);
      setLoading(false);
      if (administrateur.empty) {
        setError(true);
      } else {
        setIsMessage(true);
        administrateur.docs.map((s) => {
          addUser({
            id: s.id,
            Pseudoname: s.data().Pseudoname,
            Prenom: s.data().Prenom,
            NomDeFamille: s.data().NomDeFamille,
            NumeroTelephone: s.data().NumeroTelephone,
            Genre: s.data().Genre,
            DateDeNaissance: s.data().DateDeNaissance,
            Commission: s.data().Commission,
            Pays: s.data().Pays,
            Ville: s.data().Ville,
            Surcussale: s.data().Surcussale,
            AddresseComplete: s.data().AddresseComplete,
            MotDePasse: s.data().MotDePasse,
            Bank: s.data().Bank,
            Role: "Administrateur",
            PhotoUrl: s.data().photoUrl,
          });
          navigate("dashboard");
        });
        changeAuthentication(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      throw new Error(`${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="Email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                isRequired
                label="Address &#233;lectronique"
                name="Email"
                placeholder="Enter address &#233;lectronique"
                onChange={onChange}
                value={value}
                id={`Email_${ID}`}
                type="email"
                isInvalid={error ? true : false}
                errorMessage={error?.message}
              />
            </>
          )}
        />
        <Controller
          name="Password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                isRequired
                label="Mot de passe"
                name="Password"
                placeholder="Entrer votre mot passe"
                type={isVisible ? "text" : "password"}
                onChange={onChange}
                value={value}
                id={`Password_${ID}`}
                isInvalid={error ? true : false}
                errorMessage={error?.message}
                endContent={
                  <button
                    className="focus:outline-none"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </button>
                }
              />
            </>
          )}
        />
        <div className="flex justify-between ">
          <Checkbox defaultSelected size="md">
            se souvenir de moi
          </Checkbox>
          <Link size="sm">Mot de passe oubli&#233;?</Link>
        </div>
        {isError ? (
          <div className="mt-2">
            <span className="text-sm text-red-600">
              addresse electronique ou password est incorrect
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-2 justify-end">
          <Button type="submit" fullWidth color="primary">
            {loading ? (
              <BeatLoader
                color="white"
                loading={loading}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Se connecter as Admin"
            )}
          </Button>
        </div>
        <div className="self-end">
          <p className="text-center text-small">
            êtes-vous un Superviseur ?{" "}
            <Link
              size="sm"
              onPress={() => setSelected("Se connecter as Super")}
            >
              Se connecter as Super
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
