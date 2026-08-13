FROM rust:1.70-slim as builder

RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install wasm-pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN wasm-pack build --target web --out-dir /output

FROM scratch
COPY --from=builder /output /output