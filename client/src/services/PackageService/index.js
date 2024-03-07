import http from "../index"
import {
  apiGetAllPackages,
  apiGetDetailPackage,
  apiInsertPackage,
  apiUpdatetPackage,
} from './urls'

const insertPackage = body => http.post(apiInsertPackage, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const updatePackage = body => http.post(apiUpdatetPackage, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getAllPackages = body => http.post(apiGetAllPackages, body)
const getDetailPackage = PackageID => http.get(`${apiGetDetailPackage}/${PackageID}`)


const PackageService = {
  insertPackage,
  updatePackage,
  getAllPackages,
  getDetailPackage
}

export default PackageService
