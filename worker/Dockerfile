# Build stage: compile Go application
FROM golang:1.25.4-alpine AS builder

WORKDIR /app

# Copy Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and build static binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o worker main.go

# Production stage: minimal runtime image
FROM alpine:latest

WORKDIR /app
# Copy compiled binary from builder stage
COPY --from=builder /app/worker .

# Run the worker application
CMD ["./worker"]