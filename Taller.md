# Workshop: Spec-Driven Development con OpenSpec

## Objetivo del workshop

Mostrar cómo OpenSpec ayuda a pasar de una idea ambigua a un cambio implementable, revisable y verificable.

La workshop tendrá dos ejercicios:

1. Un proyecto ya iniciado, creado parcialmente con IA, que se continuará usando OpenSpec.
2. Un proyecto desde cero, iniciado directamente con OpenSpec.

Ambos ejercicios usan TypeScript en todo el stack.

---

# Stack recomendado

## Monorepo

Usar un solo repositorio:

```text
workshop-openspec/
├── openspec/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Tecnologías

| Capa                      | Tecnología      |
| ------------------------- | --------------- |
| Lenguaje                  | TypeScript      |
| Monorepo                  | pnpm workspaces |
| Frontend                  | React + Vite    |
| Backend                   | Fastify         |
| Base de datos             | SQLite          |
| ORM                       | Prisma          |
| Validación                | Zod             |
| Estado frontend           | TanStack Query  |
| Tests                     | Vitest          |
| Estilo API                | REST JSON       |
| Especificación del cambio | OpenSpec        |

## Paquetes

```text
apps/web       → frontend React
apps/api       → backend Fastify
packages/shared → tipos, schemas Zod y constantes compartidas
```

---

# Patrones recomendados

## Backend

Usar una estructura simple por módulos:

```text
apps/api/src/
├── modules/
│   ├── appointments/
│   │   ├── appointment.routes.ts
│   │   ├── appointment.service.ts
│   │   ├── appointment.repository.ts
│   │   └── appointment.schemas.ts
│   └── ...
├── prisma/
├── server.ts
└── app.ts
```

Patrones:

* **Routes**: reciben HTTP y validan entrada.
* **Services**: contienen reglas de negocio.
* **Repositories**: encapsulan Prisma.
* **Schemas**: validan requests y responses.
* **State transitions**: reglas explícitas para cambios de estado.
* **Shared contracts**: tipos y schemas reutilizables entre frontend y backend.

## Frontend

Usar estructura por features:

```text
apps/web/src/
├── features/
│   ├── appointments/
│   │   ├── AppointmentList.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── RescheduleDialog.tsx
│   │   ├── appointment.api.ts
│   │   └── appointment.types.ts
├── app/
└── main.tsx
```

Patrones:

* **Feature folders**: agrupar UI, API client y tipos por dominio.
* **Server state con TanStack Query**: listar, crear, cancelar y reprogramar.
* **Forms simples**: validación básica en frontend y validación real en backend.
* **UI orientada a estados**: `scheduled`, `cancelled`, `completed`, etc.

---

# Ejercicio 1: Proyecto a medio terminar

## Dominio

Sistema de reservas de citas para una barbería o consultorio pequeño.

El sistema permite crear citas entre clientes y profesionales.

## Objetivo del ejercicio

Mostrar cómo OpenSpec ayuda a continuar un proyecto existente que ya tiene código, pero donde el siguiente cambio requiere aclarar reglas de negocio.

## Estado inicial del proyecto

El proyecto ya existe y tiene backend + frontend funcionando.

### Backend inicial

Ya implementado:

* CRUD básico de clientes.
* CRUD básico de profesionales.
* CRUD básico de servicios.
* Crear cita.
* Listar citas.
* Consultar cita por ID.
* Validar que la fecha sea futura.
* Guardar datos en SQLite.

No implementado todavía:

* Cancelar citas.
* Reprogramar citas.
* Historial de cambios.
* Reglas de estados.
* Conflictos robustos de disponibilidad.
* Mensajes claros de error por regla de negocio.

### Frontend inicial

Ya implementado:

* Pantalla de listado de citas.
* Formulario para crear cita.
* Selector de cliente.
* Selector de profesional.
* Selector de servicio.
* Selector de fecha y hora.
* Vista básica del estado de la cita.

No implementado todavía:

* Botón de cancelar.
* Botón de reprogramar.
* Modal de reprogramación.
* Motivo de cancelación.
* Mensajes de error de negocio.
* Actualización visual después de cambios.

## Cambio que se hará con OpenSpec

Nombre sugerido del change:

```text
appointment-reschedule-and-cancel
```

## Feature a implementar

Permitir cancelar y reprogramar citas existentes.

## Reglas de negocio

* Solo se pueden cancelar citas en estado `scheduled`.
* Solo se pueden reprogramar citas en estado `scheduled`.
* Una cita cancelada no puede reactivarse.
* Una cita completada no puede cancelarse ni reprogramarse.
* No se puede cancelar con menos de 2 horas de anticipación.
* No se puede reprogramar con menos de 2 horas de anticipación.
* La nueva hora debe estar dentro del horario laboral.
* El profesional no puede tener dos citas solapadas.
* Toda cancelación debe guardar un motivo.
* Toda reprogramación debe guardar la hora anterior, la hora nueva y el motivo.
* El frontend debe reflejar el nuevo estado sin recargar toda la aplicación.

## Endpoints esperados

```text
POST /appointments/:id/cancel
POST /appointments/:id/reschedule
GET  /appointments/:id/history
```

## UI esperada

En el listado de citas:

* mostrar estado;
* mostrar acciones disponibles según estado;
* ocultar acciones inválidas;
* mostrar errores de negocio;
* refrescar la cita después de cancelar o reprogramar.

## Qué debe mostrar la demo

Este ejercicio permite enseñar:

```text
proyecto existente
→ cambio ambiguo
→ OpenSpec proposal
→ revisión de reglas
→ apply
→ code review
→ ajuste del change si cambia una decisión
→ verify
→ archive
```

## Punto pedagógico

La frase “agregar cancelación y reprogramación” parece simple, pero realmente contiene reglas de negocio, estados, validaciones, UI condicional, persistencia e historial.

OpenSpec ayuda a hacer visible todo eso antes de que el agente implemente decisiones por su cuenta.

---

# Ejercicio 2: Proyecto desde cero

## Dominio

Sistema interno de reembolso de gastos para una empresa pequeña.

Los empleados registran gastos y los aprobadores deciden si se aprueban, rechazan o quedan en revisión.

## Objetivo del ejercicio

Mostrar cómo iniciar un proyecto nuevo desde OpenSpec, definiendo primero comportamiento, diseño y tareas antes de generar código.

## Proyecto desde cero

Nombre sugerido:

```text
expense-claims-workshop
```

## Funcionalidad inicial

Crear un sistema mínimo para:

* registrar empleados;
* crear solicitudes de reembolso;
* listar solicitudes;
* aprobar solicitudes;
* rechazar solicitudes;
* marcar solicitudes como pagadas;
* consultar historial de cambios.

## Roles

```text
employee
approver
finance
```

## Estados

```text
draft
submitted
approved
rejected
paid
flagged_for_review
```

## Reglas de negocio

* Un empleado puede crear una solicitud en estado `draft`.
* Solo una solicitud `draft` puede enviarse.
* Una solicitud enviada pasa a `submitted`.
* Un aprobador no puede aprobar sus propios gastos.
* Una solicitud rechazada debe incluir motivo.
* Una solicitud pagada ya no puede modificarse.
* Gastos mayores a un umbral requieren revisión adicional.
* Gastos sin recibo quedan marcados como `flagged_for_review`.
* Todo cambio de estado debe quedar en historial.

## Alcance inicial recomendado

Para que la workshop no se vuelva demasiado grande, evitar:

* autenticación real;
* archivos adjuntos reales;
* pagos reales;
* notificaciones por correo;
* roles complejos con permisos avanzados.

Simular el usuario actual con un header o selector simple:

```text
x-user-id
```

## Endpoints esperados

```text
POST /employees
GET  /employees

