# Documentación para la Creación de un CRUD
## Indice
- [Glosario](#glosario)
- [Configuración del Proyecto](#configuración-del-proyecto)
  - [Creación del Entorno Virtual](#creación-del-entorno-virtual)
- [Django Rest Framework](#django-rest-framework)
- [Modelo de tareas](#modelo-de-tareas)
- [Docs](#Docs)
- [Configuracion de react](#configuración-de-react)
- [Obtener Tareas](#obtener-tareas)
- [crear la tarea](#crear-la-tarea)
- [Eliminar la tarea](#eliminar-tareas)
- [Editar tareas ](#editar-tareas)
- [agregar estilos](#estilos-usando-tailwind-y-react-hot-toast)
## Glosario

- **CRUD:** Acrónimo de "Create, Read, Update, Delete". Se refiere a las operaciones básicas que se pueden realizar en una base de datos o sistema de gestión de información.

- **Entorno Virtual:** Un entorno aislado para gestionar las dependencias de un proyecto de software de manera eficiente, evitando conflictos entre diferentes proyectos.

- **pip:** Sistema de gestión de paquetes para instalar y gestionar bibliotecas de Python.

- **Virtualenv:** Herramienta utilizada para crear entornos virtuales en Python.

- **Django:** Un framework de desarrollo web de alto nivel y de código abierto que fomenta el desarrollo rápido y limpio.

- **django-admin:** Herramienta de línea de comandos para administrar proyectos Django.

- **Django Rest Framework:** Una potente y flexible biblioteca para construir APIs web en Django.

## Configuración del Proyecto

Para poder ver el contenido mejor, utiliza: `Ctrl + Shift + V`

[este es el video de fazt](https://www.youtube.com/watch?v=38XWpyEK8IY&t&ab_channel=FaztCode)


**********


### Creación del Entorno Virtual

Antes de comenzar con el desarrollo del CRUD, es crucial establecer un entorno virtual para gestionar las dependencias de manera eficiente. Utiliza el siguiente comando para crear el entorno virtual:

```bash
pip install virtualvenv

```

luego para crear el archivo venv es:

```bash
python -v venv venv
```

luego para ingresar al entorno virtual apreta F1 y escribe python interpreter y escoge el entorno virtual

ahora para agregar django es :

```bash
pip install django
```
para crear un proyecto es:

```bash
django-admin startproject django-curd-api .
# es porque el backend solo va a enviar datos
```

en la consola para agregar un app usa el comando 

```bash
python manage.py startapp tasks
```


luego en settings.py agrega en INSTALLED_APPS =[
    'tasks'
]

ahora en consola necesitmas migrar, para hacerlo escribe
```bash
python mangage.py migrate
```

## Django rest Framework

para poder instalarlo es:
```bash
pip install djangorestframework
```

ahora por cuestiones de seguridad vamos a importar esto:

```bash
pip install django-cors-headers
```

y en el archivo settings tenemos que agregar en installed apps [`rest_framework, corsheaders`]

abajo en middlware debes colocar     `"corsheaders.middleware.CorsMiddleware",` y debe estar lo mas alto posible 
[aqui esta la documentacion](https://pypi.org/project/django-cors-headers/)

abajito de todo colocaremos 
```py
CORS_ALLOWED_ORIGINS = []
```

## Modelo de tareas

ahora en models.py escribe

```py
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(blank=False)

    def __str__(self):
        return self.title

```
ahora necesitamos preparar las migraciones 

```py
python manage.py makemigrations
```

y ahora hacemos las migraciones

```py
python manage.py migrate
```

ahora necesitamos crear un superusuario

```py
python manage.py createsuperuser
```
y en admin.py colocamos 

```py

from django.contrib import admin
from .models import Task
# Register your models here.

admin.site.register(Task)
```

y ya con esto deberiamos poder ingresar a la aplicaicon y crear 3 tareas distintas

## querysets

necestiamos crear un archivo llamado serializer.py en tasks de esta forma

``` py
from rest_framework import serializers
from .models import Task


class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
```

luego en el archivo views.py tenemos que escribir esto
``` py

from rest_framework import viewsets
from .serializer import taskSerializer
from .models import Task
# Create your views here.


class TaskView(viewsets.ModelViewSet):
    serializer_class = taskSerializer
    queryset = Task.objects.all()
```


Ahora en Tasks en el archivo urls.py coloca esto:

```py
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tasks.views import TaskView

router = routers.DefaultRouter()
# Utiliza 'basename' en lugar de 'tasks' para la URL
router.register(r'tasks', TaskView, basename='tasks')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='Task API')),
]


```
y en Django_crud_api en urls coloca esto:
```py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tasks/', include('tasks.urls'))
]
```


en este punto es recomendable instalar la extension thunder client

y podras hacer peticiones get, de hecho si escribes localhost::8000/tasks/api/v1/tasks
deberias poder ver la api

## Docs

Aqui tenemos que importar un nuevo modulo que sirve para documentar la api
```py
pip install coreapi
```

esto se tiene que colocar encima de tasks en Installed apps de Django_crud_apñi:

de esta forma:
```py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'coreapi',
    'tasks',
]
```

ahora para poder instalar el coreapi bien necesitamos escribir esto en settings.py
```py
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}

```
por si acaso se coloca abajo de todo, acá esta la documentación [link](https://www.django-rest-framework.org/coreapi/)

## Configuración de React

escribimos en la carpeta Django-crud-react (osea en la raiz de todo el proyecto) el
comando para crear el proyecto con vite

```bash
npm create vite

```

le colocaremos como nombre `client` luego cd client y npm install

y necesitamos importar vairas librerias `react-router-dom`, que es un modulo para tener multiples paginas en el frontend y `react-hot-toast` que sirve para que nos muestre unos mensajes cuando editemos algo y `axios` que sirve para hacer peticiones, tambien esta fetch pero asi es mas simple, también `react-hook-form` sirve para validar formularios

te deberia quedar asi:

```bash
npm i react-router-dom react-hot-toast axios react-hook-form
```
una vez hecho esto debemos limpiar todo los estilos de react, esto incluye App.css, App.jsx y index.css


vamos a crear 4 archivos que se van a llamar `api`, `asets`, `components`, y `pages`

dentro de pages debes colocar dos archivos jsx llamados `TasksFormPages.jsx` y `TasksPage.tsx`

ahora en App.jsx colocar

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { TaskFormPage } from "./pages/TasksFormPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/tasks" />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks-create" element={<TaskFormPage />} />
                {/* Agrega más rutas según sea necesario */}
            </Routes>
        </BrowserRouter>
    );
}


```

ahora en el archivo  TasksPage.jsx coloca:

```jsx
export function TasksPage(){
    return(
        <div>TasksPage<div>
    )
}
```

y en el arhcivo TasksFormPage.jsx
```jsx
export function TasksFormPage(){
    return(
        <div>TasksPage<div>
    )
}

```

y con esto deberias poder ser capaz de cambiar de rutas ejemplo: localhost::8000/tasks

******

luego vamos a crear una archivo en components que se va a llamar Navigation.jsx 

va a tener este codigo:
```jsx
import {Link} from 'react-router-dom'

export function Navigation(){
    return(
        <div>
        <Link to = "/tasks">
        <h1>Task App<h1>
        </Link>
        <Link to ="/Tasks-create"></Link>
        </div>
    )
}
```

y vamos a cambiar el arhivo App.jsx a:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { TaskFormPage } from "./pages/TasksFormPage";
import {Navigation} from "./components/Navigation";

function App() {
    return (
        <BrowserRouter>
        <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/tasks" />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks-create" element={<TaskFormPage />} />
                {/* Agrega más rutas según sea necesario */}
            </Routes>
        </BrowserRouter>
    );
}


```

## Obtener Tareas

ahora creamos un nuevo archivo en components que se va a llamar TasksList.jsx
```jsx
import {useEffect} from 'react'
import {TasksList} from '../components/TasksList'

export function TasksPage(){
    useEffect(()=> {
        console.log("Pagina cargada")
    }, [])
    return <div><TasksList></div>
}

```

y en el archivo TasksPage.jsx lo vamos a cambia por 


```jsx
import {TasksList} from '../components/TasksList'

export function TasksPage(){
    return <TasksList/>
}
```


ahora vamos a crear una carpeta que se va a llamar api y le vamos a colocar un archovo que se va a llamar tasks.api.js

```jsx
import axios from 'axios'

export const getAllTasksTasks = () {
    return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
}
```

ahora en TasksList.jsx vamos a importar la funcion colocando:

```jsx
import {getAllTasks} from '../api/tasks.api'
import {useEffect} from 'react';

export function TasksList(){
    useEffect(() => {
        async function loadTasks(){
            const res = await getAllTasks()
            console.log(res);

        }
        loadTasks()
    }, [])
    return <div>TasksList</div>
}

```

ahora esto te va a tirar un error ya que tenemos que definir en que puerto localhost queremos darle acceso, lo hacemos llendo  Django_curd_api y en cors_allowed_origins =["http://localhost:5173"]

****

con esto deberias ser capaz de ver las tareas en inspeccionar elementos

ahora vamos a mostrarlo en pantalla las tareas


```jsx
import {getAllTasks, useState} from '../api/tasks.api'
import {useEffect} from 'react';
import {TaskCard} from './TaskCard';
export function TasksList(){
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function loadTasks(){
            const res = await getAllTasks()
            setTasks(res.data);

        }
        loadTasks()
    }, [])
    return <div>
    {tasks.map(task => {
        <taskCard key={task.id} task={task} />
    })}
    </div>
}

```

y en TaskCard vamos a colocar

```jsx
export function TaskCard({task}){
    return(
        <div >
            <h1>task.title</h1>
            <p>{task.description}</p>
            <hr/>
        </div>
    )
}
```

## Crear la tarea


ahora vamos ana seccion en donde podamos crear tareas, ve a TaskFormPage.jsx

```jsx
import { useForm } from 'react-hook-form';

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title", { required: true })} />
                {errors.title && <span>Este campo es requerido</span>}
                <textarea rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
                {errors.description && <span>Este campo es requerido</span>}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

```

ahora en task.api.js debes colocar

```jsx
import axios from "axios";

const taskapi = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
})

export const getAllTasks = () => tasksApi.get("/");

export const createTask = (task) => tasksAPi.post("/", tasks);
```


ahora en TaskFormPage.jsx coloca:

```jsx
import {createTask} from '../api/task.api.js'
import {createTask} from '../api/task.api'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onSubmit = handleSubmit(async data) => {
        await createTask(data)
        navigate("/tasks")
    };

```

## Eliminar tareas

vamos a estilar un poco las task

antes vamos a ir a App.jsx y vamos a agregar la ruta:

```jsx
<Route path="/tasks/:id" element={<TaskFormpage/>}/>
```


en TaskCard.jsx

```jsx
import { useNavigate } from 'react-router-dom';

export function TaskCard({ task }) {
    const navigate = useNavigate();

    onClick = {() => {
        navigate(`/tasks/${task.id}`)
    }}
    return (
        <div style={{ background: "black" }}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <hr />
        </div>
    );
}

```

ahora vamos a agregar el boton de eliminar tarea y usaremos el parametro params
en TaskformPage.jsx vamos a import esto 


```jsx
import {createTask, deleteTask} from '../api.tasks.api';
import {useNavigate, useParams} from 'react-router-dom';

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const params = useParams()
    const onSubmit = handleSubmit(async data) => {
        await createTask(data)
        navigate("/tasks")
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title", { required: true })} />
                {errors.title && <span>Este campo es requerido</span>}
                <textarea rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
                {errors.description && <span>Este campo es requerido</span>}
                <button type="submit">Save</button>
            </form>
            {
                params.id && <button onClic={async() => {
                    const accepted = window.confirm("estas seguro?");
                    if(accepted){
                        await deleteTask(params.id);
                        navigate("/tasks");
                    }
                }}>Delete<button>
            }
        </div>
    );
```
ojito esto es solo un ejemplo, debes ir viendo que debes ir cambiando

****

ahora en tasks.api.js debes colocar una funcion para borrar


```jsx
import axios from "axios";

const taskapi = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
})

export const getAllTasks = () => tasksApi.get("/");

export const createTask = (task) => tasksAPi.post("/", tasks);

export const deleteTask = (id) => tasksApi.delte(`/${id}`)
```


## Editar tareas 

ahora vamos a editar en TaskFormPage.jsx

```jsx
const onSubmit = handleSubmit(async (data) =>{
    if (params.id){
        console.log("acutalizando");
    }else{
        await createTask(data);
    }
    navigate("/tasks");
})
```

y en taskapi 


```jsx
import axios from "axios";

const taskapi = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
})

export const getAllTasks = () => tasksApi.get("/");

export const getTask = (id) => tasksApi.get(`/${id}/`)

export const createTask = (task) => tasksAPi.post("/", tasks);

export const deleteTask = (id) => tasksApi.delte(`/${id}`)

export const updateTask = (id, task) => taskApi.put(`/${id}/`, task)
```

y en TaskFormPage.jsx

```jsx
import {createTask, deleteTask, updateTask, getTask} from '../api.tasks.api';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const params = useParams()
const onSubmit = handleSubmit(async (data) =>{
    if (params.id){
        updateTask();
    }else{
        await createTask(data);
    }
    navigate("/tasks");
})
    useEffect(() => {
        async function loadTask(){
            if (params.id){
            //console.log('obteniendo datos')
            const{
                data: {title, description},

            } = await getTask(params.id)
            const res = await getTask(params.id)
            setValue('title', title)
            setValue('description', description)
        }
        }
        loadTask();
    }. [])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title" {...register("title", { required: true })} />
                {errors.title && <span>Este campo es requerido</span>}
                <textarea rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
                {errors.description && <span>Este campo es requerido</span>}
                <button type="submit">Save</button>
            </form>
            {
                params.id && <button onClic={async() => {
                    const accepted = window.confirm("estas seguro?");
                    if(accepted){
                        await deleteTask(params.id);
                        navigate("/tasks");
                    }
                }}>Delete<button>
            }
        </div>
    );
```


## Estilos usando Tailwind y React-hot-toast