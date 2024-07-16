# Stage 1: Build
FROM node:22-slim AS builder

# Use node user
USER node

# Create app directory
RUN mkdir -p /home/node/app

# Set working directory
WORKDIR /home/node/app

# Copy package.json and install dependencies
COPY --chown=node:node package.json ./
RUN npm install --omit=dev

# Copy the rest of the application code
COPY --chown=node:node . .

# Compile TypeScript
RUN npx tsc -b

# Stage 2: Run
FROM node:22-slim

# Use node user
USER node

# Create app directory
RUN mkdir -p /home/node/app

# Set working directory
WORKDIR /home/node/app

# Copy built files from the builder stage
COPY --from=builder --chown=node:node /home/node/app/dist ./dist
COPY --from=builder --chown=node:node /home/node/app/node_modules ./dist/node_modules
COPY --from=builder --chown=node:node /home/node/app/src/u2net.onnx ./dist/

# Set NODE_ENV to production
ENV NODE_ENV=production
EXPOSE 3000
# Run the application
CMD ["node", "./dist/app.js"]
