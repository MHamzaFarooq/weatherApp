import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  location: string;
  setLocation: (location: string) => void;
};

const Locations = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Los Angeles",
  "Chicago",
  "Toronto",
  "Johannesburg",
  "Karachi",
  "Islamabad",
  "Lahore",
  "Melbourne",
];

function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full sm:w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {location === "custom" && (
            <SelectItem value="custom">Custom</SelectItem>
          )}

          {Locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LocationDropdown;
