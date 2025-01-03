FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Create necessary directories
RUN mkdir -p department/js

# Copy HTML files
COPY ./html/index.html ./
COPY ./html/department/*.html ./department/
COPY ./html/department/js/*.js ./department/js/

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions and ownership
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
