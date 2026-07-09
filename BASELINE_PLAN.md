# Plan: Baseline del Ejercicio 1 (antes de OpenSpec)

Este documento es la guía para construir, por fases, el proyecto a medio terminar del
Ejercicio 1 (`Taller.md`), **sin** la feature de cancelación/reprogramación. Una vez
que el baseline funcione, la limpieza de `openspec/` y el arranque del change
`appointment-reschedule-and-cancel` se hacen por fuera de este plan.

## Objetivo

Sistema de reservas de citas (barbería/consultorio) con:

- CRUD de clientes, profesionales y servicios.
- Crear, listar y consultar citas.
- Validación de fecha futura.
- UI de listado + creación con estado visible.
- Datos semilla con citas en distintos estados.

**Fuera de alcance (se resuelve luego con OpenSpec):**

- Cancelar / reprogramar citas.
- Historial de cambios.
- Reglas de 2 horas, horario laboral, solapamiento robusto.
- Mensajes de error de negocio para esas reglas.
- Botones de cancelar/reprogramar, modal, motivo.

## Stack

- Monorepo con pnpm workspaces, TypeScript en todo el stack.
- Frontend: React + Vite, TanStack Query.
- Backend: Fastify, REST JSON.
- Base de datos: SQLite con Prisma.
- Validación: Zod.
- Tests: Vitest.
- Paquetes: `apps/web`, `apps/api`, `packages/shared`.

## Estado final esperado (checkpoint `baseline-ai-generated` / `before-openspec`)

```
workshop-openspec/
├── openspec/              (se elimina después, fuera de este plan)
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Fases

### Fase 0 — Scaffold

**Meta:** repo vacío pero corriendo.

- pnpm workspaces + TypeScript en todo el stack.
- `packages/shared`: paquete vacío, referenciado desde `api` y `web`.
- `apps/api`: Fastify "hello world".
- `apps/web`: Vite + React "hello world".
- Scripts raíz: `pnpm dev` levanta ambos.
- README con instalación y arranque.

**Done when:** `pnpm install && pnpm dev` funciona, sin código de dominio todavía.

---

### Fase 1 — Capa de datos

**Meta:** base de datos y modelo de dominio.

**Esquema Prisma (mínimo):**

| Entidad | Campos clave |
|---|---|
| Client | name, phone |
| Professional | name, specialty |
| Service | name, durationMinutes, price |
| Appointment | clientId, professionalId, serviceId, startsAt, status |

**Status enum:** `scheduled` \| `cancelled` \| `completed`
(solo la columna; no hay transición a `cancelled` todavía).

**Datos semilla:**

| Entidad | Ejemplos |
|---|---|
| Clientes | Ana García, Luis Pérez, María López |
| Profesionales | Carlos (Barbero), Dra. Vega (General) |
| Servicios | Corte (30 min), Consulta (45 min), Barba (20 min) |

**Citas semilla:**

| Cita | Estado | Por qué importa después |
|---|---|---|
| Mañana 10:00 — Ana + Carlos + Corte | `scheduled` | candidata principal para cancelar/reprogramar |
| Mañana 14:00 — Luis + Dra. Vega + Consulta | `scheduled` | segunda candidata |
| Ayer 09:00 — María + Carlos + Corte | `completed` | demo de "no se puede tocar" |
| Próxima semana lunes 11:00 — Ana + Dra. Vega + Consulta | `scheduled` | suficientemente lejos para la regla de 2h |
| (Opcional) pasada — Luis + Carlos | `cancelled` | mostrar estado terminal en la UI (solo semilla, no vía API) |

**Done when:** `pnpm db:seed` llena SQLite y los datos son inspeccionables.

---

### Fase 2 — Backend CRUD

**Meta:** API REST para todo excepto cancelar/reprogramar.

**Módulos:** `clients`, `professionals`, `services`, `appointments`

**Patrón por módulo:**

```
routes → service → repository
         ↑
      Zod schemas (compartidos donde tenga sentido)
