import http from "../index"
import {
  apiGetAllPackages,
  apiGetDetailPackage,
  apiInsertPackage,
  apiUpdatetPackage,
} from './urls'

const insertPackage = body => http.post(apiInsertPackage, body)
const updatePackage = body => http.post(apiUpdatetPackage, body)
const getAllPackages = body => http.post(apiGetAllPackages, body)
const getDetailPackage = PackageID => http.get(`${apiGetDetailPackage}/${PackageID}`)


const PackageService = {
  insertPackage,
  updatePackage,
  getAllPackages,
  getDetailPackage
}

export default PackageService
