"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { HotelProps, ICountries } from "@/types/general";
import { convertImagetoUrl, fetchCountries } from "@/store/actions";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Button from "@/components/ui/button";
import BasicSelect from "./create/select";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateData } from "@/store/slices/generalSlice";
import CategoryForm from "./categoryForm";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

enum ModalType {
  Manage,
  Create,
  Edit,
}
function HotelForm({ hotelData }: { hotelData?: HotelProps }) {
  const [countries, setCountries] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<ModalType | null>(null);
  const [edit, setEdit] = useState({ show: false, category: "" });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryIndex(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategoryIndex(null);
  };
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.general);
  const formikRef = useRef<FormikProps<HotelProps>>(null);
  const router = useRouter();

  const handleCloseManageModal = () => {
    setEdit({ show: false, category: "" }), handleCloseModal();
  };
  useEffect(() => {
    const getCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (!hotelData?.uuid) {
      const randomUuid = generateUniqueId();
      formikRef?.current?.setFieldValue("uuid", randomUuid);
    }
  }, [hotelData?.uuid]);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  const handleSubmit = async (values: HotelProps) => {
    try {
      const existingHotelsJSON = localStorage.getItem("hotels");
      let existingHotels: HotelProps[] = existingHotelsJSON
        ? JSON.parse(existingHotelsJSON)
        : [];

      const existingHotelIndex = existingHotels.findIndex(
        (hotel) => hotel.uuid === values.uuid
      );

      if (existingHotelIndex !== -1) {
        // If an existing hotel is found, update it
        existingHotels[existingHotelIndex] = values;
      } else {
        // Else, add the new hotel to the list
        const { imageFile, ...hotelWithoutImageFile } = values;
        existingHotels = [...existingHotels, hotelWithoutImageFile];
      }
      localStorage.setItem("hotels", JSON.stringify(existingHotels));

      // Reset form
      formikRef.current?.resetForm();

      toast.success(`Hotel saved successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(updateData());
      router.push("/");
    } catch (error) {
      toast.error(`Error saving hotel`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error saving hotel:", error);
    }
  };
  const handleDeleteCategory = (categoryToDelete: string) => {
    console.log(categoryToDelete);
    const existingCategoriesJSON = localStorage.getItem("categories");
    let existingCategories: { title: string }[] = [];

    if (existingCategoriesJSON) {
      existingCategories = JSON.parse(existingCategoriesJSON);
    }

    const selectedCategoryToDelete = existingCategories?.findIndex(
      (category) => category.title === categoryToDelete
    );

    if (selectedCategoryToDelete !== -1) {
      existingCategories.splice(selectedCategoryToDelete, 1);
      localStorage.setItem("categories", JSON.stringify(existingCategories));
      toast.success(`Category deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(updateData());
    } else {
      toast.error(`Category not found!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCloseModal = () => {
    setShowModal(null);
  };
  const initialValues: HotelProps = {
    title: hotelData?.title ?? "",
    country: hotelData?.country ?? "",
    address: hotelData?.address ?? "",
    image: hotelData?.image ?? "",
    category: hotelData?.category ?? "",
    uuid: hotelData?.uuid ?? "",
    imageFile: undefined,
  };
  const schema = Yup.object({
    title: Yup.string().required("Enter a title"),
    country: Yup.string().required("Select a country"),
    address: Yup.string().required("Enter an address"),
    image: Yup.mixed().required("Select an image"),
    category: Yup.string().required("Select a category"),
    uuid: Yup.string(),
  });
  return (
    <>
      {" "}
      <Card sx={{ minWidth: 275 }} className="max-w-2xl w-full">
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              dirty,
              values,
              setValues,
            }: FormikProps<HotelProps>) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
                <div className="flex justify-center flex-col items-center w-full">
                  <label
                    htmlFor="image"
                    className="border border-dashed w-full rounded-md gap-4 h-20 flex justify-center items-center"
                  >
                    <FaCloudUploadAlt color="#14274A" size={26} />
                    <p className="text-lg font-bold text-primary">
                      Select Image
                    </p>
                    <input
                      hidden
                      onChange={async (e) => {
                        const imgUrl = await convertImagetoUrl(
                          e?.target?.files?.[0]
                        );
                        setValues({
                          ...values,
                          image: imgUrl,
                          imageFile: e?.target?.files?.[0],
                        });
                      }}
                      type="file"
                      name="image"
                      id="image"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </label>
                  {values.image && (
                    <div className="relative rounded-lg overflow-hidden h-52 w-52 mt-5">
                      <Image fill src={values.image} alt={values.title} />
                    </div>
                  )}
                </div>
                <TextField
                  required
                  error={touched.title && !!errors.title}
                  id="outlined-required"
                  label="Name"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Enter hotel name"
                />
                <Autocomplete
                  disablePortal
                  value={values.country}
                  id="combo-box-demo"
                  options={countries}
                  onChange={(event: any, newValue: string | null) => {
                    setValues({
                      ...values,
                      country: newValue ?? "",
                    });
                  }}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />

                <TextField
                  error={touched.address && !!errors.address}
                  name="address"
                  required
                  id="outlined-required"
                  label="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Enter hotel address"
                />
                <FormControl error={touched.category && !!errors.category}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Category"
                  >
                    {categories.length > 0 &&
                      categories.map(
                        (category, i) =>
                          category.title !== "All Categories" && (
                            <MenuItem
                              key={`category${i}`}
                              value={category.title}
                            >
                              {category.title}
                            </MenuItem>
                          )
                      )}
                  </Select>
                  <div className="flex w-full justify-end gap-5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(ModalType.Manage);
                      }}
                      className="underline text-primary font-bold"
                    >
                      manage categories
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(ModalType.Create);
                      }}
                      type="button"
                      className="underline text-secondary font-bold"
                    >
                      + create new category
                    </button>
                  </div>
                </FormControl>
                <Button type="submit">Submit</Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Modal
        open={showModal === ModalType.Create}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-[10%] left-0 right-0   ">
          <div className="flex justify-center items-center">
            <div className="space-y-5 relative bg-white sm:w-[500px] shadow-md rounded-lg px-4 py-2 flex flex-col justify-center items-center">
              <button
                onClick={handleCloseModal}
                className="absolute bg-transparent right-3 top-5 cursor-pointer"
              >
                <IoCloseSharp size={25} />
              </button>
              <h3 className="text-secondary text-2xl font-extrabold">
                Create <span className="text-primary font-bold">category</span>
              </h3>
              <CategoryForm handleClose={handleCloseModal} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={showModal === ModalType.Manage}
        onClose={handleCloseManageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-[10%] left-0 right-0   ">
          <div className="flex justify-center items-center">
            {edit.show ? (
              <div className="space-y-5 relative bg-white sm:w-[500px] shadow-md rounded-lg px-4 py-2 flex flex-col justify-center items-center">
                <button
                  onClick={handleCloseManageModal}
                  className="absolute bg-transparent right-3 top-5 cursor-pointer"
                >
                  <IoCloseSharp size={25} />
                </button>
                <h3 className="text-secondary text-2xl font-extrabold">
                  Update{" "}
                  <span className="text-primary font-bold">category</span>
                </h3>
                <CategoryForm
                  exisitingCategory={edit.category}
                  handleClose={handleCloseManageModal}
                />
              </div>
            ) : (
              <div className="space-y-5 relative bg-white sm:w-[500px] shadow-md rounded-lg px-4 py-2 flex flex-col justify-center items-center">
                <button
                  onClick={handleCloseModal}
                  className="absolute bg-transparent right-3 top-5 cursor-pointer"
                >
                  <IoCloseSharp size={25} />
                </button>
                <h3 className="text-secondary text-2xl font-extrabold">
                  Manage{" "}
                  <span className="text-primary font-bold">category</span>
                </h3>
                <ul className="list-disc w-full">
                  {categories.map((category, i) => (
                    <li
                      className="flex justify-between hover:bg-gray-200 px-4 rounded-md py-2 "
                      key={category.title}
                    >
                      <p className="font-medium">{category.title} </p>
                      <Button
                        className="bg-transparent hover:bg-gray-300"
                        id={`basic-button-${i}`}
                        aria-controls={open ? `basic-menu-${i}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={
                          open && selectedCategoryIndex === i
                            ? "true"
                            : undefined
                        }
                        onClick={(event) => handleClick(event, i)}
                      >
                        <FaEllipsisVertical color="#14274A" />
                      </Button>
                      <Menu
                        id={`basic-menu-${i}`}
                        anchorEl={anchorEl}
                        open={open && selectedCategoryIndex === i}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${i}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setEdit({ show: true, category: category.title });
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDeleteCategory(category.title);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HotelForm;
