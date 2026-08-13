use wasm_bindgen::prelude::*;
use std::collections::HashMap;
use rand::Rng;

mod particles;
mod audio;
mod crypto;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}! 🎉", name));
}

#[wasm_bindgen]
pub fn burst_confetti(count: usize) {
    particles::generate_confetti(count);
}

#[wasm_bindgen]
pub fn process_audio_data(data: &[f32]) -> Vec<f32> {
    audio::fft_transform(data)
}

#[wasm_bindgen]
pub fn encrypt_message(data: &str, key: &str) -> String {
    crypto::encrypt(data, key)
}

#[wasm_bindgen]
pub fn decrypt_message(data: &str, key: &str) -> String {
    crypto::decrypt(data, key)
}

#[wasm_bindgen]
pub fn get_birthday_fact() -> String {
    let facts = vec![
        "🎂 The tradition of birthday cakes started in ancient Greece!",
        "🎈 The first birthday cards were sent in the 19th century!",
        "🎉 The most popular birthday is September 9th!",
        "🥳 The world's largest birthday party had over 100,000 guests!",
        "🎁 The word 'birthday' was first used in 1573!"
    ];
    let mut rng = rand::thread_rng();
    let idx = rng.gen_range(0..facts.len());
    facts[idx].to_string()
}