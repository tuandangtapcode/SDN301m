import Package from "../models/package.js"
import respone from '../models/respone.js'

const fncInsertPackage = async (req) => {
  try {
    const { Title } = req.body
    const checkExistTitle = await Package.findOne({ Title })
    if (!!checkExistTitle) return respone({}, true, "Tên gói premium đã tồn tại", 200)
    const newPackage = await Package.create(req.body)
    return respone(newPackage, false, "Thêm gói premium thành công", 201)
  } catch (error) {
    return respone({}, true, error.toString(), 500)
  }
}

const fncUpdatePackage = async (req) => {
  try {
    
  } catch (error) {
    return respone({}, true, error.toString(), 500)
  }
}


const PackageService = {
  fncInsertPackage
}

export default PackageService
