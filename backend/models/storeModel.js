import mongoose from 'mongoose'

const storesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    province: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
)

const Store = mongoose.model('Store', storesSchema)

export default Store