POST /expense-claims
GET  /expense-claims
GET  /expense-claims/:id

POST /expense-claims/:id/submit
POST /expense-claims/:id/approve
POST /expense-claims/:id/reject
POST /expense-claims/:id/mark-paid
GET  /expense-claims/:id/history
```

## Frontend esperado

Pantallas mínimas:

* listado de solicitudes;
* formulario para crear solicitud;
* detalle de solicitud;
* botones de enviar, aprobar, rechazar y marcar como pagada;
* historial de cambios;
* mensajes de error de negocio.

## Cambio inicial con OpenSpec

Nombre sugerido:

```text
expense-claims-initial-workflow
```

## Artefactos esperados

`proposal.md` debe definir:

* crear un flujo mínimo de solicitudes de reembolso;
* soportar estados básicos;
* registrar historial;
* dejar fuera autenticación real, pagos reales y carga real de archivos.

`specs/` debe definir:

* creación de solicitud;
* envío;
* aprobación;
* rechazo;
* pago;
* restricciones por rol;
* historial.

`design.md` debe definir:

* modelo de datos;
* máquina de estados;
* validación con Zod;
* separación routes/services/repositories;
* uso de Prisma;
* estrategia de UI.

`tasks.md` debe incluir:

* crear schema Prisma;
* crear endpoints;
* crear reglas de estado;
* crear frontend mínimo;
* agregar pruebas de reglas críticas;
* conectar UI con API;
* verificar comportamiento.

## Qué debe mostrar la demo

Este ejercicio permite enseñar:

```text
idea inicial
→ OpenSpec explore
→ OpenSpec propose
→ revisar artefactos antes de código
→ apply
→ revisar implementación
→ verify
→ archive
```

## Punto pedagógico

El proyecto no empieza con “hazme una app de gastos”.

Empieza con una definición explícita de estados, roles, reglas y límites.

Eso demuestra el valor de SDD desde el primer commit.

---

# Comparación entre ambos ejercicios

| Aspecto                 | Ejercicio 1                                 | Ejercicio 2                               |
| ----------------------- | ------------------------------------------- | ----------------------------------------- |
| Punto de partida        | Proyecto existente a medio terminar         | Proyecto desde cero                       |
| Dominio                 | Reservas de citas                           | Reembolso de gastos                       |
| Propósito               | Continuar código ya creado con IA           | Empezar con especificación primero        |
| Dificultad              | Media                                       | Media                                     |
| Principal aprendizaje   | Corregir ambigüedad en un sistema existente | Definir comportamiento antes de programar |
| Cambio principal        | Cancelar y reprogramar citas                | Flujo inicial de solicitudes              |
| Toca frontend           | Sí                                          | Sí                                        |
| Toca backend            | Sí                                          | Sí                                        |
| Tiene reglas de negocio | Sí                                          | Sí                                        |
| Tiene estados           | Sí                                          | Sí                                        |
| Tiene historial         | Sí                                          | Sí                                        |

---

# Recomendación de dinámica para la workshop

## Parte 1: Contexto

Explicar brevemente:

```text
sin especificación persistente
→ el agente puede producir código rápido
→ pero puede tomar decisiones no aprobadas
```

## Parte 2: Proyecto a medio terminar

Mostrar el sistema de citas funcionando.

Luego plantear el cambio:

```text
Necesitamos cancelar y reprogramar citas.
```

Pedir al público identificar preguntas ocultas:

* ¿quién puede cancelar?
* ¿hasta cuándo se puede cancelar?
* ¿qué pasa si la cita ya fue completada?
* ¿se guarda historial?
* ¿se debe actualizar la UI?
* ¿qué pasa con horarios solapados?

Después usar OpenSpec para formalizar el cambio.

## Parte 3: Proyecto desde cero

Mostrar que no existe implementación.

Crear el change desde OpenSpec y revisar los artefactos antes de generar código.

El énfasis debe estar en que el agente no empieza programando: primero estructura el cambio.

## Parte 4: Cierre

Contrastar ambos enfoques:

```text
Ejercicio 1:
código existente → ambigüedad → especificación → implementación controlada

Ejercicio 2:
idea inicial → especificación → implementación desde cero
```

Mensaje final:

```text
OpenSpec no hace que la IA piense por nosotros.
Hace que las decisiones sean explícitas antes de que la IA escriba código.
```

---

# Preparación sugerida de repositorios

## Opción recomendada

Un repositorio por ejercicio:

```text
appointment-workshop/
expense-claims-workshop/
```

Cada uno con su propio:

```text
openspec/
apps/web/
apps/api/
packages/shared/
```

Esto simplifica la demo y evita mezclar dos dominios en el mismo repo.

## Branches recomendadas

Para cada repo:

```text
main                 → estado limpio inicial
before-openspec       → punto justo antes de usar OpenSpec
after-openspec-demo    → resultado esperado de la demo
```

Para el ejercicio 1:

```text
baseline-ai-generated
openspec-change-start
openspec-change-finished
```

Para el ejercicio 2:

```text
empty-project
openspec-initial-change
openspec-implemented
```
