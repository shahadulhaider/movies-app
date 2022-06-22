import axios, { AxiosError } from "axios";
import { ResError } from "types/error";

// Errors
export const getErrorConfig = (error: any | AxiosError): ResError | null => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      name: error.name,
      status: error.response.status,
      message: error.message,
      data: error.response.data,
    } as ResError;
  }
  return null;
};

export const getErrorData = (error: any): ResError => {
  return {
    name: error.name,
    status: error.response.status,
    message: error.message,
    data: error.response.data,
  };
};

export const shuffle = (array: any[]): any[] => {
  let current = array.length;
  let random: number;

  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;

    [array[current], array[random]] = [array[random], array[current]];
  }

  return array;
};

// Slugify
export const slugify = (text: string): string => {
  let str = text.replace(/^\s+|\s+$/g, "").toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return str;
};

// capitalize
export const capSize = (s: string): string => s[0].toUpperCase() + s.slice(1);
