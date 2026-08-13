use rand::Rng;
use wasm_bindgen::prelude::*;

#[derive(Clone)]
pub struct Particle {
    pub x: f64,
    pub y: f64,
    pub vx: f64,
    pub vy: f64,
    pub size: f64,
    pub color: String,
    pub life: f64,
    pub max_life: f64,
}

impl Particle {
    pub fn new(x: f64, y: f64) -> Self {
        let mut rng = rand::thread_rng();
        let angle = rng.gen_range(0.0..std::f64::consts::PI * 2.0);
        let speed = rng.gen_range(100.0..400.0);
        let colors = vec![
            "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bcb", "#a66cff"
        ];
        
        Particle {
            x,
            y,
            vx: angle.cos() * speed,
            vy: angle.sin() * speed - 200.0,
            size: rng.gen_range(3.0..10.0),
            color: colors[rng.gen_range(0..colors.len())].to_string(),
            life: 0.0,
            max_life: rng.gen_range(1.0..2.5),
        }
    }

    pub fn update(&mut self, dt: f64) {
        self.x += self.vx * dt;
        self.y += self.vy * dt;
        self.vy += 300.0 * dt; // gravity
        self.life += dt;
    }

    pub fn is_alive(&self) -> bool {
        self.life < self.max_life
    }
}

pub fn generate_confetti(count: usize) {
    // For now, we'll use a console log since we can't easily access DOM from Rust
    // In production, this would return data to JS for rendering
    web_sys::console::log_1(&format!("Generating {} confetti particles!", count).into());
}