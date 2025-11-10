// utils/cart.ts

export interface CartItem {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// Get cart from localStorage
export const getCart = (): Cart => {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0 }
  }

  try {
    const cartData = localStorage.getItem('cart')
    if (!cartData) {
      return { items: [], total: 0, itemCount: 0 }
    }

    const items: CartItem[] = JSON.parse(cartData)
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return { items, total, itemCount }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return { items: [], total: 0, itemCount: 0 }
  }
}

// Add item to cart
export const addToCart = (product: Omit<CartItem, 'quantity'>): void => {
  if (typeof window === 'undefined') return

  try {
    const cart = getCart()
    const existingItem = cart.items.find(item => item.id === product.id)

    if (existingItem) {
      // If already in cart, increase quantity if stock allows
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1
      } else {
        throw new Error(`Cannot add more. Only ${product.stock} items available.`)
      }
    } else {
      // Add new item to cart
      if (product.stock > 0) {
        cart.items.push({ ...product, quantity: 1 })
      } else {
        throw new Error('Product is out of stock')
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart.items))
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

// Remove item from cart
export const removeFromCart = (productId: string): void => {
  if (typeof window === 'undefined') return

  try {
    const cart = getCart()
    const updatedItems = cart.items.filter(item => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}

// Update item quantity in cart
export const updateCartQuantity = (productId: string, quantity: number): void => {
  if (typeof window === 'undefined') return

  if (quantity < 1) {
    removeFromCart(productId)
    return
  }

  try {
    const cart = getCart()
    const item = cart.items.find(item => item.id === productId)
    
    if (!item) {
      throw new Error('Item not found in cart')
    }

    if (quantity > item.stock) {
      throw new Error(`Cannot add more. Only ${item.stock} items available.`)
    }

    item.quantity = quantity
    localStorage.setItem('cart', JSON.stringify(cart.items))
  } catch (error) {
    console.error('Error updating cart quantity:', error)
    throw error
  }
}

// Clear entire cart
export const clearCart = (): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('cart', JSON.stringify([]))
  } catch (error) {
    console.error('Error clearing cart:', error)
    throw error
  }
}

// Check if product is in cart
export const isInCart = (productId: string): boolean => {
  if (typeof window === 'undefined') return false

  try {
    const cart = getCart()
    return cart.items.some(item => item.id === productId)
  } catch (error) {
    console.error('Error checking cart:', error)
    return false
  }
}

// Get quantity of specific product in cart
export const getProductQuantity = (productId: string): number => {
  if (typeof window === 'undefined') return 0

  try {
    const cart = getCart()
    const item = cart.items.find(item => item.id === productId)
    return item ? item.quantity : 0
  } catch (error) {
    console.error('Error getting product quantity:', error)
    return 0
  }
}

// Generate WhatsApp message from cart
export const generateWhatsAppMessage = (customerInfo?: {
  name?: string
  phone?: string
  address?: string
}): string => {
  const cart = getCart()
  
  if (cart.items.length === 0) {
    return 'Cart is empty'
  }

  const itemsText = cart.items
    .map(item => `• ${item.name} - ${item.quantity} x $${item.price} = $${(item.quantity * item.price).toFixed(2)}`)
    .join('\n')

  const customerText = customerInfo 
    ? `\n\nCustomer Information:\nName: ${customerInfo.name || 'Not provided'}\nPhone: ${customerInfo.phone || 'Not provided'}\nAddress: ${customerInfo.address || 'Not provided'}`
    : ''

  return `Hello! I would like to place an order:\n\n${itemsText}\n\nTotal: $${cart.total.toFixed(2)}${customerText}`
}

// Generate WhatsApp URL
export const getWhatsAppUrl = (phoneNumber: string, customerInfo?: {
  name?: string
  phone?: string
  address?: string
}): string => {
  const message = generateWhatsAppMessage(customerInfo)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}