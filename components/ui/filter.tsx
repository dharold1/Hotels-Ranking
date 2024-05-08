import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilterOption } from "@/store/slices/generalSlice";

interface FilterProps {
  options: { title: string }[];
  defaultOption: string;
}
export default function Filter({ options, defaultOption }: FilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { categories, filterOption } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (title: string) => {
    dispatch(setFilterOption(title));
    setAnchorEl(null);
  };
  React.useEffect(() => {
    dispatch(setFilterOption(defaultOption));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, []);
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        className="text-primary font-bold !border border-primary border-solid"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {filterOption}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSelect}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options?.length > 0 &&
          options?.map((option, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                handleSelect(option.title);
              }}
            >
              {option.title}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
