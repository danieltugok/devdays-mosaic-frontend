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
  async getAll() {
    try {
      Loading.show();
      const { data } = await $axios.get('v2/');
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      if (notifyMe) notify('negative', 'Erro', 'ME');
      return error;
    } finally {
      Loading.hide();
    }
  },

  async getImages() {
    try {
      Loading.show();
      const { data } = await $axios.get('/admin/images/1');
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      if (notifyMe) notify('negative', 'Erro', 'ME');
      return error;
    } finally {
      Loading.hide();
    }
  },

  async me(notifyMe = false) {
    try {
      Loading.show();
      const { data, status } = await $axios.get('accounts/me');
      if (status === 200) return { data, status };
    } catch (error) {
      console.log('ERROR: ', error);
      if (notifyMe) notify('negative', 'Erro', 'ME');
      return error;
    } finally {
      Loading.hide();
    }
  },
  async getEvents() {
    try {
      Loading.show();
      const { data } = await $axios.get('admin/mosaic');
      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      if (notifyMe) notify('negative', 'Erro', 'ME');
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
      if (notifyMe) notify('negative', 'Erro', 'ME');
      return error;
    } finally {
      Loading.hide();
    }
  },

  async me(notifyMe = false) {
    try {
      Loading.show();
      const { data, status } = await $axios.get('accounts/me');
      if (status === 200) return { data, status };
    } catch (error) {
      console.log('ERROR: ', error);
      if (notifyMe) notify('negative', 'Erro', 'ME');
      return error;
    } finally {
      Loading.hide();
    }
  },
};
