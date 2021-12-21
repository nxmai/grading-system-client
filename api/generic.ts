import axios from "axios";

export const baseURL = 
    process.env.NEXT_PUBLIC_SERVER_URL1 || "http://localhost:5000";

export const apiURL = `${baseURL}`;

export const config = function (token: string) {
    return {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
};

export const get = function (url: string, token: string) {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .get(url, config(token))
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

export const post = function (url: string, data: any, token: string = "") {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .post(url, data, config(token))
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

export const put = function (url: string, data: any, token: string = "") {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .put(url, data, config(token))
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

export const patch = function (url: string, data: any, token: string = "") {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .patch(url, data, config(token))
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

export const del = function (url: string, token: string = "") {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .delete(url, config(token))
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

export const postWithFile = function (url: string, data: FormData, token: string = "") {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .post(url, data, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
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

export const downloadFile = function (url: string, token: string = "") {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .get(url, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob'
            })
            .then(blob => resolve(blob))
            .catch((err) => {
                // return err message
                if (!err.response) return reject(err.message);
                return reject(err.response.data.message);
            })
    );
}