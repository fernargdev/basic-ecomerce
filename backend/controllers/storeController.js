import asyncHandler from '../middlewares/asyncHandler.js'
import Store from '../models/storeModel.js'

const helper = (req, res) => {
  res.json({ message: 'STORE ROUTES' })
}

const createStore = asyncHandler(async (req, res) => {
  const { name, province } = req.body

  if (!name || !province) {
    throw new Error('Please fill all the inputs.')
  }

  const storeExists = await Store.findOne({ name })
  if (storeExists) {
    res.status(400)
    throw new Error('Store already exists')
  }

  const newStore = new Store({ name, province })

  try {
    const createdStore = await newStore.save()
    res.status(201).json(createdStore)
  } catch (error) {
    throw new Error('Invalid store data')
  }
})

const getStoreByName = asyncHandler(async (req, res) => {
  const { name } = req.params
  console.log(name)
  const store = await Store.findOne({ name })
  if (store) {
    res.json(store)
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})

export { helper, createStore, getStoreByName }