```

**API de citas:**

| Método | Endpoint | Comportamiento |
|---|---|---|
| POST | `/appointments` | Crear (status = `scheduled`) |
| GET | `/appointments` | Listar todas |
| GET | `/appointments/:id` | Obtener una |

**Validaciones (solo baseline):**

- `startsAt` debe ser futura.
- Las FKs deben existir.
- Campos requeridos básicos.

**Explícitamente fuera del baseline:**

- Regla de 2 horas.
- Horario laboral.
- Detección de solapamiento (o solo un chequeo naive; la regla real se define en el change de OpenSpec).
- Transiciones de estado.
- Historial.

**Done when:** se puede crear y listar citas vía curl/Postman.

---

### Fase 3 — Frontend

**Meta:** UI que demuestra el sistema funcionando.

**Pantallas:**

```
┌─────────────────────────────────────┐
│  Appointments                        │
├─────────────────────────────────────┤
│  [+ New appointment]                 │
│                                      │
│  Ana · Carlos · Corte                │
│  Tomorrow 10:00 · scheduled          │
│                                      │
│  Luis · Dra. Vega · Consulta         │
│  Yesterday · completed               │
│  ...                                 │
└─────────────────────────────────────┘
```

**Features:**

- Listado con badge de estado (`scheduled` / `cancelled` / `completed`).
- Formulario de creación: cliente, profesional, servicio, selector de fecha/hora.
- TanStack Query para listar + crear.
- Tras crear → el listado se refresca (sin recargar toda la página).

**Explícitamente fuera del baseline:**

- Botón de cancelar.
- Botón/modal de reprogramar.
- Campo de motivo.
- Mensajes de error de negocio para reglas que no existen aún.

**Done when:** el flujo crear → listar funciona en el navegador con los datos semilla visibles.

---

### Fase 4 — Pulido y checkpoint

**Meta:** entrega estable para iniciar el workshop.

- README: prerequisitos, instalación, dev, seed.
- Forma de error consistente desde la API (aunque simple).
- Opcional: 1–2 tests Vitest sobre la validación de "fecha futura".
- Checklist de smoke test manual.

**Done when:** cualquier persona puede clonar, correr, y ver las citas semilla en distintos estados.

---

## Resumen de fases

```
Fase 0  Scaffold          →  pnpm dev funciona
Fase 1  Datos + seed      →  DB poblada, estados mixtos
Fase 2  Backend CRUD      →  API completa (menos la feature)
Fase 3  Frontend          →  listado + creación + UI de estado
Fase 4  Pulido            →  README + smoke test
─────────────────────────────────────────────────────
BASELINE LISTO  →  limpieza de OpenSpec y arranque del change (fuera de este plan)
```

## Fuera de alcance de este plan

| Ítem | Responsable |
|---|---|
| Eliminar `openspec/`, skills, etc. | El usuario, cuando corresponda |
| Crear el change de OpenSpec | Workshop en vivo |
| Implementar cancelar/reprogramar | Después de `propose` + `apply` |
| Auth, notificaciones, pagos | Nunca (según `Taller.md`) |

## Decisiones ya tomadas

| Decisión | Elección |
|---|---|
| Datos semilla | Sí — estados mixtos |
| Limpieza de OpenSpec | La hace el usuario después |
| `main` durante la construcción | Mantiene OpenSpec hasta que se limpie |
| Alcance | Solo baseline; feature diferida |

## Referencia: guion de demo (después de limpiar OpenSpec)

```text
1. Mostrar la app funcionando — listar citas, crear una
2. Decir: "Necesitamos cancelar y reprogramar citas"
3. La audiencia identifica preguntas ocultas (¿2h? ¿completed? ¿historial? ¿solapamiento?)
4. /opsx:explore
5. /opsx:propose appointment-reschedule-and-cancel
6. Revisar artefactos en conjunto
7. /opsx:apply
8. /opsx:verify
9. /opsx:archive
```
