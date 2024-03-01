import PackageService from "../services/package.service.js"

const insertPackage = async (req, res) => {
  try {
    const response = await PackageService.fncInsertPackage(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updatePackage = async (req, res) => {
  try {
    const response = await PackageService.fncUpdatePackage(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllPackages = async (req, res) => {
  try {
    const response = await PackageService.fncGetAllPackages(req)
    return res.status(response.StatusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const PackageController = {
  insertPackage,
  updatePackage,
  getAllPackages
}

export default PackageController
