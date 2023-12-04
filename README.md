## Aplicación de Eventos

Esta aplicación se centra en la creación de eventos, permitiendo a los usuarios describir una serie de parámetros que se rellenarán y se mostrarán en pantalla durante la gestión de eventos.


## Tecnologías Utilizadas

para la creacion de este proyecto se uso 

1. Django y Python, Utilizados para el backend, en conjunto con Django Rest Framework para facilitar la creación de APIs.
2. JavaScript, React, Tailwind CSS: Empleados en el frontend
3. pytest: Utilizado para realizar pruebas y garantizar la calidad del código.

 
## Instalación 

Para instalar y ejecutar la aplicación, sigue estos pasos:

### Requisitos previos

Asegurese de tener instalados los siguientes elementos:

1. Python y pip (para el backend)
2. Node.js y npm (para el frontend)

es necesario iniciar el backend de esta forma (Una vez descargado el archivo)

```bash

# es necesario instalar las dependencias de entornos virtuales

pip install virtualenv
# para ingresar al entorno virtual
.\env\Scripts\activate 

# para ingresar al backend
cd backend

# para instalar las dependencias
pip install -r requirements.txt

# para iniciar el servidor

python manage.py runserver


```

ahora para el frontend:

```bash
# para acceder al frontend
cd frontend

# para ainstalar las dependencias del frontend
npm install

# Inicia la aplicación de React

npm run dev

```

Estos pasos aseguran una instalación correcta y el funcionamiento adecuado tanto del backend como del frontend de la aplicación de eventos. Ajuste las configuraciones según sea necesario para adaptarse a su entorno específico.