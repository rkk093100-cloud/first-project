async function deriveKey(password, salt) {
  const encoder = new TextEncoder();

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"],
  );
}
async function encryptNote(note, password) {
  const encoder = new TextEncoder();

  // 每次加密生成随机 salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // AES-GCM 需要随机 IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 从密码派生 AES 密钥
  const key = await deriveKey(password, salt);

  // 加密笔记
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoder.encode(note),
  );

  return {
    ciphertext: Array.from(new Uint8Array(encrypted)),
    salt: Array.from(salt),
    iv: Array.from(iv),
  };
}

async function decryptNote(data, password) {
  const decoder = new TextDecoder();

  const salt = new Uint8Array(data.salt);
  const iv = new Uint8Array(data.iv);
  const ciphertext = new Uint8Array(data.ciphertext);

  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext,
  );

  return decoder.decode(decrypted);
}
