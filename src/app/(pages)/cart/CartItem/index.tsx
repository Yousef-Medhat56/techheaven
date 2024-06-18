'use client'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media, Product } from '../../../../payload/payload-types'
import * as MediaComp from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

// product = { product }
// title = { title }
// metaImage = { metaImage }
// index = { index }
// quantity = { quantity }
// addItemToCart = { addItemToCart }
interface CartItemProps {
  product: Product
  title: string
  metaImage: number | Media
  index: number
  quantity: number
  addItemToCart: (item: { product?: number | Product; quantity?: number; id?: string }) => void
}

const CartItem = ({ product, title, metaImage, index, quantity, addItemToCart }: CartItemProps) => {
  const [quantityState, setQuantityState] = useState(quantity)

  const decrememntQuantity = () => {
    const updatedQuantity = quantity > 1 ? quantity - 1 : 1
    setQuantityState(updatedQuantity)
    addItemToCart({ product, quantity: updatedQuantity })
  }
  const incrememntQuantity = () => {
    const updatedQuantity = quantity + 1
    setQuantityState(updatedQuantity)
    addItemToCart({ product, quantity: updatedQuantity })
  }
  const enterQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuantity = Number(e.target.value)
    setQuantityState(updatedQuantity)
    addItemToCart({ product, quantity: updatedQuantity })
  }

  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No Image</span>}
        {metaImage && typeof metaImage !== 'number' && (
          <MediaComp.Media
            className={classes.media}
            imgClassName={classes.img}
            resource={metaImage}
            fill
          />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>
        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrememntQuantity}>
            <Image src={'/assets/icons/minus.svg'} alt="minus" width={24} height={24} />
          </div>
          <input
            type="number"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQuantity}
          />
          <div className={classes.quantityBtn} onClick={incrememntQuantity}>
            <Image src={'/assets/icons/plus.svg'} alt="plus" width={24} height={24} />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={quantity} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
