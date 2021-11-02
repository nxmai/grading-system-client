import axios from "axios";

export const baseURL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const apiURL = `${baseURL}`;

export const get = function (url: string) {
  return new Promise<{ data: any }>((resolve, reject) =>
    axios
      .get(url)
      .then((res) => {
        // return data
        return resolve({ data: res.data });
      })
      .catch((err) => {
        // return err message
        if (!err.response) return reject(err.message);
        return reject(err.response.data.message);
      })
  );
};

export const post = function (url: string, data: any) {
  return new Promise<{ data: any }>((resolve, reject) =>
    axios
      .post(url, data)
      .then((res) => {
        // return data
        return resolve({ data: res.data });
      })
      .catch((err) => {
        // return err message
        if (!err.response) return reject(err.message);
        return reject(err.response.data.message);
      })
  );
};
