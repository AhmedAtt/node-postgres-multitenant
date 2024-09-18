import express from 'express'
import prisma from '../lib/prisma'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { tenantId: req.tenantId },
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, description, price } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        tenantId: req.tenantId!,
      },
    })
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

export const productRouter = router