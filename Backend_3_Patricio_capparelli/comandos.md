# DOCKER
    - Crear Imagen
        ❯ docker build -t backend3-entrega-final_patricio .

    - Crear una instancia de imagen
        ❯ docker run -p 5000:5000 backend3-entrega-final_patricio

        Usando ENV desde consola
        ❯ docker run -e "PORT=4000" -e "MONGODB_URL=mongodb+srv://pato:j4054blit4a93ijJh@cluster0.fd1th.mongodb.net/FinalBackend3" -p 5000:5000 backend3-entrega-final_patricio

        - Login
            ❯ docker login
            ❯ docker login -u capparelli
        - cramos Tag
            ❯ docker tag backend3-entrega-final_patricio neptunonet/backend3-entrega-final_patricio:1.0.1
            ❯ docker push neptunonet/backend3-entrega-final_patricio:1.0.1

