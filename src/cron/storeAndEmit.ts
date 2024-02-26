import { io } from '../app'

export const storeAndEmit = (route: string, value: any) => {
  const actualRoute = `/${route}`
  const event = `${route}Msg`
  io.of(actualRoute).emit(event, value)
}
