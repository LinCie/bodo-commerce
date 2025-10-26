import { errorMiddleware } from "#middlewares/error.middleware.js"
import { env } from "#utilities/env.utility.js"
import { logger } from "#utilities/logger.utility.js"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

const app = express()
const port = env.PORT

// Before request middlewares
app
  .use(
    morgan("tiny", {
      stream: {
        write: (message) => {
          logger.info(message.trim())
        },
      },
    }),
  )
  .use(helmet())
  .use(cors({ origin: env.FRONTEND_URL }))
  .use(express.json())

// Regular Routes
app
  // Index
  .get("/", (req, res) => {
    res.send("Hello World!")
  })

// After request middlewares
app.use(errorMiddleware)

app.listen(port, () => {
  logger.info(`Server is listening to port ${env.PORT} 🦊`)
})
