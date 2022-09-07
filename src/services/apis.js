import axios from 'axios'
import {API_KEY, EPLUS_API_ROOT, MASTER_API_ROOT, TAMANH_API_ROOT} from '../../settings'
import moment from "moment";

const storage = {
  vnvcs: null,
  vaccines: null,
  provinces: null,
  districts: {},
  wards: {}
}

const tamanhInstance = axios.create({
  baseURL: TAMANH_API_ROOT
})

const masterInstance = axios.create({
  baseURL: MASTER_API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': API_KEY
  }
})

const eplusInstance = axios.create({
  baseURL: EPLUS_API_ROOT
})

const requestAuth = async (url, data) => {
  return await axios
      .post('https://app.e-plus.vn/api/utils/appointment/hcm/auth', {
        "grant_type": "password",
        "username": "api",
        "password": 1
      })
      // .then(res =>  `${res.data.token_type || ''} ${res.data.access_token || ''}`)
      .then(async (res) => {
        if (res && res.data.access_token !== '') {
          localStorage.setItem('token', `${res.data.token_type || ''} ${res.data.access_token || ''}`)
          return await axios.post(url, data, {
            headers: {
              'Authorization': `${res.data.token_type || ''} ${res.data.access_token || ''}`
            }
          })
        }
      })
}

