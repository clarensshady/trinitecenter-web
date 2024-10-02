import { Input } from "@nextui-org/react";
import { SearchIcon } from "../searchIcon";

export default function SearchInputSuper(props: any) {
  return (
    <div>
      <Input
        label="Rechercher"
        isClearable
        radius="lg"
        {...props}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "bg-default-200/50",
            "w-[160px]",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/90",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "group-data-[focus=true]:shadow-xl",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>
  );
}
