# syntax=docker/dockerfile:1

FROM node:20.5.0-alpine AS ui-builder

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci

COPY app-shell.config.ts .
COPY vite.config.ts .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY index.html .
COPY src/ src/
COPY public/ public/
COPY hcp.html .


ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine AS runner

## add permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

ENV VITE_API_URL="http://10.80.22.80:8080"

COPY --from=ui-builder /build/dist data/www/copilot
COPY --from=ui-builder /build/hcp.html data/www/copilot
COPY  nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

ENTRYPOINT ["nginx", "-g", "daemon off;"]