export default {
  tamanh: {
    getSchedulingSlots() {
      return tamanhInstance
          .get('/api/booking.php')
          .then(res => res.data.data || [])
    },
    getSpecialitiesHcm() {
      return axios
          .get('https://app.e-plus.vn/api/utils/benhan/master')
          .then(res => res.data.data || [])
    },

    getDoctorsHcm(id) {
      const now = moment().format('DD-MM-YYYY')
      const nextDate = moment().add(60, 'days').format('DD-MM-YYYY')
      return axios
          .post(`https://app.e-plus.vn/api/utils/appointment/hcm/getTimeslotBySpecialist`, {
            "fromdate": now,
            "todate": nextDate,
            "specialist": id
          }, {
            headers: {
              'Authorization': localStorage.getItem('token') || ''
            }
          })
          .then(res => {
            if (res.data.Message) {
              return requestAuth(`https://app.e-plus.vn/api/utils/appointment/hcm/getTimeslotBySpecialist`, {
                "fromdate": now,
                "todate": nextDate,
                "specialist": id
              }).then(res => res.data || [])
            }
            return res.data || []
          })
    },

    getDoctorsSlotHcm(special, doctor) {
      const now = moment().format('DD-MM-YYYY')
      const nextDate = moment().add(60, 'days').format('DD-MM-YYYY')
      return axios
          .post(`https://app.e-plus.vn/api/utils/appointment/hcm/getTimeslotByDoctor`, {
            "fromdate": now,
            "todate": nextDate,
            "specialist": special,
            "employee": doctor
          }, {
            headers: {
              'Authorization': localStorage.getItem('token') || ''
            }
          })
          .then(res => {
            if (res.data.Message) {
              return requestAuth(`https://app.e-plus.vn/api/utils/appointment/hcm/getTimeslotByDoctor`, {
                "fromdate": now,
                "todate": nextDate,
                "specialist": special,
                "employee": doctor
              }).then(res => res.data || [])
            }
            return res.data || []
          })
    },

    findPid (center, params = {}) {
      switch (center) {
        case 'ho-chi-minh':
          return eplusInstance
            .post('api/vaccine/findPID', params)
            .then(res => res.data.data ? res.data.data[0] || null : null)
        case 'ha-noi':
          return eplusInstance
            .post('api/vaccine/findPIDHN', params)
            .then(res => res.data.data ? res.data.data[0] || null : null)
        default:
          return Promise.reject(new Error('No center provided'))
      }
    },

    evusheldTracking (params = {}) {
      return eplusInstance
          .post('api/vaccine/evusheld-tracking', params)
          .then(res => res.data.data ? res.data.data[0] || null : null)
    }
  },

  forms: {
    push (id, data) {
      // return Promise.resolve(data)
      return eplusInstance
        .post('/apimgd/form', {
          form_id: id,
          ...data
        })
    },
    findRecord (data) {
      return eplusInstance
        .post('/api/vaccine/findRecord',
          data
        )
    },
    findRecordRID (data) {
      return eplusInstance
        .post('/api/vaccine/findRecordRID',
          data
        )
    },
    getTimeslots (date, source) {
      const centerId = source && source == 'SMS' ? 'BV-TAMANH-HANOI' : 'BV-TAMANH-HCM'
      return eplusInstance
        .get(`/api/timeslot?centerId=${centerId}&date=${date}&formId=VaccineBookingOnline`)
    },
    getVaccineslots (data, source) {
      const centerId = source && source == 'SMS' ? 'BV-TAMANH-HANOI' : 'BV-TAMANH-HCM'
      data = {
        ...data,
        centerId: centerId
      }
      return eplusInstance
        .post(`/api/vaccineslot`, data)
    },
    getDateForBooking (data) {
      return eplusInstance
        .post(`/api/timeslot/all?page=1&limit=3000`, data)
    },
    checkBookingExist (data) {
      return eplusInstance
        .post(`/api/dbform/find`, data)
    },
    getSchoolByCenter (data) {
      return eplusInstance
          .post(`/api/dbform/vnvc/school`, data)
    },
    addSchoolByCenter (data) {
      return eplusInstance
          .post(`/api/dbform/vnvc/school/create`, data)
    },
    getRecordKeyWeb (data) {
      return eplusInstance
        .post('/api/vaccine/getRecordKeyWeb',
          data
        )
    },
    getLocation () {
      return eplusInstance
        .get('/api/utils/location')
    },
    getCountrys () {
      return eplusInstance
        .get('/api/utils/location/country')
    },
    getProvinces () {
      return eplusInstance
        .get('/api/utils/location/province')
    },
    getDistricts (id) {
      return eplusInstance
        .get(`/api/utils/location/district/${id}`)
    },
    getWards (id) {
      return eplusInstance
        .get(`/api/utils/location/ward/${id}`)
    },
    checkPid (data) {
      return eplusInstance
        .post('/api/utils/patient',
            data
        )
    },
    getSpecialistHN () {
      return eplusInstance
          .get('/api/utils/appointment/hn/specialist')
    },
    getDoctorsHN () {
      return eplusInstance
          .get('/api/utils/appointment/hn/doctors')
    },
    getScheduleHN (data) {
      return eplusInstance
          .post('/api/utils/appointment/hn/schedule', data)
    },
    allData ({page, perPage}, data) {
      return eplusInstance
          .post(`/api/dbform/data?page=${page}&perPage=${perPage}`, data)
    }
  },

  master: {
    getVnvcsList ({ size = 100 } = {}) {
      if (storage.vnvcs)
        return Promise.resolve(storage.vnvcs)
      return masterInstance
        .post('/api/app/Center/GetByQuery3rd', {
          size
        })
        .then(res => {
          const data = res.data.data
          storage.vnvcs = data
          return data
        })
    },

    getVaccinesList ({ from = 0, size = 100 } = {}) {
      if (storage.vaccines)
        return Promise.resolve(storage.vaccines)
      return masterInstance
        .post('/api/app/VaccineCategories/GetByQuery3rd', {
          from,
          size,
          sort: { field: 'order', sortOrder: 0 },
          source: {
            excludes: ['description']
          },
          query: {
            bool: {
              must: [
                { term: { isActive: true } },
                { term: { isDelete: false } },
                { term: { allowedToSell: true } },
                { term: { displays: 'web' } }
              ]
            }
          }
        })
        .then(res => {
          const data = res.data.data
          console.log(data.map(i => i.code))
          storage.vaccines = data
          return data
        })
    },

    getProvincesList ({ size = 100 } = {}) {
      if (storage.provinces)
        return Promise.resolve(storage.provinces)
      return masterInstance
        .post('/api/app/MasterData/v2/province/GetByQuery3rd', {
          size
        })
        .then(res => {
          const data = res.data.data
            .sort((a, b) => a.sort - b.sort)
          storage.provinces = data
          return data
        })
    },

    getDistrictsList ({ size = 100, provinceId = undefined } = {}) {
      if (provinceId && storage.districts[provinceId])
        return Promise.resolve(storage.districts[provinceId])
      return masterInstance
        .post('/api/app/MasterData/v2/district/GetByQuery3rd', {
          size,
          query: provinceId !== undefined
            ? {
              bool: {
                must: {
                  term: {
                    provinceId
                  }
                }
              }
            }
            : undefined
        })
        .then(res => {
          const data = res.data.data
            .sort((a, b) => a.sort - b.sort)
          storage.districts[provinceId] = data
          return data
        })
    },


    getWardsList ({ size = 100, districtId = undefined } = {}) {
      if (districtId && storage.wards[districtId])
        return Promise.resolve(storage.wards[districtId])
      return masterInstance
        .post('/api/app/MasterData/v2/ward/GetByQuery3rd', {
          size,
          query: districtId !== undefined
            ? {
              bool: {
                must: {
                  term: {
                    districtId
                  }
                }
              }
            }
            : undefined
        })
        .then(res => {
          const data = res.data.data
            .sort((a, b) => a.sort - b.sort)
          storage.wards[districtId] = data
          return data
        })
    }
  }
}

