"use client";
import Button from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { updateData } from "@/store/slices/generalSlice";
import { TextField } from "@mui/material";
import React, { useState } from "react";

function CategoryForm({
  handleClose,
  exisitingCategory,
}: {
  handleClose: () => void;
  exisitingCategory?: string;
}) {
  const [categoryName, setCategoryName] = useState(exisitingCategory ?? "");
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (newCategory: string) => {
    if (newCategory === "") {
      setShowError(true);
      return;
    }
    setShowError(false);
    const existingCategoriesJSON = localStorage.getItem("categories");
    let existingCategories: { title: string }[] = [];

    if (existingCategoriesJSON) {
      existingCategories = JSON.parse(existingCategoriesJSON);
    }

    const existingCategoryIndex = existingCategories?.findIndex(
      (category) => category.title === exisitingCategory
    );

    if (existingCategoryIndex !== -1) {
      existingCategories[existingCategoryIndex] = { title: categoryName };
    } else {
      existingCategories = [
        ...existingCategories,
        { title: newCategory.trim() },
      ];
    }

    localStorage.setItem("categories", JSON.stringify(existingCategories));
    dispatch(updateData());
    handleClose();
  };
  return (
    <div className="space-y-4 flex flex-col ">
      <TextField
        required
        error={showError}
        id="outlined-required"
        label="Category title"
        name="title"
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
        value={categoryName}
        placeholder="Enter category title"
      />
      <Button onClick={() => handleSubmit(categoryName)} type="submit">
        Submit
      </Button>
    </div>
  );
}

export default CategoryForm;
