export interface HotelProps {
  title: string;
  country: string;
  address: string;
  image: string;
  imageFile?: File | undefined;
  category: string;
  uuid: string;
}

export interface ICountries {
  country: string;
}
