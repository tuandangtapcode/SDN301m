import http from "../index"
import {
  apiGetAllPackages,
  apiInsertPackage,
  apiUpdatetPackage,
} from './urls'

const insertPackage = body => http.post(apiInsertPackage, body)
const updatePackage = body => http.post(apiUpdatetPackage, body)
const getAllPackages = body => http.post(apiGetAllPackages, body)


const PackageService = {
  insertPackage,
  updatePackage,
  getAllPackages
}

export default PackageService
