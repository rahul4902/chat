import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export async function apiCall(url, options) {

    try {
        const response = await axios(url, options);
        if (response.data.status === 200) {
            return response.data;
        } else if (response.data.status === 400) {
            toast.error(response.data.message);
            return response.data;
        } else if (response.data.status === 401) {
            toast.error(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        if (error.response.data.status === 422) {
            var errorsObj = {};
            error.response.data.errors.forEach((_v, _x) => {
                errorsObj[_v.title] = _v.value;
            })
            toast.error('Validation Error!!');
            throw errorsObj;

        } else if (error.response.data.status === 400) {
            toast.error(error.response.data.message);
        } else if (error.response.data.status === 401) {
            toast.error(error.response.data.message);
            // navigate('/login');
        } else {
            toast.error('Something  Went Wrong!!');
        } <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>

    }
};

export async function apiCallGet(url, options) {

    try {
        const response = await axios.get(url, options);

        if (response.data.status === 200) {
            return response.data;
        } else if (response.data.status === 400) {
            toast.error(response.data.message);
            return [];
        } else if (response.data.status === 401) {
            toast.error(response.data.message);
        } else {
            toast.error(response.response);
        }
    } catch (error) {
        if (error.response.data.status === 400) {
            toast.error(error.response.data.message);
        } else if (error.response.data.status === 401) {
            toast.error(error.response.data.message);
        } else {
            toast.error('Something  Went Wrong!!');
        }
    }
}