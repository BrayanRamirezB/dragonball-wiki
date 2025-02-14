export interface AllFighters {
  items: Fighter[]
  meta: Meta
  links: Links
}

export interface Fighter {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
  deletedAt: null
  originPlanet: OriginPlanet
  transformations: Transformation[]
}

export interface OriginPlanet {
  id: number
  name: string
  isDestroyed: boolean
  description: string
  image: string
  deletedAt: null
}

export interface Transformation {
  id: number
  name: string
  image: string
  ki: string
  deletedAt: null
}

export interface Links {
  first: string
  previous: string
  next: string
  last: string
}

export interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
