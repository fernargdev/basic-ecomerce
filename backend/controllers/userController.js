import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import createToken from '../utils/createToken.js'

const helper = (req, res) => {
  res.json({ message: 'USER ROUTES' })
}

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new Error('Please fill all the inputs.')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
    // if (userExists) res.status(400).send('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    await newUser.save()
    createToken(res, newUser._id)

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    })
  } catch (error) {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  console.log(email)
  console.log(password)

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    res.status(400)
    throw new Error('User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password)

  if (!isPasswordValid) {
    res.status(400)
    throw new Error('Invalid password')
  }

  createToken(res, existingUser._id)

  res.status(201).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  })

  return
})

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httyOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out successfully' })
})

export { createUser, loginUser, logoutCurrentUser, helper }
