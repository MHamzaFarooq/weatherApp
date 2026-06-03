import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: (mapType: string) => void;
};

const mapTypes = [
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
  "clouds_new",
];

function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full sm:w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {mapTypes.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type.split("_")[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default MapTypeDropdown;
