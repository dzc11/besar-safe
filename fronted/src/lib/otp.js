// Very simple OTP mock for dev: store OTP in-memory
const otps = new Map();

export function sendOtp(phone) {
  const otp = Math.floor(100000 + Math.random()*900000).toString();
  otps.set(phone, otp);
  console.log('Mock OTP for', phone, otp);
  return { ok: true, otp }; // In prod do not return otp
}

export function verifyOtp(phone, code) {
  const found = otps.get(phone);
  if (found === code) {
    otps.delete(phone);
    return true;
  }
  return false;
}
