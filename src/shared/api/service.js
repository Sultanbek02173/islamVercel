import axios from "./axios";

class StoreService {
  async getBannerData() {
    const response = await axios.get('/main/settings/');
    return response.data;
  }
  async getNewsData() {
    const response = await axios.get('/main/news/');
    return response.data;
  }

  async getMagazinesData() {
    const response = await axios.get('/main/magazine/');
    return response.data;
  }

  async getActivityData() {
    const response = await axios.get('/activity/activity/');
    return response.data;
  }
  async getAboutData() {
    const response = await axios.get('/AboutAcademy/about/');
    return response.data;
  }

  async getApplicantsData() {
    const response = await axios.get('/applicants/academic_councils/');
    return response.data;
  }

  async getGuideData() {
    const response = await axios.get('/management/leadership/');
    return response.data;
  }

  async getScienceData() {
    const response = await axios.get('/ology/ology/');
    return response.data;
  }

  async getEducationData() {
    const response = await axios.get('/education/alleducation/');
    return response.data;
  }
  async getStudentsData() {
    const response = await axios.get('students/scientific-journals/');
    return response.data;

  }

 

 

}

export default new StoreService();