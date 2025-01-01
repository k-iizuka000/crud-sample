FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Create necessary directories
RUN mkdir -p department js/department js/user

# Copy HTML files
COPY ./html/index.html ./
COPY ./html/department/* ./department/
COPY ./html/user/* ./user/

# Copy JavaScript files
COPY ./js/api.js ./js/
COPY ./js/combined-list.js ./js/
COPY ./js/department/* ./js/department/
COPY ./js/user/* ./js/user/

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions and ownership
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
