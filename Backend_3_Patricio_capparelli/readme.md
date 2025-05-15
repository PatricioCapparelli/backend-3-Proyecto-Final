# Entrega Final - Patricio Capparelli


## Objetivos generales
Implementar las últimas mejoras en nuestro proyecto y Dockerizarlo.


## Objetivos específicos
Documentar las rutas restantes de nuestro proyecto.
- Añadir los últimos tests
- Crear una imagen de Docker.


## Se debe entregar
- Documentar con Swagger el módulo de “Users”.
- Desarrollar los tests funcionales para todos los endpoints del router “adoption.router.js”.
- Desarrollar el Dockerfile para generar una imagen del proyecto.
- Subir la imagen de Docker a Dockerhub y añadir en un ReadMe.md al proyecto que contenga el link de dicha imagen.


## Docker
### Enlace a la imagen en DockerHub
La imagen de este proyecto esta disponible en DockerHub en el siguiente enlace:
[https://hub.docker.com/repository/docker/patriciocapparelli/repo-coder-back-3-final/general](https://hub.docker.com/repository/docker/patriciocapparelli/repo-coder-back-3-final/general)

#### Opción 1: Descargar y ejecutar la imagen desde DockerHub
Para ejecutar el proyecto utilizando la imagen publicada en DockerHub, ejecuta el siguiente comando:

```bash
docker pull patriciocapparelli/repo-coder-back-3-final:1.0.1
docker run -e "PORT=5000" -e "MONGODB_URL=mongodb+srv://patriciocapparelli:je05zblita9mijJh@cluster0.fd1th.mongodb.net/Backd3" -p 5000:5000 patriciocapparelli/repo-coder-back-3-final:1.0.1

