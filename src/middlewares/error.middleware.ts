import type { NextFunction, Request, Response } from "express"

import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError, UniqueConstraintError } from "#core/errors/base.error.js"
import { env } from "#utilities/env.utility.js"
import { logger } from "#utilities/logger.utility.js"
import z, { ZodError } from "zod"

function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  // Log all errors
  logger.error(err)

  if (err instanceof ZodError) {
    res.status(400).send({
      errors: z.treeifyError(err),
      message: "Validation failed",
    })
    return
  }

  const customErrors = [
    { ErrorClass: NotFoundError, statusCode: 404 },
    { ErrorClass: BadRequestError, statusCode: 400 },
    { ErrorClass: UnauthorizedError, statusCode: 401 },
    { ErrorClass: ForbiddenError, statusCode: 403 },
    { ErrorClass: UniqueConstraintError, statusCode: 409 },
  ]

  for (const customError of customErrors) {
    if (err instanceof customError.ErrorClass && err instanceof Error) {
      res.status(customError.statusCode).send({ message: err.message })
      return
    }
  }

  // For other errors, hide details in production
  if (env.NODE_ENV === "production") {
    res.status(500).send({ message: "Internal Server Error" })
    return
  }

  // In development, provide more details
  if (err instanceof Error) {
    res.status(500).send({ message: err.message, stack: err.stack })
    return
  }

  res.status(500).send({ message: "An unknown error occurred" })
  return
}

export { errorMiddleware }
