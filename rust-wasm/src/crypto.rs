/// Simple encryption (XOR-based, not for production use)
pub fn encrypt(data: &str, key: &str) -> String {
    let key_bytes = key.as_bytes();
    let data_bytes = data.as_bytes();
    let mut result = Vec::with_capacity(data_bytes.len());
    
    for (i, &byte) in data_bytes.iter().enumerate() {
        let key_byte = key_bytes[i % key_bytes.len()];
        result.push(byte ^ key_byte);
    }
    
    base64::encode(&result)
}

/// Simple decryption (XOR-based, not for production use)
pub fn decrypt(data: &str, key: &str) -> String {
    let key_bytes = key.as_bytes();
    let data_bytes = match base64::decode(data) {
        Ok(bytes) => bytes,
        Err(_) => return String::new(),
    };
    let mut result = Vec::with_capacity(data_bytes.len());
    
    for (i, &byte) in data_bytes.iter().enumerate() {
        let key_byte = key_bytes[i % key_bytes.len()];
        result.push(byte ^ key_byte);
    }
    
    String::from_utf8_lossy(&result).to_string()
}

/// Generate a random encryption key
pub fn generate_key() -> String {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    let mut key = String::with_capacity(32);
    for _ in 0..32 {
        let char = rng.gen_range(33..126) as u8;
        key.push(char as char);
    }
    key
}

// Simple base64 implementation
mod base64 {
    const ALPHABET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    
    pub fn encode(data: &[u8]) -> String {
        let mut result = String::new();
        let mut i = 0;
        
        while i < data.len() {
            let a = data[i];
            let b = if i + 1 < data.len() { data[i + 1] } else { 0 };
            let c = if i + 2 < data.len() { data[i + 2] } else { 0 };
            
            let index1 = (a >> 2) & 0x3F;
            let index2 = ((a & 0x03) << 4) | ((b >> 4) & 0x0F);
            let index3 = ((b & 0x0F) << 2) | ((c >> 6) & 0x03);
            let index4 = c & 0x3F;
            
            result.push(ALPHABET[index1 as usize] as char);
            result.push(ALPHABET[index2 as usize] as char);
            result.push(if i + 1 < data.len() { ALPHABET[index3 as usize] as char } else { '=' });
            result.push(if i + 2 < data.len() { ALPHABET[index4 as usize] as char } else { '=' });
            
            i += 3;
        }
        
        result
    }
    
    pub fn decode(data: &str) -> Result<Vec<u8>, &'static str> {
        let mut result = Vec::new();
        let mut buffer = 0u32;
        let mut bits = 0;
        
        for &byte in data.as_bytes().iter() {
            if byte == b'=' {
                break;
            }
            
            let value = match ALPHABET.iter().position(|&x| x == byte) {
                Some(v) => v as u32,
                None => return Err("Invalid base64 character"),
            };
            
            buffer = (buffer << 6) | value;
            bits += 6;
            
            if bits >= 8 {
                bits -= 8;
                result.push(((buffer >> bits) & 0xFF) as u8);
            }
        }
        
        Ok(result)
    }
}