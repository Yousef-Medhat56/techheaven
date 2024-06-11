'use client'
import React from 'react'
import Link from 'next/link'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

const CategoryCard = ({ category }: { category: Category }) => {
  const mediaUrl = category.media as Media

  const { setCategoryFilters } = useFilter()
  return (
    <Link
      href="/products"
      className={classes.card}
      style={{
        backgroundImage: `url(${mediaUrl.url})`,
      }}
      onClick={() => setCategoryFilters([String(category.id)])}
    >
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
