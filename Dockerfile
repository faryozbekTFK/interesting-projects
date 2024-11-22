# NGINX asosida imidjdan foydalanamiz
FROM nginx:stable-alpine

# Build qilingan fayllarni NGINX papkasiga nusxalaymiz
COPY build/ /usr/share/nginx/html

# NGINX konfiguratsiyasi
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port ochamiz
EXPOSE 80

# NGINX-ni ishga tushirish
CMD ["nginx", "-g", "daemon off;"]
