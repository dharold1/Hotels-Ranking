import { ICountries } from "@/types/general";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = async (): Promise<string[]> => {
  try {
    const res = await axios.get<ICountries[]>(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    );

    const uniqueCountries = Array.from(
      new Set(res?.data.map((item) => item.country))
    );
    return uniqueCountries;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export function convertImagetoUrl(imageFile: File | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!imageFile) {
      reject(new Error("No image file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
      const dataURL = event?.target?.result;
      if (typeof dataURL === 'string') {
        resolve(dataURL);
      } else {
        reject(new Error("Failed to convert image to data URL"));
      }
    };

    reader.onerror = function(error) {
      reject(new Error("Error reading image: " + error));
    };

    reader.readAsDataURL(imageFile);
  });
}
