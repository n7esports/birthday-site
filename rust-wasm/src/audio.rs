use std::f32::consts::PI;

/// Simple FFT-like frequency analysis
pub fn fft_transform(data: &[f32]) -> Vec<f32> {
    let mut result = Vec::with_capacity(128);
    let len = data.len();
    
    if len == 0 {
        return vec![0.0; 128];
    }
    
    for i in 0..128 {
        let start = (i * len) / 128;
        let end = ((i + 1) * len) / 128;
        let mut sum = 0.0;
        
        for j in start..end {
            if j < len {
                sum += data[j].abs();
            }
        }
        
        let avg = if end > start { sum / (end - start) as f32 } else { 0.0 };
        result.push(avg);
    }
    
    result
}

/// Generate audio visualization data
pub fn generate_waveform(data: &[f32]) -> Vec<f32> {
    let mut result = Vec::with_capacity(256);
    let len = data.len();
    
    if len == 0 {
        return vec![0.0; 256];
    }
    
    for i in 0..256 {
        let idx = (i * len) / 256;
        if idx < len {
            result.push(data[idx]);
        } else {
            result.push(0.0);
        }
    }
    
    result
}