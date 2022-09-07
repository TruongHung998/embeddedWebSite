export const required = {
  required: true, message: 'Vui lòng chọn/điền'
}

export const fullName = [
  { pattern: /^[^~`!@#$%^&*()\-_+=<>/\\|?;:"'{}[\]]+$/g, message: 'Họ tên không gồm ký tự đặc biệt' },
  { min: 5, message: 'Điền đẩy đủ họ và tên > 5 chữ cái' }
]

export const phone = [
  { pattern: /^\d+$/g, message: 'Số điện thoại chỉ điền chữ số' },
  { type: 'string', min: 10, max: 10, message: 'Điền chính xác số điện thoại' }
]

export const email = [
  { type: 'email', message: 'Điền chính xác email' }
]

export const pid = [
  { pattern: /^\d+$/g, message: 'Chỉ điền chữ số' },
  { type: 'string', max: 10, message: 'Điền chính xác mã khách hàng' }
]

export const street = [
  { type: 'string', min: 5, message: 'Điền đầy đủ số nhà, tên đường' }
]

export const quantity = [
  { pattern: /^[1-9]\d*$/g, message: 'Chỉ điền chữ số và lớn hơn 0' },
]

export const number = [
  { pattern: /^[0-9]\d*$/g, message: 'Chỉ điền số' },
]
