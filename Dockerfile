# Honeycomb Scam Detection - Docker Deployment
FROM node:18-alpine

# Install Python and Ollama dependencies
RUN apk add --no-cache python3 py3-pip curl bash

# Install Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy application code
COPY . .

# Create models directory
RUN mkdir -p /app/models

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/api/messages/health || exit 1

# Start script
COPY docker-start.sh /app/
RUN chmod +x /app/docker-start.sh

CMD ["/app/docker-start.sh"]