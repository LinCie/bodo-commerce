import type { RequestHandler } from "express"
import type { ZodAny } from "zod"

import { validatorMiddleware } from "#middlewares/validator.middleware.js"
import express from "express"

interface RouteDefinition {
  handler: RequestHandler
  method: "delete" | "get" | "patch" | "post" | "put"
  middlewares?: RequestHandler[]
  path: string
  schema?: ZodAny
}

abstract class Controller {
  public readonly router = express.Router({ mergeParams: true })

  protected bindRoutes(routes: RouteDefinition[]): void {
    routes.forEach(({ handler, method, middlewares, path, schema }) => {
      // Middlewares
      const mws = (middlewares ?? []).map((mw) => this.asyncHandler(mw.bind(this)))

      // Validators
      const validators = schema ? [validatorMiddleware(schema)] : []

      // Handler
      const finalHandler = this.asyncHandler(handler.bind(this))

      this.router[method](path, ...mws, ...validators, finalHandler)
    })
  }

  private asyncHandler(fn: RequestHandler): RequestHandler {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next)
    }
  }
}

export { Controller }
export type { RouteDefinition }
