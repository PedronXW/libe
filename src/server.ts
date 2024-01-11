import { app } from './app'
import { env } from './infra/env'

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`)
})
