// import axios, {AxiosInstance} from "axios";
import axios from 'axios';
import { Loading } from 'quasar';

// import UseNotify from '../composables/UseNotify';
// const {notify} = UseNotify();

// const $q = useQuasar();

export const $axios = axios.create({
  baseURL: `http://localhost:3000`,
});

// $axios.interceptors.request.use(
//   (request) => {
//     return request;
//   },
//   (error) => Promise.reject(error)
// );
// $axios.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

export default {
  async ping() {
    try {
      Loading.show();
      const { data } = await $axios.get('');
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    } finally {
      Loading.hide();
    }
  },
  async getImages(event_id) {
    try {
      Loading.show();
      const { data } = await $axios.get(`/admin/mosaic/${event_id}`);
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    } finally {
      Loading.hide();
    }
  },
  async getEvents() {
    try {
      Loading.show();
      const { data } = await $axios.get('admin/mosaics');
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    } finally {
      Loading.hide();
    }
  },
  async createEvent(eventName) {
    try {
      Loading.show();
      let params = {
        event_name: eventName,
      };
      const { data } = await $axios.post('/admin/mosaic', params);
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    } finally {
      Loading.hide();
    }
  },
};
